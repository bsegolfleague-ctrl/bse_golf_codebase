const API_URL = "https://script.google.com/macros/s/AKfycbygN4RkE8M04_oPudIZKrZmibGnrotF13W80a7KXPQkabREbaLPZTDPiGuapbOE7d8q0A/exec";

fetch(API_URL)
  .then(res => res.text())  // fetch as text, not JSON directly
  .then(text => JSON.parse(text))
  .then(data => console.log(data));

