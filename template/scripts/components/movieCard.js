import { displayMovieCard } from '../utils/domUtils.js';
import { displayDetailedCard } from '../utils/domUtils.js';
import { fetchSpecificMovieDetails } from '../modules/api.js';
import { favoriteToggle } from '../utils/domUtils.js';
import { displayFavoriteMovies } from '../utils/domUtils.js';



export function createMovieCard(movie) { 
    let card = document.createElement('article');
    card.classList.add('card-container__movie'); 
    card.innerHTML = `
        <img src='${movie.Poster}' alt='${movie.Title}' class='movie-img'> 
        <p class='movie-title'>${movie.Title}</p>`;
    card.addEventListener('click', async () => {
        const movieDetails = await fetchSpecificMovieDetails(movie.imdbID);
        localStorage.setItem('movieDetails', JSON.stringify(movieDetails));
        window.location.href = `/template/movie.html?i=${movie.imdbID}`; 
    });
    
    displayMovieCard(card); 
    favoriteToggle(movie.imdbID);
    return card;
}


export async function createDetailedCard (movie) {
    let detailedCard = document.createElement('article');
    detailedCard.classList.add('movie-information__card'); 
    detailedCard.innerHTML = 
        `<img src='${movie.Poster}' alt='${movie.Title}' class='detailed-img'>
        <h2 class="detailed-title">${movie.Title}</h2>
        <p class='detailed-info'>${movie.Plot}</p>`;
    return detailedCard;  
} 


