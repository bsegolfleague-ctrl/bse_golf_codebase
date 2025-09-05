const API_URL = "https://script.google.com/macros/s/AKfycbxRYJMyUgFrouSK7iYfM45rr_HeOw9sTRWu1X4uy9igMrGJCsnleDQXUGDNyvYvRy7V_Q/exec";

fetch(API_URL)
  .then(res => res.text())  // fetch as text, not JSON directly
  .then(text => JSON.parse(text))
  .then(data => console.log(data));

