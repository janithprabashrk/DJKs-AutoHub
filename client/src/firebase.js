// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "primecare-mern-project.firebaseapp.com",
  projectId: "primecare-mern-project",
  storageBucket: "primecare-mern-project.appspot.com",
  messagingSenderId: "547292769992",
  appId: "1:547292769992:web:6ba72417a8e4a5cf70fffd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);