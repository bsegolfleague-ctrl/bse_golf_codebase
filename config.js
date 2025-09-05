// Firebase + Firestore bootstrap (ES module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// *** Replace with your actual values if they change ***
const firebaseConfig = {
  apiKey: "AIzaSyA8fRBeMT7KJm5gDUORTxo-BiV47RVLTek",
  authDomain: "bse-golf-league.firebaseapp.com",
  projectId: "bse-golf-league",
  storageBucket: "bse-golf-league.firebasestorage.app",
  messagingSenderId: "821773780258",
  appId: "1:821773780258:web:bcb982ccd19aa24761517b"
};

// Initialize
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Helpers you can import elsewhere
export async function getRounds() {
  const snap = await getDocs(collection(db, "rounds"));
  const arr = [];
  snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
  return arr;
}

export async function addRoundDoc(docData) {
  // Ensure a timestamp is present
  if (!docData.Date) docData.Date = serverTimestamp();
  await addDoc(collection(db, "rounds"), docData);
}

// Also expose globally for non-module inline debugging if needed
window._firebase = { app, db };
