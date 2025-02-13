const BASE_PATH = import.meta.env.VITE_BASE_PATH;
const API_KEY = import.meta.env.VITE_API_KEY;

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getTopRatedMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko`
  ).then((res) => res.json());
}

export function getUpcomingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko`
  ).then((res) => res.json());
}

export function getAiringTodayTv() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getPopularTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko`).then(
    (res) => res.json()
  );
}

export function searchKeyword(name) {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${name}&language=ko`
  ).then((res) => res.json());
}

export function getMovieVideo(movieId) {
  return fetch(`${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("cannot be found");
      } else {
        return res.json();
      }
    })
    .catch((err) => console.log(err.message));
}

export function getMovie(movieId) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko`
  ).then((res) => res.json());
}

export function getTvVideo(tvId) {
  return fetch(`${BASE_PATH}/tv/${tvId}/videos?&api_key=${API_KEY}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("cannot be found");
      } else {
        return res.json();
      }
    })
    .catch((err) => console.log(err.message));
}

export function getTv(tvId, language = "") {
  return fetch(`
${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}&${language}`).then((res) =>
    res.json()
  );
}

export function getMovieCredit(movieId) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}/credits?api_key=${API_KEY}&language=ko`
  ).then((res) => res.json());
}

export function getTvCredit(tvId) {
  return fetch(
    `${BASE_PATH}/tv/${tvId}/credits?api_key=${API_KEY}&language=ko`
  ).then((res) => res.json());
}

export function getSimilarMovies(movieId) {
  return fetch(`${BASE_PATH}/movie/${movieId}/similar?api_key=${API_KEY}&language=ko
`).then((res) => res.json());
}

export function getSimilarTvs(tvId) {
  return fetch(
    `${BASE_PATH}/tv/${tvId}/similar?api_key=${API_KEY}&language=ko`
  ).then((res) => res.json());
}
