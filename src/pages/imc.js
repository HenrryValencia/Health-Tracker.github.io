// Registro y evolución de IMC
export function renderIMC(user) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="imc">
      <h2>Índice de Masa Corporal (IMC)</h2>
      <form id="imcForm">
        <input type="number" id="peso" placeholder="Peso (kg)" value="${user?.peso || ''}" required />
        <input type="number" id="altura" placeholder="Altura (cm)" value="${user?.altura || ''}" required />
        <button type="submit">Calcular IMC</button>
      </form>
      <div id="imcResult"></div>
      <button id="backHome">Volver</button>
    </section>
  `;
  document.getElementById('imcForm').onsubmit = (e) => {
    e.preventDefault();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value) / 100;
    const imc = (peso / (altura * altura)).toFixed(2);
    document.getElementById('imcResult').innerHTML = `<p>Tu IMC es: <b>${imc}</b></p>`;
    // Aquí se podría guardar el histórico de IMC
  };
  document.getElementById('backHome').onclick = () => import('./home.js').then(m => m.renderHome(user));
}
