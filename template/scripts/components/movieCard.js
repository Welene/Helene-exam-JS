import { displayMovieCard } from '../utils/domUtils.js';
import { displayDetailedCard } from '../utils/domUtils.js';
import { fetchSpecificMovieDetails } from '../modules/api.js';


window.onload = async function() {
    const imdbID = new URLSearchParams(window.location.search).get('i');

    if (imdbID) {
        // Hent movieDetails fra sessionStorage
        const movieDetails = JSON.parse(sessionStorage.getItem('movieDetails'));

        if (movieDetails) {
            let detailedCard = createDetailedCard(movieDetails);
            const movieInfoSection = document.querySelector('.movie-information');
            if (movieInfoSection) {
                movieInfoSection.insertAdjacentHTML('beforeend', detailedCard.outerHTML);

            }
        }
    }
};


    export function createMovieCard(movie) { 
        let card = document.createElement('article');
        card.classList.add('card-container__movie'); 
        card.innerHTML = `
            <img src='${movie.Poster}' alt='${movie.Title}' class='movie-img'> 
            <p class='movie-title'>${movie.Title}</p>
        `;
        card.addEventListener('click', async () => {
            const movieDetails = await fetchSpecificMovieDetails(movie.imdbID);
            sessionStorage.setItem('movieDetails', JSON.stringify(movieDetails));
            window.location.href = `/template/movie.html?i=${movie.imdbID}`;
        });

        displayMovieCard(card); 
        return card;
    }


export async function createDetailedCard (movie) {
    let detailedCard = document.createElement('article');
    detailedCard.classList.add('movie-information__card'); // artikkelen har klassen "card-container__movie", utenfor har vi en section som heter "card-container" i HTML
    detailedCard.innerHTML = // innholdet i artikkelen (card) er; // textContent fungerer ikke, gjør elementer til strenger -- innerHTML gjør at det tolkes som elementer og vises på siden
        `<img src='${movie.Poster}' alt='${movie.Title}' class='detailed-img'>
        <h2 class="detailed-title">${movie.Title}</h2>
        <p class='detailed-info'>${movie.Title}</p>`;
    console.log('detailedCard AKA the article with all movie info content:', detailedCard); // LOGGER UT ARTIKKELEN, DER INFO SKAL LIGGE - MEN LIKEVEL ER DEN UNDEFINED I domUtils??? // logger x2 for some reason
    return detailedCard;  
} 


export function toggleFavorite() {
// HER LEGGER JEG TIL ET TOMT OG ET FYLT STJERNEIKON SOM JEG KAN TOGGLE AV OG PÅ I BILDET,
// DE HAVNER INN OG UT AV FAVORITES.HTML/SIDEN NÅR MAN TOGGLER. 

// STYLING/PLASSERING AV STJERNE-IKONET PÅ BILDET GJØR JEG I CSS SENERE.

}




