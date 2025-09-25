// Servicio para obtener noticias reales de salud
export async function fetchHealthNews() {
  // Puedes reemplazar esta URL por una API real de noticias de salud
  const url = 'https://newsapi.org/v2/top-headlines?category=health&language=es&apiKey=TU_API_KEY';
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.articles) {
      return data.articles.slice(0, 5); // Solo las 5 más recientes
    }
    return [];
  } catch (e) {
    return [];
  }
}
