// Pantalla de bienvenida (antes de iniciar sesión)
export function renderWelcome() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="welcome">
      <h1>Bienvenido a Health Tracker</h1>
      <div class="news">
        <h2>Noticias de salud</h2>
        <ul>
          <li>La hidratación mejora tu concentración y energía.</li>
          <li>El ejercicio regular reduce el riesgo de enfermedades crónicas.</li>
        </ul>
      </div>
      <div class="actions">
        <button id="loginBtn">Iniciar sesión</button>
        <button id="registerBtn">Registrarse</button>
      </div>
    </section>
  `;
  document.getElementById('loginBtn').onclick = () => import('./login.js').then(m => m.renderLogin());
  document.getElementById('registerBtn').onclick = () => import('./register.js').then(m => m.renderRegister());
}
