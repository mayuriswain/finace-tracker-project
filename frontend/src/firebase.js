
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBTT4XuPJ3I7yq-yPZFLTFbFXZs9AXI8QQ",
    authDomain: "finance-tracker-eb5ea.firebaseapp.com",
    projectId: "finance-tracker-eb5ea",
    storageBucket: "finance-tracker-eb5ea.firebasestorage.app",
    messagingSenderId: "585071916188",
    appId: "1:585071916188:web:f9bc434b45203d1d5ee959",
    measurementId: "G-SD2E995FH8"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
