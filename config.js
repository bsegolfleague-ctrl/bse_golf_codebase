// config.js
// Firebase + Firestore (browser, ES modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase config (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyA8fRBeMT7KJm5gDUORTxo-BiV47RVLTek",
  authDomain: "bse-golf-league.firebaseapp.com",
  projectId: "bse-golf-league",
  storageBucket: "bse-golf-league.firebasestorage.app",
  messagingSenderId: "821773780258",
  appId: "1:821773780258:web:bcb982ccd19aa24761517b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Add a round; Holes is an array of numbers (length can be 9, 18, etc.)
export async function addRound({ Player, Course, Date, Holes }) {
  const holes = Array.isArray(Holes)
    ? Holes.map(n => Number(n)).filter(n => !Number.isNaN(n))
    : [];
  const payload = {
    Player: Player ?? "",
    Course: Course ?? "",
    Date: Date ? new Date(Date) : serverTimestamp(),
    Holes: holes,
    Total: holes.reduce((a, b) => a + b, 0)
  };
  await addDoc(collection(db, "rounds"), payload);
}

// Fetch all rounds and normalize shape
export async function getRounds() {
  const snap = await getDocs(collection(db, "rounds"));
  const rows = [];
  snap.forEach(doc => {
    const d = doc.data();
    const holes = Array.isArray(d.Holes) ? d.Holes : [];
    const total = (typeof d.Total === "number" && !Number.isNaN(d.Total))
      ? d.Total
      : holes.reduce((a, b) => a + b, 0);
    const date = d.Date?.toDate ? d.Date.toDate() : (d.Date ? new Date(d.Date) : null);
    rows.push({
      id: doc.id,
      Player: d.Player || "",
      Course: d.Course || "",
      Date: date,
      Holes: holes,
      Total: total
    });
  });
  return rows;
}

// Compute leaderboard from rounds
export function computeLeaderboard(rounds) {
  const byPlayer = new Map();
  for (const r of rounds) {
    if (!r.Player) continue;
    if (!byPlayer.has(r.Player)) byPlayer.set(r.Player, { total: 0, count: 0 });
    const p = byPlayer.get(r.Player);
    p.total += Number(r.Total || 0);
    p.count += 1;
  }
  const out = [];
  byPlayer.forEach((v, name) => {
    out.push({
      Player: name,
      TotalScore: v.total,
      AverageScore: v.count ? v.total / v.count : 0,
      EventsPlayed: v.count
    });
  });
  out.sort((a, b) => a.AverageScore - b.AverageScore);
  return out;
}

// Optional: small debug handle in dev tools
window._firebase = { app };
