import React, {createContext} from 'react';
// import * as auth from 'firebase/auth';
import firebase, {auth} from '../firebase';
export const AuthContext = createContext();
import {errorCodeBasedOnFrbCode} from '../helpers/firebaseErrorCodesMessage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {NavigationRef} from './Route';

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

  // This Function is used to display message
  render() {
    return (
      <AuthContext.Provider
        value={{
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
              .then(value => {
                // Now the login is complete, set the happenning proces
                this.setState({whichProcessIsHappenningNow: null});
              })
              .catch(error => {
                this.setState({whichProcessIsHappenningNow: null});

                this.showMessage(
                  true,
                  true,
                  errorCodeBasedOnFrbCode(error.code),
                );
              });
          },

          googleLogin: async () => {
            this.setState({whichProcessIsHappenningNow: 'LOGIN-GOOGLE'});
            this.setState({whichAuthentication: 'LOGIN'});

            // Get the users ID token

            const {idToken} = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential =
              firebase.auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            return await firebase.auth().signInWithCredential(googleCredential);
          },

          // Facebook Login
          facebookLogin: async () => {
            // Attempt login with permissions

            this.setState({whichProcessIsHappenningNow: 'LOGIN-FACEBOOK'});
            this.setState({whichAuthentication: 'LOGIN'});

            const result = await LoginManager.logInWithPermissions([
              'public_profile',
              'email',
            ]);

            if (result.isCancelled) {
              throw 'User cancelled the login process';
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
            return firebase.auth().signInWithCredential(facebookCredential);
          },

          // Register Account from Email
          register: (username, email, password) => {
            this.setState({whichProcessIsHappenningNow: 'REGISTER-EMAIL'});
            this.setState({whichAuthentication: 'REGISTER'});

            // First create account and then update username
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(userAccount =>
                firebase.auth().currentUser.updateProfile({
                  displayName: username,
                }),
              )
              .then(() => firebase.auth().signOut())
              .then(() => {
                this.showMessage(false, true, 'Successfully created account');
                this.setState({whichProcessIsHappenningNow: null});
                navigate('LOGIN_SCREEN');
              })

              .catch(e => {
                if (__DEV__) console.log(e);
                this.setState({whichProcessIsHappenningNow: null});
                this.showMessage(true, true, errorCodeBasedOnFrbCode(e.code));
              });
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
        }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
