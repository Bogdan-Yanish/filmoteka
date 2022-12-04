import {
  getPopularMovies,
  searchMovies,
  getMovieById,
  getGenresList,
  getTrailerById,
} from './API/API';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';
const FAKE_POSTER =
  'https://freesvg.org/img/cyberscooty-movie-video-tape-remix.png';
const LOCALSTORAGE_KEY = 'genres';
const galleryRef = document.querySelector('.films-list');

let searchQuery = 'dracula';
page = 1;

getGenresList().then(array => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(array));
});
const genres = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

//--------------------RENDER GALLERY BY SEARCH-----------------

// searchMovies(searchQuery, page).then(data => {
//   galleryMarkup(createGalery(data));
// });

//--------------------RENDER POPULAR MOVIES-----------------

getPopularMovies(page).then(data => {
  galleryMarkup(createGalery(data));
});

function createGalery(data) {
  return data.data.results
    .map(
      ({
        poster_path,
        original_title,
        release_date,
        genre_ids,
        vote_average,
        id,
      }) => {
        genresArray = [];
        let filmGenres = '';
        genres.map(genre => {
          if (genre_ids.includes(genre['id'])) {
            return genresArray.push(genre['name']);
          }
        });
        filmGenres = genresArray.join(', ');

        if (!genre_ids || genre_ids.length === 0) {
          filmGenres = 'genre unknown';
        }

        if (!poster_path) {
          poster_path = FAKE_POSTER;
        } else {
          poster_path = BASE_POSTER_URL + poster_path;
        }

        if (!original_title) {
          original_title = 'no name';
        }

        if (!release_date) {
          release_date = '';
        }

        if (!vote_average) {
          vote_average = 'N/A';
        }

        return `<li class="films-list__item">
  <a href="" class="films-list__link">
    <img
      src="${poster_path}"
      alt="${original_title}"
      class="films-list__img"
    />
    <h2 class="films-list__title">${original_title}</h2>
    <span class="films-list__text-ganres">${filmGenres}</span>
    <span class="films-list__span">|</span>
    <span class="films-list__text-date">${release_date.split('-')[0]}</span>
  </a>
</li>`;
      }
    )
    .join('');
}

function galleryMarkup(string) {
  galleryRef.insertAdjacentHTML('beforeend', string);
}

console.log(getPopularMovies(page));

console.log(getMovieById(67892));

// console.log(getTrailerById(436270));
