// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgBjBH2MpspxUuIkdNhL6o_94gUZI0LRk",
  authDomain: "habitude-9c3b2.firebaseapp.com",
  projectId: "habitude-9c3b2",
  storageBucket: "habitude-9c3b2.firebasestorage.app",
  messagingSenderId: "338401166651",
  appId: "1:338401166651:web:5eb2880538305b64d9631e",
  measurementId: "G-73G4STM049"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
