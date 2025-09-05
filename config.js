const API_URL = "https://script.google.com/macros/s/AKfycbwH1-KTkDAtH0kuOF9fvfUPvPgTj8jy7ZJUYh-sRUzBpccS0ROTMMLdd-LXPRI3lXAg0w/exec";

// Global compatibility alias
const APPS_SCRIPT_URL = API_URL;

fetch(API_URL)
  .then(res => res.text())  // fetch as text, not JSON directly
  .then(text => JSON.parse(text))
  .then(data => console.log(data))
  .catch(err => console.error("Error fetching API:", err));

