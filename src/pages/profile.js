// Perfil de usuario
export function renderProfile(user) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="profile">
      <h2>Perfil de Usuario</h2>
      <ul>
        <li><b>Nombre:</b> ${user?.nombre || ''}</li>
        <li><b>Edad:</b> ${user?.edad || ''}</li>
        <li><b>Peso:</b> ${user?.peso || ''} kg</li>
        <li><b>Altura:</b> ${user?.altura || ''} cm</li>
        <li><b>Género:</b> ${user?.genero || ''}</li>
        <li><b>Correo:</b> ${user?.correo || ''}</li>
      </ul>
      <button id="backHome">Volver</button>
    </section>
  `;
  document.getElementById('backHome').onclick = () => import('./home.js').then(m => m.renderHome(user));
}
