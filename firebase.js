// Firebase v10 (modular) via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc,
  onSnapshot, query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// --- Your project's client config (safe to expose) ---
export const firebaseConfig = {
  apiKey: "AIzaSyA8fRBeMT7KJm5gDUORTxo-BiV47RVLTek",
  authDomain: "bse-golf-league.firebaseapp.com",
  projectId: "bse-golf-league",
  storageBucket: "bse-golf-league.firebasestorage.app",
  messagingSenderId: "821773780258",
  appId: "1:821773780258:web:bcb982ccd19aa24761517b"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// re-export Firestore helpers so other modules can import just from ./firebase.js
export {
  collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc,
  onSnapshot, query, orderBy, serverTimestamp
};