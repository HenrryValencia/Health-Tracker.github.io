
export function renderHome(user) {
  // Utilidades para manejar registros en localStorage
  function getRegistros() {
    return JSON.parse(localStorage.getItem('caloriasRegistros') || '[]');
  }
  function saveRegistro(tipo, cantidad) {
    const now = new Date();
    const fecha = now.toLocaleDateString();
    const hora = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const nuevo = { tipo, cantidad: Number(cantidad), fecha, hora };
    const registros = getRegistros();
    registros.push(nuevo);
    localStorage.setItem('caloriasRegistros', JSON.stringify(registros));
  }
  function resumenPorDia() {
    const registros = getRegistros();
    const resumen = {};
    registros.forEach(r => {
      if (!resumen[r.fecha]) resumen[r.fecha] = {consumidas:0, quemadas:0, detalles:[]};
      if (r.tipo === 'consumida') resumen[r.fecha].consumidas += r.cantidad;
      if (r.tipo === 'quemada') resumen[r.fecha].quemadas += r.cantidad;
      resumen[r.fecha].detalles.push(r);
    });
    return resumen;
  }

  const app = document.getElementById('app');
  // Datos de usuario de prueba si no existen
  const datos = {
    nombre: user?.nombre || 'Tester',
    apellidos: user?.apellidos || 'Demo',
    peso: user?.peso || 70,
    talla: user?.talla || 170,
    img: user?.img || 'https://randomuser.me/api/portraits/men/32.jpg',
    genero: user?.genero || 'masculino',
    edad: user?.edad || 30
  };
  // Fórmula Harris-Benedict simplificada para calorías diarias
  const calorias = datos.genero === 'femenino'
    ? Math.round(655 + (9.6 * datos.peso) + (1.8 * datos.talla) - (4.7 * datos.edad))
    : Math.round(66 + (13.7 * datos.peso) + (5 * datos.talla) - (6.8 * datos.edad));

  app.innerHTML = `
  <section class="home d-flex" style="min-height:100vh;">
      <aside class="sidebar-nav glass-box d-flex flex-column align-items-center py-4 px-2">
        <button id="profileBtn" class="btn btn-outline-primary mb-2 w-100">Perfil</button>
        <button id="imcBtn" class="btn btn-outline-primary mb-2 w-100">IMC</button>
        <button id="mealsBtn" class="btn btn-outline-primary mb-2 w-100">Comidas</button>
        <button id="goalsBtn" class="btn btn-outline-primary mb-2 w-100">Metas</button>
        <button id="extrasBtn" class="btn btn-outline-primary w-100">Extras</button>
      </aside>
      <div class="main-content flex-grow-1 d-flex flex-column align-items-center justify-content-center position-relative">
  <div class="user-summary glass-box d-flex flex-column align-items-center mb-4 p-4" id="userSummary">
        <img src="${datos.img}" alt="Usuario" class="rounded-circle mb-3" style="width:140px;height:140px;object-fit:cover;border:4px solid #00e0d3;">
        <div class="text-center mb-2">
          <div class="fw-bold" style="font-size:1.5rem;">${datos.nombre} ${datos.apellidos}</div>
          <div style="font-size:1.15rem;">${datos.peso} kg &nbsp;|&nbsp; ${datos.talla} cm</div>
        </div>
        <div class="calorias-meta text-center mb-2" style="font-size:2.5rem;font-weight:800;color:#00e0d3;line-height:1.1;">
          ${calorias} kcal
          <div style="font-size:1.1rem;font-weight:400;color:#222;letter-spacing:0.5px;">Meta diaria</div>
        </div>
      </div>
      <h1 class="mt-5">¡Hola, ${datos.nombre}!</h1>
      <div class="news mt-4 mb-5">
        <h2>Noticias personalizadas</h2>
        <ul>
          <li>Recuerda beber agua cada 2 horas.</li>
          <li>Hoy es un buen día para caminar 30 minutos.</li>
        </ul>
      </div>
      <!-- Menú lateral ahora es sidebar -->
      <div style="height: 80px;"></div>
      <div class="calorias-bottom position-relative mb-5 mt-5 w-100 d-flex flex-column align-items-center">
        <div class="mb-2 text-center" style="font-size:1.1rem;color:#00b894;font-weight:600;">
          Calorías quemadas en reposo estimadas: <span id="calRest">${Math.round(calorias * 0.7)} kcal/día</span>
        </div>
        <div class="d-flex gap-3 flex-wrap justify-content-center mb-2">
          <button id="addCalBtn" class="btn btn-outline-success">Ingresar calorías (+)</button>
          <button id="addBurnBtn" class="btn btn-outline-danger">Registrar ejercicio (-)</button>
        </div>
        <div id="resumenDiario" class="w-100 mt-2"></div>
      </div>
      <div id="modalCalorias" class="modal-calorias d-none">
        <div class="modal-content-calorias">
          <h4 id="modalTitulo"></h4>
          <input id="inputCantidad" type="number" min="1" class="form-control mb-2" placeholder="Cantidad (kcal)">
          <button id="guardarRegistro" class="btn btn-primary w-100 mb-2">Guardar</button>
          <button id="cerrarModal" class="btn btn-secondary w-100">Cancelar</button>
        </div>
      </div>
      </div>
    </div>
    </section>
  `;
  document.getElementById('profileBtn').onclick = () => import('./profile.js').then(m => m.renderProfile(user));
  document.getElementById('imcBtn').onclick = () => import('./imc.js').then(m => m.renderIMC(user));
  document.getElementById('mealsBtn').onclick = () => import('./meals.js').then(m => m.renderMeals(user));
  document.getElementById('goalsBtn').onclick = () => import('./goals.js').then(m => m.renderGoals(user));
  document.getElementById('extrasBtn').onclick = () => import('./extras.js').then(m => m.renderExtras(user));

  // Modal para ingresar calorías o ejercicio
  const modal = document.getElementById('modalCalorias');
  const inputCantidad = document.getElementById('inputCantidad');
  const modalTitulo = document.getElementById('modalTitulo');
  const guardarRegistro = document.getElementById('guardarRegistro');
  const cerrarModal = document.getElementById('cerrarModal');
  let tipoRegistro = '';

  function abrirModal(tipo) {
    tipoRegistro = tipo;
    modalTitulo.textContent = tipo === 'consumida' ? 'Ingresar calorías consumidas' : 'Registrar calorías quemadas';
    inputCantidad.value = '';
    modal.classList.remove('d-none');
    inputCantidad.focus();
  }
  function cerrar() {
    modal.classList.add('d-none');
  }
  guardarRegistro.onclick = () => {
    if (inputCantidad.value && Number(inputCantidad.value) > 0) {
      saveRegistro(tipoRegistro, inputCantidad.value);
      cerrar();
      renderHome(user);
    }
  };
  cerrarModal.onclick = cerrar;
  document.getElementById('addCalBtn').onclick = () => abrirModal('consumida');
  document.getElementById('addBurnBtn').onclick = () => abrirModal('quemada');

  // Mostrar resumen diario
  function renderResumen() {
    const resumen = resumenPorDia();
    let semanaOffset = window._semanaOffset || 0;
    const hoy = new Date();
    // Calcular lunes de la semana mostrada (offset)
    const diaSemana = hoy.getDay() === 0 ? 7 : hoy.getDay(); // 1=lunes, 7=domingo
    const lunes = new Date(hoy);
    lunes.setDate(hoy.getDate() - (diaSemana - 1) + semanaOffset * 7);
    // Centrar el día actual
    let html = '<div class="resumen-semana-scroll"><div class="resumen-semana-grid">';
    let hoyIndex = -1;
    for (let i = 0; i < 7; i++) {
      const fechaObj = new Date(lunes);
      fechaObj.setDate(lunes.getDate() + i);
      const fechaStr = fechaObj.toLocaleDateString();
      const nombreDia = fechaObj.toLocaleDateString('es-ES', { weekday: 'short' });
      const isHoy = fechaObj.toLocaleDateString() === (new Date()).toLocaleDateString() && semanaOffset === 0;
      if (isHoy) hoyIndex = i;
      const r = resumen[fechaStr] || {consumidas:0, quemadas:0, detalles:[]};
      html += `<div class="${isHoy ? 'resumen-dia-hoy' : 'resumen-dia'} text-center p-2 resumen-dia-col">
        <div class="fw-bold" style="font-size:${isHoy ? '1.5rem' : '1.1rem'};color:${isHoy ? '#00e0d3' : '#222'};">
          ${nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1)}<br>${fechaStr}${isHoy ? ' (HOY)' : ''}
        </div>
        <div>Consumidas: <b>${r.consumidas}</b> kcal<br>Quemadas: <b>${r.quemadas}</b> kcal</div>
        <div class="text-muted" style="font-size:0.95rem;word-break:break-word;">${r.detalles.length ? r.detalles.map(d=>`${d.tipo==='consumida'?'+':'-'}${d.cantidad}kcal (${d.hora})`).join('<br>') : '<span style=\'opacity:.5\'>Sin registros</span>'}</div>
      </div>`;
    }
    html += '</div>';
    // Botones para navegar semanas
    html += `<div class="d-flex justify-content-center gap-3 mt-3">
      <button id="semanaPrev" class="btn btn-outline-secondary">&#8592; Semana anterior</button>
      <button id="semanaNext" class="btn btn-outline-secondary">Semana siguiente &#8594;</button>
    </div></div>`;
    document.getElementById('resumenDiario').innerHTML = html;
    // Scroll automático para centrar el día actual
    setTimeout(() => {
      const grid = document.querySelector('.resumen-semana-grid');
      if (grid && hoyIndex >= 0) {
        const col = grid.children[hoyIndex];
        if (col) col.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
      }
    }, 100);
    // Navegación infinita
    document.getElementById('semanaPrev').onclick = () => {
      window._semanaOffset = (window._semanaOffset||0) - 1;
      renderResumen();
    };
    document.getElementById('semanaNext').onclick = () => {
      window._semanaOffset = (window._semanaOffset||0) + 1;
      renderResumen();
    };
  }
  renderResumen();
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    const el = document.getElementById('userSummary');
    if (!el) return;
    if (curr > 40 && curr > lastScroll) {
      el.classList.add('user-summary-small');
    } else if (curr < 40) {
      el.classList.remove('user-summary-small');
    }
    lastScroll = curr;
  });
}
