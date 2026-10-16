// Footer year
document.getElementById('yr').textContent = new Date().getFullYear();

// Theme toggle (remembers choice when storage is available)
const root = document.documentElement;
const btn = document.getElementById('themeBtn');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
try {
  const saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;
} catch (e) {}
btn.addEventListener('click', () => {
  const current = root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Highlight the nav link of the section in view
const links = document.querySelectorAll('nav ul a');
const sections = [...links].map(a => document.querySelector(a.getAttribute('href')));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s && observer.observe(s));
