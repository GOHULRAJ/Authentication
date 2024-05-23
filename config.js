//firebase configuration setup
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {initializeAuth, getReactNativePersistence, getAuth} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANYzgSHFK4U1dDNFJ1Xz2t9BYsd7Iz4ec",
  authDomain: "job-portal-b8e90.firebaseapp.com",
  projectId: "job-portal-b8e90",
  storageBucket: "job-portal-b8e90.appspot.com",
  messagingSenderId: "439684097511",
  appId: "1:439684097511:web:59b2cb119136f4306b4942",
  measurementId: "G-RSDXRF4V6F"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
let auth;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export { db,storage };

export {firebase};
export default auth;