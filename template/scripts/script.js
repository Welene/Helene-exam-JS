// import { displayMovieCard } from '../utils/domUtils.js';
import { searchFunction } from './utils/domUtils.js';
// import { renderTrailers } from './modules/caroussel.js';


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

searchFunction(); // anroper searchFunction, som anroper fetchMovies inni seg, så den anroper begge da, NÅR MAN TRYKKER på search altså så kjører funksjonen som er i domUtils.js

// renderTrailers(movie, num);