// import oData from '../data/data.js';
import { searchFunction } from "../utils/domUtils.js";
import { getFetchTrailers } from "../script.js";
import { renderTrailers } from "./caroussel.js";

// export async function fetchTopMovies() {
//     const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
//     let movies = await response.json();
//     oData.topMovieList = movies;
// }

export async function fetchMovies(userInput) {
    const response = await fetch (`http://www.omdbapi.com/?s=${userInput}&apikey=9155565`);
    let allMovies = await response.json();
    return allMovies;
}
// HENTER ALLE FILMER, når man søker, broad search, her er userInput = verdien på input feltet AKA det som skrives inn i det




export async function fetchTrailers() {
    const response = await fetch ('https://santosnr6.github.io/Data/favoritemovies.json');
    let allTrailers = await response.json();

    let randomTrailers = allTrailers.sort(() => Math.random() - 0.5).slice(0, 5); 
    console.log(randomTrailers);
    return randomTrailers;
}


// *** FLERE MODULER TIL SLUTT, MINST 2:
// 1) ANIMATION.JS (sparkle på musepeker), 2) FAVORITES.JS (håndterer alt som har med favoritisering/local storage av filmer), 
// 3) SORTMOVIES.JS (funksjon som sorterer filmer etter f.eks year eller title, vet ikke om jeg trenger det da....)
