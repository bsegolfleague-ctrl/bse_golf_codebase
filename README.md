
# BSE Golf – Modern Firestore Scorecard

This version is **Google Sheets–free** and uses **Firebase Firestore** only. It includes:
- `setup.html` – choose course, date, hole count (1–36), select/add players
- `submit.html` – modern scorecard: required **Par** row, flexible holes, live totals, **DNF** support
- `leaderboard.html` – averages ignore DNFs
- `history.html` – shows totals or **DNF** only (no partial scores)
- `config.js` – Firebase SDK + Firestore helpers
- `style.css` – clean, responsive look
- `index.html` – quick navigation

## Quick Start
1. **Enable Firestore** in your Firebase project (in native mode).
2. **Create collections** (no schema needed):
   - `Players` – docs keyed by lowercase name (fields: `{ name, createdAt }`)
   - `Rounds` – created by the app when you save a round
3. *(Optional for testing)* Set permissive rules (remember to restrict later):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
4. Upload all files to your GitHub Pages repo. Open `setup.html` to select players and start a round, then go to `submit.html` to enter scores and save.

## Notes
- **Par row is required** before saving. Any player with one or more blank holes is saved as **DNF**; history shows just `DNF` for them.
- Leaderboard ignores DNF entries when computing averages.
- Players are stored once in `Players` and reused in future rounds.

## Tighten Security (recommended later)
Use Firebase Authentication and rules that allow writes only to authenticated users:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /Players/{playerId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /Rounds/{roundId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
