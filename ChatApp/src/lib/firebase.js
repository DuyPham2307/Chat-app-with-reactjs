import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQx5XLS6Lk9iDgLUdLRBCpNFOQM5kCamo",
  authDomain: "chat-app-with-react-a867a.firebaseapp.com",
  projectId: "chat-app-with-react-a867a",
  storageBucket: "chat-app-with-react-a867a.firebasestorage.app",
  messagingSenderId: "1055872772221",
  appId: "1:1055872772221:web:d4c74dab5278efde9a6914",
  measurementId: "G-WBNKCJJTV6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
