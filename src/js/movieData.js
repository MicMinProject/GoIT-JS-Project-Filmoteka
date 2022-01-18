const watchedBtn = document.querySelector('.watched');
const queueBtn = document.querySelector('.queue');
import { fetchMovieData } from './fetchMovie';

let movieData = {
  photo: '',
  title: '',
  votesAvarage: '',
  votes: '',
  popularity: '',
  orginalTitle: '',
  genre: '',
  about: '',
  id: '',
};

document.addEventListener('click', target => {
  try {
    let movieId = target.path[2].getAttribute('data-id');
    if (movieId !== null) {
      renderMovie(movieId);
    }
  } catch (e) {}
});

function renderMovie(movieId) {
  clearModal();
  fetchMovieData(movieId).then(res => {
    let data = res;
    movieData.photo = data.poster_path;
    movieData.title = data.title;
    movieData.votesAvarage = data.vote_average;
    movieData.votes = data.vote_count;
    movieData.popularity = data.popularity;
    movieData.orginalTitle = data.original_title;
    const genresArray = data.genres;
    let genres = genresArray.map(genresArray => genresArray.name);
    movieData.genre = genres.toString();
    movieData.about = data.overview;
    movieData.id = data.id;

    document
      .querySelector('.movie')
      .insertAdjacentHTML(
        'afterbegin',
        `<img class="modal__movie-photo" src="https://image.tmdb.org/t/p/original${movieData.photo}" alt="photo" />`,
      );
    document
      .querySelector('.modal__movie-title')
      .insertAdjacentHTML('afterbegin', `${movieData.title}`);
    document.querySelector('.vote').insertAdjacentHTML('afterbegin', `${movieData.votesAvarage}`);
    document.querySelector('.votes').insertAdjacentHTML('afterbegin', `${movieData.votes}`);
    document
      .querySelector('.popularity')
      .insertAdjacentHTML('afterbegin', `${movieData.popularity}`);
    document
      .querySelector('.orginal-title')
      .insertAdjacentHTML('afterbegin', `${movieData.orginalTitle}`);
    document.querySelector('.genre').insertAdjacentHTML('afterbegin', `${movieData.genre}`);
    document.querySelector('.modal__about').insertAdjacentHTML('afterbegin', `${movieData.about}`);
  });
}

function clearModal() {
  document.querySelector('.movie').innerHTML = '';
  document.querySelector('.modal__movie-title').innerHTML = '';
  document.querySelector('.vote').innerHTML = '';
  document.querySelector('.votes').innerHTML = '';
  document.querySelector('.popularity').innerHTML = '';
  document.querySelector('.orginal-title').innerHTML = '';
  document.querySelector('.genre').innerHTML = '';
  document.querySelector('.modal__about').innerHTML = '';
}

function addToWatched() {
  let watchedMovie;
  watchedMovie = JSON.parse(localStorage.getItem('watchedMovie'));
  if (watchedMovie == null) watchedMovie = [];

  let movieTitleForConsole = { movieTitle: movieData.title, ID: movieData.id };
  let newMovie = { movieTitle: movieData.title, ID: movieData.id };

  for (let movie of watchedMovie) {
    if (movie.ID === newMovie.ID) {
      newMovie = '';
      break;
    }
  }

  if (newMovie === '') {
    console.log(`Film "${movieTitleForConsole.movieTitle}" jest już w bazie`);
  } else {
    watchedMovie.push(newMovie);
    localStorage.setItem('watchedMovie', JSON.stringify(watchedMovie));
    console.log(`Dodałeś film "${movieTitleForConsole.movieTitle}" do obejrzanych`);
  }
}
  

  
function addToQueue() {
  let queue;

  queue = JSON.parse(localStorage.getItem('queue'));
  if (queue == null) queue = [];

  let movieTitleForConsole = { movieTitle: movieData.title, ID: movieData.id };
  let newMovie = { movieTitle: movieData.title, ID: movieData.id };

  for (let movie of queue) {
    if (movie.ID === newMovie.ID) {
      newMovie = '';
      break;
    }
  }

  if (newMovie === '') {
    console.log(`Film "${movieTitleForConsole.movieTitle}" jest już w kolejce`);
  } else {
    queue.push(newMovie);
    localStorage.setItem('queue', JSON.stringify(queue));
    console.log(`Dodałeś film "${movieTitleForConsole.movieTitle}" do kolejki`);
  }
}

watchedBtn.addEventListener('click', addToWatched);
queueBtn.addEventListener('click', addToQueue);