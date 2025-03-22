// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "taskmanager-copied.firebaseapp.com",
  projectId: "taskmanager-copied",
  storageBucket: "taskmanager-copied.firebasestorage.app",
  messagingSenderId: "186493169130",
  appId: "1:186493169130:web:89dd1b172d7e28aca11693"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);