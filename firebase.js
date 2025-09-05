// Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8fRBeMT7KJm5gDUORTxo-BiV47RVLTek",
  authDomain: "bse-golf-league.firebaseapp.com",
  projectId: "bse-golf-league",
  storageBucket: "bse-golf-league.firebasestorage.app",
  messagingSenderId: "821773780258",
  appId: "1:821773780258:web:bcb982ccd19aa24761517b"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);