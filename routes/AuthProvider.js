import React, {createContext} from 'react';
// import * as auth from 'firebase/auth';
import firebase, {auth} from '../firebase';
export const AuthContext = createContext();
import {errorCodeBasedOnFrbCode} from '../helpers/firebaseErrorCodesMessage';
export default class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Stores about which process is happenning now
      whichProcessIsHappenningNow: null,
      // Stores the user object from firebase
      user: null,

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

          whichProcessIsHappenningNow: this.state.whichProcessIsHappenningNow,

          // It stores the message that is displayed in snackbar
          message: this.state.message,
          // This function sets the message that will be displayed in snackbar
          setMessage: (e, v, m) => this.showMessage(e, v, m),

          login: (email, password) => {
            // First Let the Context know that email login is happenning
            this.setState({whichProcessIsHappenningNow: 'LOGIN-EMAIL'});

            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(value => {
                // Now the login is complete, set the happenning proces
                this.setState({whichProcessIsHappenningNow: null});
                //
                // if (__DEV__) {
                //   console.log(
                //     'From Login Function:: -> Successfully Logged IN',
                //   );
                // }
              })
              .catch(error => {
                this.setState({whichProcessIsHappenningNow: null});

                // console.log(errorCodeBasedOnFrbCode(error.code));

                this.showMessage(
                  true,
                  true,
                  errorCodeBasedOnFrbCode(error.code),
                );
              });
          },

          googleLogin: () => {
            console.log('DEVELOPMENT PHASE');
          },

          // Facebook Login
          facebookLogin: () => {
            console.log('DEVELOPMENT PHASE');
          },
          // LOGOUT function

          logout: () => {
            console.log('Predded');

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
        }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
