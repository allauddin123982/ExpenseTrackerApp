// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//2
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4k6YqYqmyxPJYbYtycBe0OuiinKz-r5U",
  authDomain: "expense-tracker-a11c4.firebaseapp.com",
  projectId: "expense-tracker-a11c4",
  storageBucket: "expense-tracker-a11c4.appspot.com",
  messagingSenderId: "1015058038781",
  appId: "1:1015058038781:web:7eed054700af9e52bee394"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//3
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

//firebase login 
// firebase init 
//firebase deploy