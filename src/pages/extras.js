// Extras: notificaciones, reportes, recomendaciones
export function renderExtras(user) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="extras">
      <h2>Extras</h2>
      <ul>
        <li>Notificaciones y recordatorios (próximamente)</li>
        <li>Reportes y estadísticas (próximamente)</li>
        <li>Recomendaciones personalizadas (próximamente)</li>
      </ul>
      <button id="backHome">Volver</button>
    </section>
  `;
  document.getElementById('backHome').onclick = () => import('./home.js').then(m => m.renderHome(user));
}
