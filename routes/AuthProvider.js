import React, {createContext} from 'react';
// import * as auth from 'firebase/auth';
import firebase from '../firebase';
export const AuthContext = createContext();
import {errorCodeBasedOnFrbCode} from '../helpers/firebaseErrorCodesMessage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {NavigationRef} from './Route';
import {serverURL} from '../data/locations';
import {launchImageLibrary} from 'react-native-image-picker';
import st, {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
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
    };
  }

  // Show Message to Snackbar

  showMessage = (e, v, m) =>
    this.setState({message: {error: e, visible: v, message: m}});

  executeError = (error, rawError, origin) => {
    this.setState({whichProcessIsHappenningNow: null});
    this.showMessage(true, true, error);
    if (__DEV__) {
      console.log(`From ${origin}:`);
      console.log(rawError);
    }
  };

  // To set the admin
  setAdminClaim = async uid => {
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

          login: (email, password) => {
            // First Let the Context know that email login is happenning
            this.setState({whichProcessIsHappenningNow: 'LOGIN-EMAIL'});
            this.setState({whichAuthentication: 'LOGIN'});

            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(record => {
                // Now the login is complete, set the happenning proces
                this.setState({whichProcessIsHappenningNow: null});
                return firebase.auth().currentUser.getIdTokenResult();
              })
              .then(idTokenResult => {
                // If user is admin and chose farmer  mode or user is not admin and chose consumer mode, then everything is correct
                if (
                  (idTokenResult.claims.admin && this.state.mode == 'FARMER') ||
                  (!idTokenResult.claims.admin && this.state.mode == 'CONSUMER')
                )
                  return;
                // If user choses consumer mode but the is admin

                if (
                  idTokenResult.claims.admin &&
                  this.state.mode == 'CONSUMER'
                ) {
                  firebase.auth().signOut();
                  throw {code: 'auth/user-not-consumer'};
                } else {
                  firebase.auth().signOut();
                  throw {code: 'auth/user-not-admin'};
                }
              })
              .catch(error =>
                this.executeError(
                  errorCodeBasedOnFrbCode(error.code),
                  error,
                  'Login Fnx',
                ),
              );
          },

          googleLogin: async () => {
            this.setState({whichProcessIsHappenningNow: 'LOGIN-GOOGLE'});
            this.setState({whichAuthentication: 'LOGIN'});

            // Get the users ID token
            try {
              const {idToken} = await GoogleSignin.signIn();

              // Create a Google credential with the token
              const googleCredential =
                firebase.auth.GoogleAuthProvider.credential(idToken);

              // Sign-in the user with the credential
              const googleLogout = async () => {
                this.setState({whichProcessIsHappenningNow: null});

                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
                await firebase.auth().signOut();
              };

              let user = await firebase
                .auth()
                .signInWithCredential(googleCredential);

              if (
                user.additionalUserInfo['isNewUser'] &&
                this.state.mode == 'FARMER'
              )
                await this.setAdminClaim(user.user.uid);

              let idTokenResult = await firebase
                .auth()
                .currentUser.getIdTokenResult(true);

              console.log(idTokenResult.claims);

              this.setState({whichProcessIsHappenningNow: null});

              // If user is admin and chose farmer  mode or user is not admin and chose consumer mode, then everything is correct
              if (
                (idTokenResult.claims.admin && this.state.mode == 'FARMER') ||
                (!idTokenResult.claims.admin && this.state.mode == 'CONSUMER')
              )
                return;
              // If user choses consumer mode but the is admin or similar situations
              if (idTokenResult.claims.admin && this.state.mode == 'CONSUMER') {
                await googleLogout();
                throw {
                  code: 'auth/user-not-consumer',
                  message: `This account isn't registered as consumer`,
                };
              } else {
                await googleLogout();
                throw {
                  code: 'auth/user-not-admin',
                  message: `This account isn't registered as farmer`,
                };
              }
            } catch (e) {
              this.executeError(
                errorCodeBasedOnFrbCode(e.code),
                e,
                'Google Login Fnx',
              );
            }
          },

          // Facebook Login
          facebookLogin: async () => {
            // Attempt login with permissions

            this.setState({whichProcessIsHappenningNow: 'LOGIN-FACEBOOK'});
            this.setState({whichAuthentication: 'LOGIN'});

            try {
              const result = await LoginManager.logInWithPermissions([
                'public_profile',
                'email',
              ]);

              if (result.isCancelled) {
                throw {code: 'auth/user-cancelled'};
              }

              // Once signed in, get the users AccesToken
              const data = await AccessToken.getCurrentAccessToken();

              if (!data) {
                throw 'Something went wrong obtaining access token';
              }

              // Create a Firebase credential with the AccessToken
              const facebookCredential =
                firebase.auth.FacebookAuthProvider.credential(data.accessToken);

              // Sign-in the user with the credential
              const user = await firebase
                .auth()
                .signInWithCredential(facebookCredential);

              if (
                user.additionalUserInfo['isNewUser'] &&
                this.state.mode == 'FARMER'
              )
                await this.setAdminClaim(user.user.uid);

              const idTokenResult = await firebase
                .auth()
                .currentUser.getIdTokenResult(true);

              this.setState({whichProcessIsHappenningNow: null});

              // If user is admin and chose farmer  mode or user is not admin and chose consumer mode, then everything is correct
              if (
                (idTokenResult.claims.admin && this.state.mode == 'FARMER') ||
                (!idTokenResult.claims.admin && this.state.mode == 'CONSUMER')
              )
                return;
              // If user choses consumer mode but the is admin or similar situations
              if (idTokenResult.claims.admin && this.state.mode == 'CONSUMER') {
                await firebase.auth().signOut();
                throw {
                  code: 'auth/user-not-consumer',
                  message: `This account isn't registered as consumer`,
                };
              } else {
                await firebase.auth().signOut();
                throw {
                  code: 'auth/user-not-admin',
                  message: `This account isn't registered as farmer`,
                };
              }
            } catch (e) {
              this.executeError(
                errorCodeBasedOnFrbCode(e.code),
                e,
                'Facebook Login Fnx',
              );
            }
          },

          // Register Account from Email
          register: async (username, email, password) => {
            this.setState({whichProcessIsHappenningNow: 'REGISTER-EMAIL'});
            this.setState({whichAuthentication: 'REGISTER'});

            try {
              // First create account and then update username

              const userAccount = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);

              await firebase.auth().currentUser.updateProfile({
                displayName: username,
              });

              // Set admin claims for farmer
              if (this.state.mode == 'FARMER')
                await this.setAdminClaim(userAccount.user.uid);

              await firebase.auth().signOut();

              this.showMessage(false, true, 'Successfully created account');
              this.setState({whichProcessIsHappenningNow: null});

              navigate(
                this.state.mode == 'FARMER'
                  ? 'LOGIN_SCREEN-FARMER'
                  : 'LOGIN_SCREEN-CONSUMER',
              );
            } catch (e) {
              this.executeError(
                errorCodeBasedOnFrbCode(e.code),
                e,
                'Register Fnx - Consumer',
              );
            }

            // Login as Farmer
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
        }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
