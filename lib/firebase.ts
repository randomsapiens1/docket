import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABE26uPVCVX7jLZRkktjfR-jTrpLcgtoI",
  authDomain: "docket-37a2d.firebaseapp.com",
  projectId: "docket-37a2d",
  storageBucket: "docket-37a2d.firebasestorage.app",
  messagingSenderId: "1008686238122",
  appId: "1:1008686238122:web:002a892a4a830e8aedc3d3",
  measurementId: "G-XQN2J89524",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
