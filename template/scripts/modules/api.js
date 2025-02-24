import { oData } from '../data/data.js';
import { searchFunction } from "../utils/domUtils.js";
import { getFetchTrailers } from "../script.js";
import { renderTrailers } from "./caroussel.js";

export async function fetchTopMovies() {
    const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
    let movies = await response.json();
    oData.topMovieList = movies;
}

export async function fetchMovies(userInput) {
    const response = await fetch (`http://www.omdbapi.com/?s=${userInput}&type=movie&apikey=9155565`); // legger til type film, fordi den hentet spill også
    let allMovies = await response.json();
    return allMovies;
}

export async function fetchSpesificMovieDetails(inputImdbID){
    const response = await fetch (`http://www.omdbapi.com/?i=${inputImdbID}&apikey=9155565`);
    let spesificMovie = await response.json();
    return spesificMovie;
}
// HENTER ALLE FILMER, når man søker, broad search, her er userInput = verdien på input feltet AKA det som skrives inn i det

// ALLE API ANROP SKAL VÆRE AV TRY CATCH BLOKK!!!

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
