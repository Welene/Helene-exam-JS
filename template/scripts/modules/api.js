import { oData } from '../data/data.js';


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

export async function fetchSpecificMovieDetails(imdbID) {
    try {
        let response = await fetch(`http://www.omdbapi.com/?apikey=9155565&plot=full&i=${imdbID}`);
        let data = await response.json();
        console.log('imdbID movie API info:', data);  
        return data;
    } catch (error) {
        console.error('Noe er feil...', error);
        return null;
    }
}

// ALLE API ANROP SKAL VÆRE AV TRY CATCH BLOKK!!!
export async function fetchTrailers() {
    const response = await fetch ('https://santosnr6.github.io/Data/favoritemovies.json');
    let allTrailers = await response.json();
    let randomTrailers = allTrailers.sort(() => Math.random() - 0.5).slice(0, 5); 
    return randomTrailers;
}














// ANIMATION.JS (sparkle på musepeker), 2) FAVORITES.JS (håndterer alt som har med favoritisering/local storage av filmer), 
