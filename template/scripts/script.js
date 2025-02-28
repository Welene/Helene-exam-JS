import { searchFunction } from './utils/domUtils.js';
import { fetchTrailers } from './modules/api.js';
import { renderTrailers } from './modules/caroussel.js';
import { fetchTopMovies } from './modules/api.js';
import { fetchMovies } from './modules/api.js';
import { createMovieCard } from './components/movieCard.js';
import { displayMovieCard } from './utils/domUtils.js';
import { oData } from './data/data.js';
import { displayDetailedCard } from './utils/domUtils.js';
import { displayFavoriteMovies } from './utils/domUtils.js';


searchFunction(); 


export async function getFetchTrailers() {
    try {
        if (window.location.pathname === '/template/' || window.location.pathname === '/template/index.html') {
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
    if (window.location.pathname === '/template/' || window.location.pathname === '/template/index.html') {
        await fetchTopMovies(); 
        const movies = oData.topMovieList;  
        movies.slice(0, 15).forEach(movie => {
        const card = createMovieCard(movie);  
        displayMovieCard(card);  
        });
    }  
}

displayTopMovies();


export async function displaySearchMovies() {
    if (window.location.pathname === '/template/search.html') { 
        let queryString = window.location.search; 
        const userInput = queryString.split('=')[1];

        if (userInput) { 
            let allMovies = await fetchMovies(userInput); 

            if (allMovies.Response === "True" && allMovies.Search) {
                allMovies.Search.slice(0, 9).forEach(movie => { 
                    const card = createMovieCard(movie); 
                    displayMovieCard(card); 
                });
            } else {
                console.log('Disse filmene ser du på skjermen', allMovies);
            }
        }
    }
}

if (window.location.pathname === "/template/favorites.html" && !window.hasLoadedFavorites) {
    displayFavoriteMovies();
}

displaySearchMovies();

displayDetailedCard();

console.log(localStorage.getItem('favoriteMovies'));
