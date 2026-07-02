import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4EVYk6oxLAxHBRLQqyzLTZtXtd-arIuM",
  authDomain: "docket-3a7b5.firebaseapp.com",
  projectId: "docket-3a7b5",
  storageBucket: "docket-3a7b5.firebasestorage.app",
  messagingSenderId: "529528719916",
  appId: "1:529528719916:web:181fe9dd32eb31311c1f89",
  measurementId: "G-65EB42MG3F",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
