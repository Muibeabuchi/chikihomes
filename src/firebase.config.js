// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw0cUmrhRePdZiASJRNEGEehBC95Xi7Rc",
  authDomain: "chikihomes-webapp.firebaseapp.com",
  projectId: "chikihomes-webapp",
  storageBucket: "chikihomes-webapp.appspot.com",
  messagingSenderId: "206122980598",
  appId: "1:206122980598:web:0f8918197b5286802b08d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();