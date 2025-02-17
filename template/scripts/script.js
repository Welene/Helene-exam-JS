// import { displayMovieCard } from '../utils/domUtils.js';
import { fetchMovies } from "./modules/api.js";
// HER ANROPER JEG FUNKSJONENE, DET ER FRA MAIN.JS/SCRIPT.JS AT ALT KJØRES
console.log('test');

if(window.location.pathname === '/' || window.location.pathname === '/template/index.html') {
    console.log('index.html');

} else if(window.location.pathname === '/template/favorites.html') {
    console.log('favorites.html');

} else if(window.location.pathname === '/template/movie.html') {
    console.log('movie.html');

} else if(window.location.pathname === '/template/search.html') {
    console.log('search.html');

}

fetchMovies();
