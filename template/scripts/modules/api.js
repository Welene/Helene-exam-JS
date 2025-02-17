// import oData from '../data/data.js';
import { searchFunction } from "../utils/domUtils.js";

// export async function fetchTopMovies() {
//     const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
//     let movies = await response.json();
//     oData.topMovieList = movies;
// }

export async function fetchMovies(userInput) {
    const response = await fetch (`http://www.omdbapi.com/?s=${userInput}&apikey=9155565`);
    let allMovies = await response.json();
    console.log(allMovies);
    return allMovies;
}
// HENTER ALLE FILMER, når man søker, broad search, her er userInput = verdien på input feltet AKA det som skrives inn i det
