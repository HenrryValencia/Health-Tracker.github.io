// Metas diarias y semanales
export function renderGoals(user) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="goals">
      <h2>Metas</h2>
      <ul>
        <li>Hidratación: 8 vasos de agua</li>
        <li>Ejercicio: 30 minutos</li>
        <li>Sueño: 8 horas</li>
      </ul>
      <p>Progreso diario y semanal (próximamente)</p>
      <button id="backHome">Volver</button>
    </section>
  `;
  document.getElementById('backHome').onclick = () => import('./home.js').then(m => m.renderHome(user));
}
