import React, {createContext} from 'react';
// import * as auth from 'firebase/auth';
import firebase from '../firebase';
export const AuthContext = createContext();
import {errorCodeBasedOnFrbCode} from '../helpers/firebaseErrorCodesMessage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {NavigationRef} from './Route';
import {sendPasswordResetEmail} from 'firebase/auth';
import {serverURL} from '../data/locations';
import {launchImageLibrary} from 'react-native-image-picker';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import Geolocation from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  authorizationLevel: 'whenInUse',
  // skipPermissionRequests: false,
});

function navigate(name, params) {
  if (NavigationRef.isReady()) {
    // Perform navigation if the react navigation is ready to handle actions
    NavigationRef.navigate(name, params);
  } else {
    // You can decide what to do if react navigation is not ready
    // You can ignore this, or add these actions to a queue you can call later
  }
}
export default class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Which mode are we logged in with, either farmer or consumer
      mode: 'FARMER',
      setMode: mode => this.setState({mode: mode}),
      // Stores about which process is happenning now
      whichProcessIsHappenningNow: null,
      // Stores the user object from firebase
      user: null,

      firstNews: null,

      whichAuthentication: 'LOGIN', //To check whether it is login or register because this fucking firebase automatically authenticates on creating new user

      // Stores the message object that is displayed in snackbar
      message: {
        error: false,
        visible: false,
        message: null,
      },

      // Store the current location cordaintes
      coordinates: {coords: null, error: null},
    };
  }

  // Show Message to Snackbar

  showMessage = (e, v, m) =>
    this.setState({message: {error: e, visible: v, message: m}});

  executeError = (error, rawError, origin) => {
    this.setState({whichProcessIsHappenningNow: null});

    this.showMessage(true, true, error);

    if (__DEV__) console.log('From ' + origin + ':' + rawError);
  };

  // To set the admin
  setAdminClaim = async uid => {
    console.log(uid);
    try {
      const claim = await fetch(`${serverURL}/setadmin`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid,
        }),
      });

      const res = await claim.json();

      if (!res.ok) throw res;

      return res;
    } catch (e) {
      return e;
    }
  };

  // To get location as coordinates
  setGeoLocationCoordinates = async () => {
    let coordinate;
    const geo = Geolocation.getCurrentPosition(
      position => {
        this.setState({coordinates: {coords: position.coords, error: null}});
      },
      error => {
        // See error code charts below.
        this.setState({coords: null, error: error.message});
      },
    );
  };

  // When the component mounts then set the geoLocation
  componentDidMount() {
    this.setGeoLocationCoordinates();
  }
  // This Function is used to display message
  render() {
    return (
      <AuthContext.Provider
        value={{
          mode: this.state.mode,
          setMode: value => this.setState({mode: value}), //Should be either FARMER or CONSUMERF
          user: this.state.user,
          setUser: userObj => this.setState({user: userObj}),

          whichAuthentication: this.state.whichAuthentication,

          whichProcessIsHappenningNow: this.state.whichProcessIsHappenningNow,
          setWhichProcessIsHappenningNow: value =>
            this.setState({whichProcessIsHappenningNow: value}),

          firstNews: this.state.firstNews,
          setFirstNews: newsObj => this.setState({firstNews: newsObj}),

          // It stores the message that is displayed in snackbar
          message: this.state.message,
          // This function sets the message that will be displayed in snackbar
          setMessage: (e, v, m) => this.showMessage(e, v, m),

          login: async (email, password) => {
            // First Let the Context know that email login is happenning
            this.setState({whichProcessIsHappenningNow: 'LOGIN-EMAIL'});
            this.setState({whichAuthentication: 'REGISTER'});

            try {
              const user = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password);

              const claim = (
                await firebase.auth().currentUser.getIdTokenResult(true)
              ).claims;

              // If the user was farmer but logged in from consumer screen
              if (this.state.mode == 'CONSUMER' && claim.admin) {
                await firebase.auth().signOut();
                throw 'This account is registered as a farmer';
              }

              // If the user was consumer but logged in from framer screen
              if (this.state.mode == 'FARMER' && !claim.admin) {
                await firebase.auth().signOut();
                throw 'This account is registered as a consumer';
              }

              this.setState({whichAuthentication: 'LOGIN'});

              this.setState({whichProcessIsHappenningNow: null});
            } catch (e) {
              this.executeError(
                e?.code ? errorCodeBasedOnFrbCode(e.code) : e,
                e,
                'login fnx ',
              );
            }
          },

          googleLogin: async () => {
            this.setState({whichProcessIsHappenningNow: 'LOGIN-GOOGLE'});

            // SET it to LOGIN when everything gets validated
            this.setState({whichAuthentication: 'REGISTER'});

            const googleSIGNOUT = async () => {
              await GoogleSignin.revokeAccess();
              await GoogleSignin.signOut();

              await firebase.auth().signOut();
            };

            try {
              // Get the users ID token
              const {idToken} = await GoogleSignin.signIn();
              // Create a Google credential with the token
              const googleCredential =
                firebase.auth.GoogleAuthProvider.credential(idToken);

              const user = await firebase
                .auth()
                .signInWithCredential(googleCredential);

              // If new user and farmer mode, then set that user to admin
              if (
                user.additionalUserInfo.isNewUser &&
                this.state.mode == 'FARMER'
              ) {
                await this.setAdminClaim(user.user.uid);
              }

              const claim = (
                await firebase.auth().currentUser.getIdTokenResult(true)
              ).claims;

              // If the user was farmer but logged in from consumer screen
              if (this.state.mode == 'CONSUMER' && claim.admin) {
                await googleSIGNOUT();
                throw {message: 'This account is registered as a farmer'};
              }

              // If the user was consumer but logged in from framer screen
              if (this.state.mode == 'FARMER' && !claim.admin) {
                await googleSIGNOUT();
                throw {message: 'This account is registered as a consumer'};
              }

              this.setState({whichAuthentication: 'LOGIN'});

              this.setState({whichProcessIsHappenningNow: null});
            } catch (e) {
              this.executeError(e.message, e, 'google Login Fnx: ');
            }

            // Sign-in the user with the credential
          },

          // Facebook Login
          facebookLogin: async () => {
            // Attempt login with permissions

            this.setState({whichProcessIsHappenningNow: 'LOGIN-FACEBOOK'});

            // It will be set to login once everything gets validated
            this.setState({whichAuthentication: 'REGISTER'});

            try {
              const result = await LoginManager.logInWithPermissions([
                'public_profile',
                'email',
              ]);

              if (result.isCancelled) {
                throw 'User cancelled the login process';
              }

              const data = await AccessToken.getCurrentAccessToken();

              if (!data) {
                throw 'Something went wrong obtaining access token';
              }

              // Create a Firebase credential with the AccessToken
              const facebookCredential =
                firebase.auth.FacebookAuthProvider.credential(data.accessToken);

              const user = await firebase
                .auth()
                .signInWithCredential(facebookCredential);

              // If new user and farmer mode, then set that user to admin
              if (
                user.additionalUserInfo.isNewUser &&
                this.state.mode == 'FARMER'
              ) {
                await this.setAdminClaim(user.user.uid);
              }

              const claim = (
                await firebase.auth().currentUser.getIdTokenResult(true)
              ).claims;

              // If the user was farmer but logged in from consumer screen
              if (this.state.mode == 'CONSUMER' && claim.admin) {
                await firebase.auth().signOut();
                throw {message: 'This account is registered as a farmer'};
              }

              // If the user was consumer but logged in from framer screen
              if (this.state.mode == 'FARMER' && !claim.admin) {
                await firebase.auth().signOut();
                throw {message: 'This account is registered as a consumer'};
              }

              this.setState({whichAuthentication: 'LOGIN'});

              this.setState({whichProcessIsHappenningNow: null});
            } catch (e) {
              console.log(e);
              this.executeError(
                e.message
                  ? e.message
                  : errorCodeBasedOnFrbCode(e?.code ? e.code : e),
                e,
                'facebook login fnx',
              );
            }

            // Once signed in, get the users AccesToken

            // Sign-in the user with the credential
          },

          // Register Account from Email
          register: async (username, email, password) => {
            this.setState({whichProcessIsHappenningNow: 'REGISTER-EMAIL'});

            this.setState({whichAuthentication: 'REGISTER'});

            // Set admin claims for farmer
            try {
              if (this.state.mode == 'FARMER') {
                //
                const response = await fetch(`${serverURL}/createAdmin`, {
                  method: 'POST', // or 'PUT'
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: email,
                    password: password,
                    name: username,
                  }),
                });

                const json = await response.json();
                if (!response.ok) throw json;

                // Successfully sign up

                this.setState({whichProcessIsHappenningNow: null});
                this.showMessage(false, true, 'Successfully created account');
                navigate('LOGIN_SCREEN-FARMER');
              } else {
                // For consumers
                // First create account and then update username

                await firebase
                  .auth()
                  .createUserWithEmailAndPassword(email, password);

                // Updated username
                await firebase.auth().currentUser.updateProfile({
                  displayName: username,
                });

                // Now deauthenticate the user
                await firebase.auth().signOut();

                this.setState({whichProcessIsHappenningNow: null});
                this.showMessage(
                  false,
                  true,
                  'Successfully created the account',
                );

                navigate('LOGIN_SCREEN-CONSUMER');
              }
            } catch (error) {
              this.executeError(
                errorCodeBasedOnFrbCode(error.code),
                error,
                'Register Fnx',
              );
            }
          },
          // LOGOUT function
          updateUserName: async username => {
            // If the provided username isnt null, undefined or less than 6 charactes , then its invalid
            this.setState({whichProcessIsHappenningNow: 'UPDATE_USERNAME'});
            await firebase
              .auth()
              .currentUser.updateProfile({displayName: username});
          },

          logout: () => {
            if (this.state.user.providerData[0]['providerId'] == 'google.com') {
              GoogleSignin.revokeAccess();
              GoogleSignin.signOut();
            }

            firebase
              .auth()
              .signOut()
              .then(() => {
                // Succesfully signed out
                console.log('LOGGED OUT');
              })
              .catch(e => {
                this.showMessage(true, true, 'Sorry! There was an error');

                if (__DEV__) {
                  console.log(e);
                }
              });
          },

          search: (articleArray, query) => {
            // if the user submits an empty string, return
            if (query?.length == 0 || !query) {
              return;
            }

            // First we pick up article array
            // Then enter in every article object
            // Then in every article we check if the query matches with author, description,content or title.
            // that means we only search in four places i.e title, description,author and content
            // Then We store the array of objects that pass the test in variable below

            let queryPassedObjects = articleArray.filter(
              (currentObj, index) => {
                return (
                  currentObj?.title?.search(RegExp(query, 'gi')) != -1 ||
                  currentObj?.description?.search(RegExp(query, 'gi')) != -1 ||
                  currentObj?.author?.search(RegExp(query, 'gi')) != -1 ||
                  currentObj?.content?.search(RegExp(query, 'gi')) != -1
                );
              },
            );

            return queryPassedObjects;
          },

          // Reset Passowrd
          resetPassword: email => {
            this.setState({whichProcessIsHappenningNow: 'RESET-PASSWORD'});
            firebase
              .auth()
              .sendPasswordResetEmail(email)
              .then(v => {
                this.setState({whichProcessIsHappenningNow: null});
                console.log(v);
                this.showMessage(
                  false,
                  true,
                  'Successfully send password reset email',
                );
              })
              .catch(e => {
                if (__DEV__) console.log(e);
                this.setState({whichProcessIsHappenningNow: null});

                this.showMessage(true, true, e.message);
              });
          },

          // Upload New Profile Picture
          uploadPP: async () => {
            this.setState({whichProcessIsHappenningNow: 'UPLOAD-PROFILE_PIC'});
            try {
              const image = await launchImageLibrary({
                maxHeight: 500,
                maxWidth: 500,
                mediaType: 'photo',
              });

              if (image?.didCancel) throw 'User cancelled the upload';

              if (image?.errorMessage) throw image.errorMessage;
              //

              // Convert url to File Object
              const resp = await fetch(image.assets[0].uri);
              const blob = await resp.blob();
              const file = new File([blob], 'profile_pic.jpg', {
                type: blob.type,
              });

              const ext = image.assets[0].fileName.substring(
                image.assets[0].fileName.lastIndexOf('.') + 1,
                image.assets[0].fileName.length,
              );

              // const storage = getStorage();

              const storage = getStorage();

              const storageRef = ref(
                storage,
                `profilePicture/profilePic-${this.state.user['uid']}.${ext}`,
              );

              const metadata = {
                contentType: 'image/jpeg',
              };
              const uploadTask = await uploadBytes(storageRef, file, metadata);

              const url = await getDownloadURL(uploadTask.ref);

              await firebase.auth().currentUser.updateProfile({photoURL: url});

              this.setState({whichProcessIsHappenningNow: null});

              this.showMessage(
                false,
                true,
                'Profile Picture Successfully Updated',
              );
            } catch (error) {
              this.executeError(e, e, 'Upload PP Fnx');
            }
          },

          // Update UserName

          updateUsername: async username => {
            this.setState({whichProcessIsHappenningNow: 'UPDATE-USERNAME'});

            try {
              await firebase.auth().currentUser.updateProfile({
                displayName: username,
              });

              this.showMessage(false, true, 'Successfully updated username');
              this.setState({whichProcessIsHappenningNow: null});
              navigate('EDIT_PROFILE-MODAL');
            } catch (error) {
              this.executeError(
                errorCodeBasedOnFrbCode(error.code),
                error,
                'Update Username Fnx',
              );
            }
          },

          updatePhone: async phone => {
            phone = '+977' + phone;

            this.setState({whichProcessIsHappenningNow: 'UPDATE-PHONE'});

            try {
              const response = await fetch(`${serverURL}/updatePhone`, {
                body: JSON.stringify({uid: this.state.user.uid, phone: phone}),
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              const json = await response.json();
              if (!response.ok) throw json;

              this.setState({whichProcessIsHappenningNow: null});
              this.showMessage(
                false,
                true,
                'Successfully updated phone number',
              );
              navigate('EDIT_PROFILE-MODAL');
            } catch (error) {
              this.executeError(
                errorCodeBasedOnFrbCode(error?.code),
                error,
                'Update Phone Fnx',
              );
            }
          },

          updateAddress: async address => {
            this.setState({whichProcessIsHappenningNow: 'UPDATE-ADDRESS'});

            try {
              address['uid'] = this.state.user.uid;

              address['geoLocation'] = this.state.coordinates;

              const response = await fetch(`${serverURL}/updateAddress`, {
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(address),
                method: 'POST',
              });

              const json = await response.json();

              if (!response.ok) throw json;

              this.setState({whichProcessIsHappenningNow: null});
              this.showMessage(false, true, 'Successfully updated address');
              navigate('EDIT_PROFILE-MODAL');
            } catch (error) {
              this.executeError(
                errorCodeBasedOnFrbCode(error.code),
                error,
                'Update Address FNX',
              );
            }
          },

          verifyMail: async () => {
            this.setState({whichProcessIsHappenningNow: 'VERIFY-EMAIL'});
            try {
              await firebase.auth().currentUser.sendEmailVerification();

              this.setState({whichProcessIsHappenningNow: null});

              this.showMessage(
                false,
                true,
                'Successfully sent verification email',
              );
              navigate('EDIT_PROFILE-MODAL');
            } catch (error) {
              this.executeError(
                errorCodeBasedOnFrbCode(error?.code),
                error,
                'Verify Mail FNX',
              );
            }
          },
        }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
