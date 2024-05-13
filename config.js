//firebase configuration setup
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

export {firebase};