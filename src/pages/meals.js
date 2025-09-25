// Planificación de comidas
export function renderMeals(user) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="meals">
      <h2>Planificación de Comidas</h2>
      <div>
        <h3>Menú Diario</h3>
        <ul>
          <li>Desayuno: Avena con frutas</li>
          <li>Almuerzo: Pollo a la plancha con ensalada</li>
          <li>Cena: Sopa de verduras</li>
        </ul>
      </div>
      <div>
        <h3>Menú Semanal</h3>
        <p>(Próximamente)</p>
      </div>
      <button id="backHome">Volver</button>
    </section>
  `;
  document.getElementById('backHome').onclick = () => import('./home.js').then(m => m.renderHome(user));
}
