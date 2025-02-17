import { fetchMovies } from "../modules/api.js";

export function searchFunction() {
    let searchBtn = document.getElementById('searchBtn');
    let searchInput = document.getElementById('searchInput');

    searchBtn.addEventListener('click', (event) => {
        event.preventDefault(); // gjør at man rekker å se console.log error msg før alt refresher
        let userInput = searchInput.value; // lagrer verdien som brukeren skriver inn i input, det er verdien vi skal bruke (verdi = userInput)
        try {
            if (userInput) {
                fetchMovies(userInput); // om det finnes et userInput (verdi), og trykker på searchBtn ('click') etter å ha skrevet inn en verdi, så dukker filmen/objektet opp i konsollen 
                window.location.href = `search.html?userInput=${encodeURIComponent(userInput)}`; // *** BYTTER TIL MOVIE-INFO SIDE*** etter man har trykt på search
                // når jeg er på ny side så er det errors, kan ikke lese (null) --> fiks neste gang
            } else {
                throw new Error('Du har ikke skrevet inn en film'); // ellers får man feilmelding, men denne må man legge til en p-tagg for at den skal vises
            }
        } catch (error) {
            console.log(error.message); // her ser vi feilmeldingen ovenfor bare at den havner i konsollen, siden jeg ikke har laget et dynamisk p-tag i js enda for den ^
        }
    });
}


// *** Å GJØRE -- NEXT ***
// lage en funksjon som legger til li-elementer når man søker, max 10 filmer skal vises samtidig i en liste:
// denne funksjonen skal vel anropes i searchFunction, regner jeg med.


// export function displayMovieCard (card) { // sender inn card som parameter til denne funksjonen som trenger den
//     let cardContainer = document.getElementById('card-container'); // henter movie-container AKA seksjonen som artikkelen ("card") ligger inni
//     cardContainer.appendChild(card); // legger vår nye artikkel som vi lagde i "createMovieCard" inni HTML seksjonen "movie-container"
// }
