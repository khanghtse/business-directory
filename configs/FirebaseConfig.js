// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWdaAQlG_adGzNFxd5jP7rKG2RvuEUyBk",
  authDomain: "mobile-project-2c79a.firebaseapp.com",
  projectId: "mobile-project-2c79a",
  storageBucket: "mobile-project-2c79a.appspot.com",
  messagingSenderId: "282349361419",
  appId: "1:282349361419:web:4fa5a31d26fa6714adea0e",
  measurementId: "G-HENTE4KJJH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
//const analytics = getAnalytics(app);