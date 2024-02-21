import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getReactNativePersistence} from 'firebase/auth/react-native';
import {initializeAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyCaVmrotY1FxYvQqvfdHnPg9tGS3kMvomM",
  authDomain: "esmeralda-9cbcf.firebaseapp.com",
  projectId: "esmeralda-9cbcf",
  storageBucket: "esmeralda-9cbcf.appspot.com",
  messagingSenderId: "49981549747",
  appId: "1:49981549747:web:a7256a88eb3f503ff414c6"
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
