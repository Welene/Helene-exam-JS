// import { displayMovieCard } from '../utils/domUtils.js';
import { searchFunction } from './utils/domUtils.js';
import { fetchTrailers } from './modules/api.js';
import { renderTrailers } from './modules/caroussel.js';

import { fetchTopMovies } from './modules/api.js';

import { createMovieCard } from './components/movieCard.js';
import { displayMovieCard } from './utils/domUtils.js';
import { oData } from './data/data.js';
// import { displayMovieCard } from './utils/domUtils.js';



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


// denne passer tydeligvis å ha her i script.js
export async function getFetchTrailers() {
    try {
        if (window.location.pathname === '/' || window.location.pathname === '/template/index.html') { // om jeg ikke er på index.html, får jeg ikke errorMsg av at trailere ikke vises, de skal ikke vises på search siden
            const allTrailers = await fetchTrailers();
            let randomTrailers = allTrailers.sort(() => Math.random() - 0.5).slice(0, 5); 

            randomTrailers.forEach((movie, index) => { 
                renderTrailers(movie, index + 1); 
            });
        } 
    } catch (error) {
        console.error("Noe er mektig galt her for å si det sånn...", error);
    }
} 

getFetchTrailers();

async function displayMovies() {
    await fetchTopMovies();  // Henter filmer fra API-et og lagrer dem i oData.topMovieList
    const movies = oData.topMovieList;  // Få tilgang til listen med filmer

    // For hver film, lager et kort og viser det
    movies.slice(0, 15).forEach(movie => {
        const card = createMovieCard(movie);  
        displayMovieCard(card);  
    });
}

displayMovies();