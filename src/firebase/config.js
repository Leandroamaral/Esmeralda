import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getReactNativePersistence} from 'firebase/auth/react-native';
import {initializeAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: ,
  authDomain: ,
  databaseURL: ,
  projectId: ,
  storageBucket: ,
  messagingSenderId: ,
  appId: ,
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();

// To persistent user login
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const auth = firebase.auth();

export {firebase, auth, db};
