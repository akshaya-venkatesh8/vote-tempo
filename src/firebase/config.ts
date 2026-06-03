import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnvet_o08yPlj5eZWVip_j1KcsgrmifVA",
  authDomain: "goumo-dance-polling-app.firebaseapp.com",
  projectId: "goumo-dance-polling-app",
  storageBucket: "goumo-dance-polling-app.firebasestorage.app",
  messagingSenderId: "38226808635",
  appId: "1:38226808635:web:68f3027bbfb456be66b11e",
  measurementId: "G-MLPF9TLSNE",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
