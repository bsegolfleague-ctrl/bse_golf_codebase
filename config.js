const API_URL = "https://script.google.com/macros/s/AKfycbzdSaY4185FyFgKkB5lm_zuNHQb0GJfCiIsfoJKti0eH5bS1pg-gjYGP505ijuiGCSyog/exec";

// Global compatibility alias
const APPS_SCRIPT_URL = API_URL;

fetch(API_URL)
  .then(res => res.text())  // fetch as text, not JSON directly
  .then(text => JSON.parse(text))
  .then(data => console.log(data))
  .catch(err => console.error("Error fetching API:", err));



// Helper: Fetch with Retry
async function fetchWithRetry(url, options = {}, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === retries) throw err;
    }
  }
}

// Helper: Toast Notifications
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
