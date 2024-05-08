//firebase configuration setup
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCosfeQiyVdhJ0GyIzcISYaFe6qtMrm0tQ",
  authDomain: "testfcm-92073.firebaseapp.com",
  projectId: "testfcm-92073",
  storageBucket: "testfcm-92073.appspot.com",
  messagingSenderId: "1085047556127",
  appId: "1:1085047556127:web:748084b1aa48d6cf6dad2a"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};