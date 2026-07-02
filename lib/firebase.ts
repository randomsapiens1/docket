import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, getFirestore } from "firebase/firestore";
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

const existingApps = getApps();
const app = existingApps.length === 0 ? initializeApp(firebaseConfig) : existingApps[0];

export const auth = getAuth(app);
// Enable IndexedDB persistence so onSnapshot returns cached data instantly on revisit.
// initializeFirestore can only be called once; fall back to getFirestore on hot-reload.
export const db = existingApps.length === 0
  ? initializeFirestore(app, { localCache: persistentLocalCache() })
  : getFirestore(app);
export const storage = getStorage(app);
