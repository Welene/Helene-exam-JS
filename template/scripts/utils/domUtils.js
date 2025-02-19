import { fetchMovies } from "../modules/api.js";
// import { createMovieCard } from "../components/movieCard.js"; trenger jeg den her, pga "card"?

// import { fetchTopMovies } from './modules/api.js';
// import { createMovieCard } from './components/movieCard.js';

export function searchFunction() {
    let searchBtn = document.getElementById('searchBtn');
    let searchInput = document.getElementById('searchInput');

    if (searchBtn && searchInput) { // sjekker om disse to eksistrerer FØR jeg legger til en listener, sånn at den ikke prøver å finne en Btn på neste side som gjør at man får error
        searchBtn.addEventListener('click', async (event) => {
            event.preventDefault(); // gjør at man rekker å se console.log error msg før alt refresher
            let userInput = searchInput.value; // lagrer verdien som brukeren skriver inn i input, det er verdien vi skal bruke (verdi = userInput)

            try {
                if (userInput) {
                    
                    // fetchMovies(userInput); // om det finnes et userInput (verdi), og trykker på searchBtn ('click') etter å ha skrevet inn en verdi, så dukker filmen/objektet opp i konsollen 
                    
                    let allMovies = await fetchMovies(userInput); // må hente allMovies inn til denne funksjonen, await = venter på fetchMovies, før man kan logge den ut vvv
                    console.log(allMovies); // Skriver ut objektet man søker på i konsollen
                    // window.location.href = `search.html?userInput=${encodeURIComponent(userInput)}`; // *** BYTTER TIL MOVIE-INFO SIDE*** etter man har trykt på search
                    // når jeg er på ny side så er det errors, kan ikke lese (null) --> fiks neste gang
                    return;
                } else {
                    throw new Error('Du må skrive inn en film'); // ellers får man feilmelding, men denne må man legge til en p-tagg for at den skal vises
                }
                
            } catch (error) {
                console.log(error.message); // her ser vi feilmeldingen ovenfor bare at den havner i konsollen, siden jeg ikke har laget et dynamisk p-tag i js enda for den ^
            }
        });
    }
}

// ****SE PÅ DENNE, DEN FUNKER IKKE HELT -- LAGER IKKE LI ELEMENT SOM ØNSKET****
export function searchList() { // lager en ny funksjon som skal håndtere direkte input av user
    let searchInput = document.getElementById('searchInput'); // henter searchInput-feltet fra html
    searchInput.addEventListener('input', async () => { // lytter til et bruker INPUT på siden 
        let userInput = searchInput.value.toLowerCase(); // gjør at det ikke er forskjell på CAPS og små bokstaver


        let allMovies = await fetchMovies(userInput); // Henter filmer fra userInput
        console.log(allMovies); // skriver ut filmen man søker på i konsollen, ut fra userInput, vises i en array-liste/objekt

        // console.log(movies);
        let searchSuggestions = movies.filter(movie => movie.Title.toLowerCase().includes(userInput));
        // searchSuggestions (det som dukker opp i li-elementer) // filtrerer movies som inkluderer userInput (etter tittelen)

        let searchResults = document.getElementById('searchResults'); // henter searchResults fra html --> FINNES IKKE ENDA
        if (!searchResults) { // om det ikke finnes --> (som det ikke gjør enda) --> skaper den:
            searchResults = document.createElement('div');
            searchResults.classList.add('li-container'); // en ul-liste!
            searchResults.id = 'searchResults'; // og legger til id: searchResults som vi prøvde/prøver å hente fra html, fordi nå finnes den faktisk
            searchInput.parentElement.insertBefore(searchResults, searchInput.nextSibling); //setter searchResult (ul) rett etter input-feltet i html 
        } // denne ul-en har vi som en boks som kan lagre li-elementene med filmer inni der

        searchResults.textContent = '';  // tømmer listen om det finnes noe der fra før av...

        searchSuggestions.slice(0, 10).forEach(movie => { // viser bare 10 filmer med hjelp av slice
            let suggestionText = document.createElement('li'); // lager et listeelement (suggestionText) for hver film den itererer igjennom, denne variabelen inkluderer userInput, se rad 44 (..) 
            // (..) --> sånn at det man søker etter dukker opp, om det finnes relevante søk til det.
            suggestionText.textContent = movie.Title; // tekstinnholdet li-listen skal være tittelen på filmen (Title)
            searchResults.appendChild(suggestionText); // lager et nytt barn (li-element) og legger det inni forelderen i html (searchResults AKA <ul>), se rad 49.
            
        });
        console.log(searchSuggestions); // logger ut forslagene som er i hvert li-element under input-feltet
    });
}


// *** Å GJØRE -- NEXT ***
// lage en funksjon som legger til li-elementer når man søker, max 10 filmer skal vises samtidig i en liste:
// denne funksjonen skal vel anropes i searchFunction, regner jeg med.


// export function displayMovieCard (card) { 
//     let cardContainer = document.getElementById('card-container'); 
//     cardContainer.appendChild(card); 
// }



export function displayMovieCard(card) { // sender inn card som parameter til denne funksjonen som trenger den
    let movieContainer = document.getElementById('cardContainer'); // henter movie-container AKA seksjonen som artikkelen ("card") ligger inni

    movieContainer.appendChild(card); // legger vår nye artikkel som vi lagde i "createMovieCard" inni HTML seksjonen "movie-container"
    // ****SKRIV EN DISPLAY MOVIE CARD FUNKSJON HER SOM VISER KORTENE, DENNE ER ALLEREDE IMPORTERT I SCRIPT.JS FILEN (kommentert ut)**
}
