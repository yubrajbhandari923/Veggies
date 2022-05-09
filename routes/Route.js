import React, {useContext, useEffect, useState} from 'react';
import AuthStack from './AuthStack';
import ConsumerAppStack from './ConsumerAppStack';
import FarmerAppStack from './FarmerAppStack';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {theme} from '../core/theme';
import {AuthContext} from './AuthProvider';

import {getAuth, onAuthStateChanged} from 'firebase/auth';
import LoadingScreen from '../screens/LoadingScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings} from 'react-native-fbsdk-next';

// export the ref to access the navigation from any functions outside the Container
export const NavigationRef = createNavigationContainerRef();
import ActionNotification from '../components/MessageSnackBar';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '../firebase';

// For white background across the App

const Route = () => {
  const {user, setUser, whichAuthentication, setMode, mode} =
    useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);

  // Configure Google Singin and FB LOGIN When Component Mounts
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '397799283843-7ta09jbfph02mpd8lnufl0m8lqunrv2n.apps.googleusercontent.com',
      offlineAccess: false,
    });
    Settings.setAppID('290900346580029');
    Settings.initializeSDK();
  });

  // Listen to the user authentication status

  useEffect(() => {
    if (whichAuthentication == 'REGISTER') return;
    setLoading(true);
    const auth = getAuth();

    onAuthStateChanged(auth, user => {
      // console.log(user);
      if (user) {
        // User is signed in
        // Also set the address
        setUser(user);
        firebase
          .auth()
          .currentUser.getIdTokenResult(true)
          .then(tokenResult => {
            let address = tokenResult.claims?.['address'];
            setUser({...user, address: address});
          })
          .catch(e => {
            if (__DEV__) console.log(e);
          });
      } else {
        // User is signed out
        setUser(null);
        // ...
      }

      setLoading(false);
    });
  }, []);

  // Also set, whether the user was is Farmer or Consumer
  // It runs once the app is opened to set which mode it is now
  // If nothing was set previously we assume its farmer, else we set what was already set
  useEffect(() => {
    AsyncStorage.getItem('mode')
      .then(md => {
        if (!md) AsyncStorage.setItem('FARMER');

        setMode(md ? md : 'FARMER');
      })
      .catch(e => {
        if (__DEV__) console.log(e);
      });
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <NavigationContainer ref={NavigationRef} theme={theme}>
      {mode == 'FARMER' ? (
        user && whichAuthentication == 'LOGIN' ? (
          <FarmerAppStack />
        ) : (
          <AuthStack />
        )
      ) : user && whichAuthentication == 'LOGIN' ? (
        <ConsumerAppStack />
      ) : (
        <AuthStack />
      )}

      <ActionNotification />
    </NavigationContainer>
  );
};

export default Route;
