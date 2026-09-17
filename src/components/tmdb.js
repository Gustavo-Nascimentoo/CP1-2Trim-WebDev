const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "pt-BR";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";

const tmdbFetch = (path, query = "") => {
  const separator = query ? "&" : "";
  const url = `${BASE_URL}${path}?api_key=${API_KEY}&language=${LANGUAGE}${separator}${query}`;

  return fetch(url).then((response) => {
    if (!API_KEY) {
      throw new Error(
        "Chave da API do TMDB não configurada. Crie um arquivo .env com VITE_TMDB_API_KEY=sua_chave."
      );
    }

    if (!response.ok) {
      throw new Error(`Erro ao consultar o TMDB (status ${response.status})`);
    }

    return response.json();
  });
};

const getTrendingSeries = () => tmdbFetch("/trending/tv/week");

const searchSeries = (query, page = 1) =>
  tmdbFetch(
    "/search/tv",
    `query=${query}&page=${page}`
  );

const getSeriesDetails = (id) => tmdbFetch(`/tv/${id}`);

const getSeasonDetails = (id, seasonNumber) =>
  tmdbFetch(`/tv/${id}/season/${seasonNumber}`);

export {
  IMAGE_BASE,
  BACKDROP_BASE,
  getTrendingSeries,
  searchSeries,
  getSeriesDetails,
  getSeasonDetails,
};
