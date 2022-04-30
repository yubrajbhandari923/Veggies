import React, {useContext, useEffect, useState} from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {theme} from '../core/theme';
import {AuthContext} from './AuthProvider';

import {getAuth, onAuthStateChanged} from 'firebase/auth';
import firebase from '../firebase';
import LoadingScreen from '../screens/LoadingScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// export the ref to access the navigation from any functions outside the Container
export const NavigationRef = createNavigationContainerRef();
import ActionNotification from '../components/MessageSnackBar';

// For white background across the App

const Route = () => {
  const {user, setUser} = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);

  // Configure Google Singin When Component Mounts
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '397799283843-7ta09jbfph02mpd8lnufl0m8lqunrv2n.apps.googleusercontent.com',
      offlineAccess: false,
    });
  });

  // Listen to the user authentication status

  useEffect(() => {
    setLoading(true);
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
        // ...
      }

      setLoading(false);
    });
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <NavigationContainer ref={NavigationRef} theme={theme}>
      {user ? <AppStack /> : <AuthStack />}

      <ActionNotification />
    </NavigationContainer>
  );
};

export default Route;
