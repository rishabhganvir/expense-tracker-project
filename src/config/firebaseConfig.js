// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKN8NR6nvfrYDzrGnRlAuWKVIjBYfvLp8",
  authDomain: "expense-tracker-25b3e.firebaseapp.com",
  projectId: "expense-tracker-25b3e",
  storageBucket: "expense-tracker-25b3e.appspot.com",
  messagingSenderId: "486628497531",
  appId: "1:486628497531:web:d3ded41d0e0bbeabeaaade",
  measurementId: "G-66F3VX3KG2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
