// Punto de entrada principal de la aplicación
import { renderWelcome } from './pages/welcome.js';


// Lógica de cambio de tema día/noche
function setTheme(mode) {
  const body = document.body;
  if (mode === 'dark') {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    document.getElementById('themeIcon').className = 'bi bi-sun';
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    document.getElementById('themeIcon').className = 'bi bi-moon';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderWelcome();
  // Cargar tema guardado
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
  // Listener del botón
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.onclick = () => {
      const isDark = document.body.classList.contains('dark-mode');
      setTheme(isDark ? 'light' : 'dark');
    };
  }
});
