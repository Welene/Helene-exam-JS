import { fetchMovies } from "../modules/api.js";
import { fetchSpecificMovieDetails } from '../modules/api.js';
import { createDetailedCard } from "../components/movieCard.js";


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
                    window.location.href = `search.html?userInput=${encodeURIComponent(userInput)}`; // *** BYTTER TIL MOVIE-INFO SIDE*** etter man har trykt på search
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


export function searchList() { // lager en ny funksjon som skal håndtere direkte input av user
    let searchInput = document.getElementById('searchInput'); // henter searchInput-feltet fra html
    searchInput.addEventListener('input', async () => { // lytter til et bruker INPUT på siden 
        let userInput = searchInput.value.toLowerCase(); // gjør at det ikke er forskjell på CAPS og små bokstaver
        let allMovies = await fetchMovies(userInput); // Henter filmer fra userInput
        console.log(allMovies); // skriver ut filmen man søker på i konsollen, ut fra userInput, vises i en array-liste/objekt
        let searchSuggestions = movies.filter(movie => movie.Title.toLowerCase().includes(userInput));
        // searchSuggestions (det som dukker opp i li-elementer) // filtrerer movies som inkluderer userInput (etter tittelen)

        let searchResults = document.getElementById('searchResults'); // henter searchResults fra html --> FINNES IKKE ENDA
        if (!searchResults) { // om det ikke finnes --> (som det ikke gjør enda) --> skaper den:
            searchResults = document.createElement('div');
            searchResults.classList.add('li-container'); 
            searchResults.id = 'searchResults'; // og legger til id: searchResults som vi prøvde/prøver å hente fra html, fordi nå finnes den faktisk
            searchInput.parentElement.insertBefore(searchResults, searchInput.nextSibling); 
            // **FORELDRENE (parentElement) SKAL TIL BUTIKKEN Å HANDLE (handling = .insertBefore), MEN KAN IKKE GJØRE DET FØR DE HAR FETCHET UNGENE (searchResults & searchInput.nextSibling)
            // FORDI UNGENE (AKA --> (searchResults, searchInput.nextSibling) KLARER SEG IKKE UTEN FORELDRENE --> DERMED FÅR IKKE FORELDRENE (butikken AKA .insertBefore) HANDLET UTEN UNGENE. 
            // På denne måten gir det mening at man leser denne raden i denne rekkefølgen: 1) searchInput.parentElement, 2) (searchResults, searchInput.nextSibling);, 3) .insertBefore
            // i stedet for å bare lese den direkte fra venstre til høyre (som man tydeligvis ikke gjør her). 
        } 

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
// drop-down?


export function displayMovieCard(card) {  // viser opp kort slik som de skal vises på index siden === top movies
    let movieContainer = document.getElementById('cardContainer') || document.getElementById('cardContainerSearch'); 

    if (movieContainer) {
        movieContainer.appendChild(card);
    } else {
        console.error("ingen artikkel for filmkort her");
    }
}


export async function displayDetailedCard () {
    if (window.location.pathname === '/template/movie.html') { // om vi er på movie info siden;
        let queryString = window.location.search; // i stedet for å bruke new URLSearchParams (til objekt, om man har flere parametrer) (..)
        // (...)jeg har bare ett "userInput" og da kan vi bare skrive sånn her
        let imdbID = queryString.split('=')[1]; // henter alt bare etter "=" i URL-en

        if (imdbID) { // om ID-et finnes
            let movieDetails = await fetchSpecificMovieDetails(imdbID); // vent på API-et som fetcher details om den filmen basert på ID-et du trykte på
            let detailedCard = await createDetailedCard(movieDetails); // henter movieDetails fra arrayen som har alle detaljer om filmen allerede i API-et
            let movieInfoSection = document.querySelector('.movie-information'); // movie-info seksjonen som allerede finnes i html
            
            if (movieInfoSection) {
                console.log('detailedCard.outerHTML:', detailedCard.outerHTML); // detailedCard ER TYDELIGVIS UNDEFINED, DETTE MÅ ALTSÅ VÆRE HOVEDPROBLEMET --> SKJERMEN ER TOM
                movieInfoSection.insertAdjacentHTML('beforeend', detailedCard.outerHTML);// SCREW APPENDCHILD!!!?
            }
        }
    }
}

