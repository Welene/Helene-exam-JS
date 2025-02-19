// import { displayMovieCard } from '../utils/domUtils.js';
import { searchFunction } from './utils/domUtils.js';
import { fetchTrailers } from './modules/api.js';
import { renderTrailers } from './modules/caroussel.js';
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



// export async function getFetchTrailers() {
//     let randomTrailers = fetchTrailers();
//     randomTrailers.forEach((movie, index) => {
//         renderTrailers(movie, index + 1);
//     });
// }


export async function getFetchTrailers() {
    try {
        const allTrailers = await fetchTrailers(); // henter alle trailers som finnes i API-et
        let randomTrailers = allTrailers.sort(() => Math.random() - 0.5).slice(0, 5);  // sorterer og velger ut 5 randome trailere, fra 0-5 index, ignorerer den siste AKA nr.5

        randomTrailers.forEach((movie, index) => { // for hver film... forEach = går gjennom hver index
            renderTrailers(movie, index + 1); // viser filmen på skjermen (renderTrailers-funksjonen) + 1 viser en ny film, en ny index (fungerer også om man går tilbake fordi vi bruker pop, unshift, shirt og push i den andre funksjonen (changeTrailer pi script.js))
        });
    } catch (error) {
        console.error("Noe er mektig galt her for å si det sånn...", error);
    }
}

getFetchTrailers();