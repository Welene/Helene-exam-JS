import { displayMovieCard } from '../utils/domUtils.js';
// FLYTT DENNE TIL ANDRE MAPPER DER J}EG TRENGER Å IMPORTERE "createMovieCard" FUNKSJONEN, altså imporere den i andre mapper
// import { createMovieCard } from '../utils/domUtils.js';


export function createMovieCard(movie) { // til info-siden om filmer/ index siden med mange små filer, ikke trailere
    let card = document.createElement('article');
    card.classList.add('card-container__movie'); // artikkelen har klassen "card-container__movie", utenfor har vi en section som heter "card-container" i HTML
    card.innerHTML = // innholdet i artikkelen (card) er; // textContent fungerer ikke, gjør elementer til strenger -- innerHTML gjør at det tolkes som elementer og vises på siden
        `<img src='${movie.Poster}' alt='${movie.Title}' class='movie-img'> 
        <p class='movie-title'>${movie.Title}</p>`;

    displayMovieCard(card); // når man sender card inn som parameter i en annen funksjon for å få tilgang til den der også, så må man huske å anrope den inni funksjonen her også
    return card; // fikser mange problemer, må visst returnere card sånn at alle de andre funksjonene får tilgang til den, selv om jeg har eksportert hele funksjonen men ok
}

export function toggleFavorite() {
// HER LEGGER JEG TIL ET TOMT OG ET FYLT STJERNEIKON SOM JEG KAN TOGGLE AV OG PÅ I BILDET,
// DE HAVNER INN OG UT AV FAVORITES.HTML/SIDEN NÅR MAN TOGGLER. 

// STYLING/PLASSERING AV STJERNE-IKONET PÅ BILDET GJØR JEG I CSS SENERE.

}



