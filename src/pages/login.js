// Pantalla de inicio de sesión
export function renderLogin() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="login">
      <h2>Iniciar sesión</h2>
      <form id="loginForm">
        <input type="email" placeholder="Correo electrónico" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
      </form>
      <p>¿No tienes cuenta? <a href="#" id="toRegister">Regístrate</a></p>
    </section>
  `;
  document.getElementById('toRegister').onclick = (e) => {
    e.preventDefault();
    import('./register.js').then(m => m.renderRegister());
  };
}
