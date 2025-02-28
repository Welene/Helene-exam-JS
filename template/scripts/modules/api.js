import { oData } from '../data/data.js';


export async function fetchTopMovies() {
    try {
        let response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');

        if (!response.ok) {
            throw new Error(`Error fetching top movies: ${response.status}`);
        }
        
        const movies = await response.json();
        oData.topMovieList = movies;
    } catch (error) {
        console.error('I cannot fetch your top movies :(', error.message);
        return null; 
    }
}

export async function fetchMovies(userInput) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${userInput}&type=movie&apikey=9155565`);
        
        if (!response.ok) {
            throw new Error(`Error fetching movies: ${response.status}`);
        }
        
        const allMovies = await response.json();
        return allMovies;
    } catch (error) {
        console.error('I cannot fetch ANY movies AT ALL big oof :(', error.message);
        return null; 
    }
}

export async function fetchSpecificMovieDetails(imdbID) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=9155565&plot=full&i=${imdbID}`);
        
        if (!response.ok) {
            throw new Error(`Error fetching movie details: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('I cannot give you details about this classified movie... kidding, something is obviously wrong', error.message);
        return null;
    }
}

export async function favoriteMoviesInfo(imdbID) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=9155565&plot=full&i=${imdbID}`);
        
        if (!response.ok) {
            throw new Error(`Error fetching favorite movie info: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Seems you do not have any favorite movies #sadface #joke', error.message);
        return null;
    }
}

export async function fetchTrailers() {
    try {
        const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
        
        if (!response.ok) {
            throw new Error(`Error fetching trailers: ${response.status}`);
        }
        
        const allTrailers = await response.json();
        const randomTrailers = allTrailers.sort(() => Math.random() - 0.5).slice(0, 5);
        return randomTrailers;
    } catch (error) {
        console.error('The API ran out of trailers, must be the problem, surely, NOTHING could be wrong in my code, EVER, I swear', error.message);
        return null;
    }
}



// ANIMATION.JS (sparkle på musepeker), 2) FAVORITES.JS (håndterer alt som har med favoritisering/local storage av filmer), 
