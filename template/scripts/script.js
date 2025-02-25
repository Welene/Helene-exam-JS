// import { displayMovieCard } from '../utils/domUtils.js';
import { searchFunction } from './utils/domUtils.js';
import { fetchTrailers } from './modules/api.js';
import { renderTrailers } from './modules/caroussel.js';

import { fetchTopMovies } from './modules/api.js';
import { fetchMovies } from './modules/api.js';

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

async function displayTopMovies() {
    if (window.location.pathname === '/' || window.location.pathname === '/template/index.html') {
        await fetchTopMovies();  // Henter filmer fra API-et og lagrer dem i oData.topMovieList
        const movies = oData.topMovieList;  // Få tilgang til listen med filmer
        // For hver film, lager et kort og viser det
        movies.slice(0, 15).forEach(movie => {
        const card = createMovieCard(movie);  
        displayMovieCard(card);  
        });
    }  
}

displayTopMovies();


export async function displaySearchMovies() {
    if (window.location.pathname === '/template/search.html') { // sjekker om vi er på SEARCH siden i stedet for;

        let queryString = window.location.search; // i stedet for å bruke new URLSearchParams (til objekt, om man har flere parametrer) (..)
        // (...)jeg har bare ett "userInput" og da kan vi bare skrive sånn her
        const userInput = queryString.split('=')[1]; // vi kutter URL-en og henter bare teksten etter = [1] alt etter =... 
        // [0] f.eks hadde hentet alt FØR = tegnet. Vi vil ha alt etter =, AKA [1].

        if (userInput) { // sjekker om vi ahr et userInput, om vi har det så;
            let allMovies = await fetchMovies(userInput); // venter vi på svar fra fetchMovies(userInput), AKA det du har søkt etter
            console.log('Filmer hentet for søket:', allMovies);

            if (allMovies.Response === "True" && allMovies.Search) { // om søket er godkjent og får en respons 
                // og .Search = om det finnes filmer som er relatert til userInput
                allMovies.Search.slice(0, 9).forEach(movie => { // da går den gjennom alle filmer i arrayen med alt som er relevant til userInput
                    const card = createMovieCard(movie); // lager et movieCard sånn at disse relevante filmene kan vises på skjermen
                    displayMovieCard(card); // og vi viser dem faktisk ved å anrope displayMovieCard funksjonen.
                });
            } else {
                console.log('Disse filmene ser du på skjermen', allMovies); // logger ut alle filmene som dukker opp relatert til userInput
            }
        }
    }
}

displaySearchMovies(); // husker å anrope displaySearchMovies funksjonen som jeg akkurat skrev ovenfor, ellers funker det jo ikke...


// DELE OPP TING SENERE SÅNN AT SCRIPT.JS BARE ANROPER OG IKKE LAGER SELVE FUNKSJONENE

