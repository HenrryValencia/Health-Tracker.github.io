// Pantalla principal para usuario registrado
export function renderHome(user) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="home">
      <h1>¡Hola, ${user?.nombre || 'Usuario'}!</h1>
      <div class="news">
        <h2>Noticias personalizadas</h2>
        <ul>
          <li>Recuerda beber agua cada 2 horas.</li>
          <li>Hoy es un buen día para caminar 30 minutos.</li>
        </ul>
      </div>
      <nav>
        <button id="profileBtn">Perfil</button>
        <button id="imcBtn">IMC</button>
        <button id="mealsBtn">Comidas</button>
        <button id="goalsBtn">Metas</button>
        <button id="extrasBtn">Extras</button>
      </nav>
    </section>
  `;
  document.getElementById('profileBtn').onclick = () => import('./profile.js').then(m => m.renderProfile(user));
  document.getElementById('imcBtn').onclick = () => import('./imc.js').then(m => m.renderIMC(user));
  document.getElementById('mealsBtn').onclick = () => import('./meals.js').then(m => m.renderMeals(user));
  document.getElementById('goalsBtn').onclick = () => import('./goals.js').then(m => m.renderGoals(user));
  document.getElementById('extrasBtn').onclick = () => import('./extras.js').then(m => m.renderExtras(user));
}
