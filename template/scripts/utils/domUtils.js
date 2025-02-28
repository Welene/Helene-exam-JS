import { fetchMovies } from "../modules/api.js";
import { fetchSpecificMovieDetails } from '../modules/api.js';
import { createDetailedCard } from "../components/movieCard.js";
import { createMovieCard } from "../components/movieCard.js";
import { favoriteMoviesInfo } from "../modules/api.js";

export async function searchFunction() {
    let searchBtn = document.getElementById('searchBtn');
    let searchInput = document.getElementById('searchInput');

    if (searchBtn && searchInput) { 
        searchBtn.addEventListener('click', async (event) => {
            event.preventDefault(); 
            let userInput = searchInput.value; 

            try {
                if (userInput) {
                    let allMovies = await fetchMovies(userInput); 
                    console.log(allMovies); 
                    window.location.href = `search.html?userInput=${encodeURIComponent(userInput)}`; 
                    
                    return;
                } else {
                    throw new Error('Du må skrive inn en film'); 
                }
            } catch (error) {
                console.log(error.message); 
            }
        });
    }
}

export async function displayMovieCard(card) {  
    let movieContainer = document.getElementById('cardContainer') || document.getElementById('cardContainerSearch') || document.getElementById('cardContainerFav'); 

    if (movieContainer) {
        movieContainer.appendChild(card);
    } else {
        console.error("ingen artikkel for filmkort her");
    }
}


export async function displayDetailedCard () {
    if (window.location.pathname === '/template/movie.html') { 
        let queryString = window.location.search; 
        let imdbID = queryString.split('=')[1]; 

        if (imdbID) { 
            let movieDetails = await fetchSpecificMovieDetails(imdbID); 
            let detailedCard = await createDetailedCard(movieDetails); 
            let movieInfoSection = document.querySelector('.movie-information'); 
            
            if (movieInfoSection) {
                movieInfoSection.insertAdjacentHTML('beforeend', detailedCard.outerHTML);// SCREW APPENDCHILD!!!?
            }
        }
    }
}


let favoriteMovies = [];

export async function favoriteToggle(movieId) {
    let images = document.querySelectorAll('.card-container__movie');

    images.forEach((movieImg) => { 
        if (!movieImg.querySelector('.favorite-btn')) { 
            let favoriteBtn = document.createElement('button');
            favoriteBtn.classList.add('favorite-btn');
            // favoriteBtn.innerHTML = '<img src="https://img.icons8.com/?size=100&id=87&format=png&color=000000" alt="Tom stjerne">'; // som er tom til å begynne med / ikke favoritt-markert
            favoriteBtn.textContent = '🖤';
            let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || []; 
            if (favoriteMovies.includes(movieId)) {
                favoriteBtn.textContent = '❤️'; 
            }

            favoriteBtn.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation(); 

                if (favoriteBtn.textContent === '🖤') {
                    // if (favoriteBtn.innerHTML.includes('Tom stjerne')) { // trengs bare med innerHTML animert ikon...
                    // favoriteBtn.innerHTML = '<img src="https://img.icons8.com/?size=100&id=lFyaayFdhpED&format=png&color=000000" alt="Fylt stjerne">'; // om man klikker så blir den gul
                    favoriteBtn.textContent = '❤️'; 
                } else {
                    // favoriteBtn.innerHTML = '<img src="https://img.icons8.com/?size=100&id=87&format=png&color=000000" alt="Tom stjerne">';  // Hvis stjernen er fylt, endre den tilbake til tom
                    favoriteBtn.textContent = '🖤'; 
                }
                let index = favoriteMovies.indexOf(movieId);
                if (index === -1) { 
                    favoriteMovies.push(movieId); 
                } else {
                    favoriteMovies.splice(index, 1); 
                }

                localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
            });
            console.log('Bilder funnet på siden:', images.length); 
            movieImg.appendChild(favoriteBtn); 
        }
    });
}



export async function displayFavoriteMovies() {
    if (window.location.pathname !== "/template/favorites.html") {
        return; 
    }
    let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    for (let imdbID of favoriteMovies) {
        let movieDetails = await favoriteMoviesInfo(imdbID);
        if (movieDetails) {
            let movieCard = createMovieCard(movieDetails);
            displayMovieCard(movieCard);
        }
    }
}
