// Pantalla de bienvenida (antes de iniciar sesión)
import { fetchHealthNews } from '../services/newsService.js';

export function renderWelcome() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="welcome container py-5">
      <h1 class="mb-4 text-center">Bienvenido a Health Tracker</h1>
      <div class="news mb-4">
        <h2 class="mb-3">Noticias de salud</h2>
        <div id="newsList" class="row g-3 justify-content-center">
          <div class="text-center text-secondary">Cargando noticias...</div>
        </div>
      </div>
      <div class="actions d-flex justify-content-center gap-3">
        <button id="loginBtn" class="btn btn-primary px-4">Iniciar sesión</button>
        <button id="registerBtn" class="btn btn-outline-primary px-4">Registrarse</button>
        <button id="testerBtn" class="btn btn-success px-4">Tester: Ir al inicio</button>
      </div>
    </section>
  `;
  document.getElementById('loginBtn').onclick = () => import('./login.js').then(m => m.renderLogin());
  document.getElementById('registerBtn').onclick = () => import('./register.js').then(m => m.renderRegister());

  // Botón tester para ir directo al home
  document.getElementById('testerBtn').onclick = () => import('./home.js').then(m => m.renderHome({nombre: 'Tester'}));

  // Noticias locales de respaldo
  const fallbackNews = [
    {
      title: 'La hidratación y tu salud',
      description: 'Beber suficiente agua diariamente ayuda a mantener la energía, la concentración y el buen funcionamiento de tu organismo.',
      url: '#',
      urlToImage: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&w=600&h=400&fit=crop'
    },
    {
      title: 'Beneficios del ejercicio regular',
      description: 'El ejercicio físico reduce el riesgo de enfermedades crónicas y mejora tu estado de ánimo y calidad de sueño.',
      url: '#',
      urlToImage: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=600&h=400&fit=crop'
    },
    {
      title: 'Alimentación balanceada',
      description: 'Una dieta equilibrada aporta los nutrientes necesarios para fortalecer tu sistema inmune y mantener un peso saludable.',
      url: '#',
      urlToImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=600&h=400&fit=crop'
    },
    {
      title: 'Importancia del sueño',
      description: 'Dormir bien es esencial para la recuperación física y mental, y para el correcto funcionamiento del metabolismo.',
      url: '#',
      urlToImage: 'https://images.pexels.com/photos/935777/pexels-photo-935777.jpeg?auto=compress&w=600&h=400&fit=crop'
    },
    {
      title: 'Control del estrés',
      description: 'Practicar técnicas de relajación como la meditación o la respiración profunda ayuda a reducir el estrés y mejora la salud general.',
      url: '#',
      urlToImage: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&w=600&h=400&fit=crop'
    },
    {
      title: 'Chequeos médicos regulares',
      description: 'Realizar revisiones médicas periódicas permite detectar a tiempo posibles problemas de salud y mantener un bienestar óptimo.',
      url: '#',
      urlToImage: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&w=600&h=400&fit=crop'
    }
  ];

  // Cargar noticias reales o mostrar fallback
  fetchHealthNews().then(news => {
    const newsList = document.getElementById('newsList');
    let articles = news && news.length > 0 ? news : fallbackNews;
    newsList.innerHTML = articles.map((article, i) => `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0 animate-news news-hover-card" style="animation-delay: ${i * 0.12}s;">
          <div class="news-img-title">
            <img src="${article.urlToImage || ''}" class="card-img-top" alt="Imagen noticia" onerror="this.src='https://via.placeholder.com/600x400?text=Imagen+no+disponible'">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
            </div>
          </div>
          <div class="news-summary">
            <div class="card-body">
              <p class="card-text mb-2">${article.description ? article.description : ''}</p>
              ${article.url && article.url !== '#' ? `<a href="${article.url}" class="btn btn-sm btn-primary" target="_blank" rel="noopener">Leer más</a>` : ''}
            </div>
          </div>
        </div>
      </div>
    `).join('');
  });
}
