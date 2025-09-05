// Common UI helpers + persistent bottom nav highlight + theme toggle
export function $(sel, ctx=document){ return ctx.querySelector(sel); }
export function $all(sel, ctx=document){ return [...ctx.querySelectorAll(sel)]; }

export function setActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.bottom-nav a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === path);
  });
}

// Theme
export function applyTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.dataset.theme = saved;
}
export function toggleTheme() {
  const cur = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = cur;
  localStorage.setItem('theme', cur);
}

// Simple toast
export function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=> t.classList.add('show'), 10);
  setTimeout(()=> { t.classList.remove('show'); setTimeout(()=>t.remove(), 300); }, 2200);
}