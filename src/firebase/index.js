// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLkcQxR3tSJQWtQh9SYAF3GPc8avRHnQU",
  authDomain: "vue-firebase-f45ba.firebaseapp.com",
  projectId: "vue-firebase-f45ba",
  storageBucket: "vue-firebase-f45ba.firebasestorage.app",
  messagingSenderId: "591956932351",
  appId: "1:591956932351:web:ae50014b9efdaca8bcbeca",
  measurementId: "G-YD8QLZ2SWZ",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
