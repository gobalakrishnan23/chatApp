// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0HEbelaDmspwe46TvtpTFOf0-LypbWSg",
  authDomain: "chat-app1-fc917.firebaseapp.com",
  projectId: "chat-app1-fc917",
  storageBucket: "chat-app1-fc917.firebasestorage.app",
  messagingSenderId: "978567974207",
  appId: "1:978567974207:web:81638693d41928e9f9978a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();