
// config.js - Firebase + Firestore helpers (no Google Sheets)
// Uses CDN ES modules so it works on GitHub Pages without bundling.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getFirestore, collection, addDoc, getDocs, setDoc, doc, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// TODO: If you rotate keys later, update these values from Firebase Console.
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

// ---- Players API ----
export async function getPlayers() {
  const snap = await getDocs(collection(db, "Players"));
  const out = [];
  snap.forEach(d => {
    const data = d.data();
    out.push({ id: d.id, name: data.name });
  });
  // sort by name by default
  out.sort((a,b) => a.name.localeCompare(b.name));
  return out;
}

export async function addPlayer(name) {
  const trimmed = (name || "").trim();
  if (!trimmed) throw new Error("Player name required");
  // use name as doc id (stable), lowercased key to avoid dup casing
  const key = trimmed.toLowerCase();
  await setDoc(doc(db, "Players", key), {
    name: trimmed,
    createdAt: serverTimestamp()
  }, { merge: true });
  return { id: key, name: trimmed };
}

// ---- Rounds API ----
export async function saveRound({ Course, DateValue, Holes, Par, Scores, Totals }) {
  const payload = {
    Course: Course || "",
    Date: DateValue ? new Date(DateValue) : serverTimestamp(),
    Holes: Number(Holes) || 0,
    Par: Array.isArray(Par) ? Par.map(n => Number(n)) : [],
    Scores,  // { name: number[] | [] }
    Totals   // { name: number | "DNF" }
  };
  await addDoc(collection(db, "Rounds"), payload);
  return true;
}

// Fetch all rounds
export async function getRounds() {
  const snap = await getDocs(collection(db, "Rounds"));
  const out = [];
  snap.forEach(d => {
    const data = d.data();
    // Normalize Date to JS Date
    const dt = data.Date?.toDate ? data.Date.toDate() : (data.Date ? new Date(data.Date) : null);
    out.push({
      id: d.id,
      Course: data.Course || "",
      Date: dt,
      Holes: Number(data.Holes) || 0,
      Par: Array.isArray(data.Par) ? data.Par : [],
      Scores: data.Scores || {},
      Totals: data.Totals || {}
    });
  });
  // newest first
  out.sort((a,b) => (b.Date?.getTime?.()||0) - (a.Date?.getTime?.()||0));
  return out;
}

// Leaderboard calculation: average of numeric totals only; DNFs are ignored
export function computeLeaderboard(rounds) {
  const map = new Map(); // name -> { total: number, count: number }
  for (const r of rounds) {
    const totals = r.Totals || {};
    for (const [name, val] of Object.entries(totals)) {
      if (typeof val === "number" && !Number.isNaN(val)) {
        if (!map.has(name)) map.set(name, { total: 0, count: 0 });
        const s = map.get(name);
        s.total += val;
        s.count += 1;
      }
    }
  }
  const rows = [];
  for (const [name, { total, count }] of map.entries()) {
    rows.push({
      Player: name,
      TotalScore: total,
      EventsPlayed: count,
      AverageScore: count ? total / count : 0
    });
  }
  rows.sort((a,b) => a.AverageScore - b.AverageScore);
  return rows;
}

// Small debug handle
window._bse = { app };
