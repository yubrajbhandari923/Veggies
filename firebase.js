//
import firebase from 'firebase/compat/app';
import AsyncStorage from '@react-native-community/async-storage';

import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';

import 'firebase/compat/auth';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD2D9Jnl4vyCOcF9R6T7fNGv56t4qfkm9Y',
  authDomain: 'veggies-efbe8.firebaseapp.com',
  projectId: 'veggies-efbe8',
  storageBucket: 'veggies-efbe8.appspot.com',
  messagingSenderId: '397799283843',
  appId: '1:397799283843:web:239c649ccaf672bd0f8fb6',
};

// Initialize Firebase

const app =
  firebase.apps.length === 0
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export default firebase;

// This is from your snippet up above:

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
