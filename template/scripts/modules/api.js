// import oData from '../data/data.js';

// export async function fetchTopMovies() {
//     const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
//     let movies = await response.json();
//     oData.topMovieList = movies;
// }

export async function fetchMovies() {
    const response = await fetch ('http://www.omdbapi.com/?s=&apikey=9155565');
    let allMovies = await response.json();
    console.log(allMovies);
}
// HENTER ALLE FILMER, når man søker, broad search
