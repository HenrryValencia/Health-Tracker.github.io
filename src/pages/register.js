// Pantalla de registro de usuario
export function renderRegister() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="register">
      <h2>Registro de usuario</h2>
      <form id="registerForm">
        <input type="text" placeholder="Nombre" required />
        <input type="number" placeholder="Edad" required />
        <input type="number" placeholder="Peso (kg)" required />
        <input type="number" placeholder="Altura (cm)" required />
        <select required>
          <option value="">Género</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>
        <input type="email" placeholder="Correo electrónico" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Crear cuenta</button>
      </form>
      <p>¿Ya tienes cuenta? <a href="#" id="toLogin">Inicia sesión</a></p>
    </section>
  `;
  document.getElementById('toLogin').onclick = (e) => {
    e.preventDefault();
    import('./login.js').then(m => m.renderLogin());
  };
}
