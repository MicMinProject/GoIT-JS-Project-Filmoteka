import { spinner, target } from './spinner.js';

const axios = require('axios').default;

const hidingFirst = document.querySelector('.pagination_hider-first');
const hidingLast = document.querySelector('.pagination_hider-last');
const left = document.querySelector('.pagination_left');
const first = document.querySelector('.pagination_first-page');
const pageMinusTwo = document.querySelector('.pagination_less-two');
const pageMinusOne = document.querySelector('.pagination_less-one');
const current = document.querySelector('.pagination_current-page');
const pagePlusOne = document.querySelector('.pagination_more-one');
const pagePlusTwo = document.querySelector('.pagination_more-two');
const last = document.querySelector('.pagination_last-page');
const right = document.querySelector('.pagination_right');
const gallery = document.querySelector('.gallery');
const text = document.querySelector('.header__input');
let IDS;

pageMinusTwo.value = -2;
pageMinusOne.value = -1;
pagePlusOne.value = 1;
pagePlusTwo.value = 2;
right.value = 1;
left.value = -1;

function building(resp) {
  const markup = resp
    .map((variable) => {
      let genreName = '';
      let movieName = '';
      let movieDate = '';

      IDS.data.genres.forEach((element) => {
        const currentID = Object.values(element)[0];
        if (variable.genre_ids.includes(currentID)) {
          genreName += `${Object.values(element)[1]}, `;
        }
      });
      genreName = genreName.slice(0, genreName.length - 2);
      if ('title' in variable) {
        movieName = variable.title;
        movieDate = variable.release_date.slice(0, 4);
      } else if ('name' in variable) {
        movieName = variable.name;
        movieDate = variable.first_air_date.slice(0, 4);
      }
      return `<div class="movie-card" data-id="${variable.id}" >
  <div class="movie-picture" data-modal-open>
    <img class="movie-img" src="https://image.tmdb.org/t/p/w500/${variable.poster_path}" alt="${movieName} poster">
  </div>
  <div class="movie-description">
    <div class="movie-title">
      ${movieName}
    </div>
    <div class="movie-genre">
      ${genreName} | ${movieDate}
    </div>
  </div>
</div> `;
    })
    .join('');
  gallery.innerHTML += markup;
}

async function fetchImages(page) {
  spinner.spin(target);
  try {
    IDS = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=130c7a7ecd86dbb286ae26c3cdcca88c&language=en-US',
    );
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=130c7a7ecd86dbb286ae26c3cdcca88c&page=${page}`,
    );
    building(res.data.results);
    spinner.stop();

    return res.data;
  } catch (error) {
    spinner.stop();
    return console.log('fail');
  }
}

async function fetchMovies(name, page) {
  spinner.spin(target);
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=130c7a7ecd86dbb286ae26c3cdcca88c&query=${name}&page=${page}`,
    );
    if (res.data.results.length === 0) {
      return (noResults.style.display = 'flex');
    }
    gallery.innerHTML = '';
    building(res.data.results);
    spinner.stop();
    return res.data;
  } catch (error) {
    spinner.stop();
    return (noResults.style.display = 'flex');
  }
}

const galleryRefresh = (e) => {
  gallery.innerHTML = '';
};

const pagesCorection = (e) => {
  pageMinusTwo.textContent = Number(current.textContent) - 2;
  pageMinusOne.textContent = Number(current.textContent) - 1;
  pagePlusOne.textContent = Number(current.textContent) + 1;
  pagePlusTwo.textContent = Number(current.textContent) + 2;
};

const conditionalHide = (e) => {
  pagesCorection();
  if (current.textContent === '1') {
    left.disabled = true;
    first.style.visibility = 'hidden';
    first.disabled = true;
    hidingFirst.style.visibility = 'hidden';
    hidingFirst.disabled = true;
    pageMinusOne.style.visibility = 'hidden';
    pageMinusOne.disabled = true;
    pageMinusTwo.style.visibility = 'hidden';
    pageMinusTwo.disabled = true;
  } else if (current.textContent === '2') {
    left.disabled = false;
    first.style.visibility = 'hidden';
    first.disabled = true;
    hidingFirst.style.visibility = 'hidden';
    hidingFirst.disabled = true;
    pageMinusOne.style.visibility = 'visible';
    pageMinusOne.disabled = false;
    pageMinusTwo.style.visibility = 'hidden';
    pageMinusTwo.disabled = true;
  } else if (current.textContent === '3') {
    left.disabled = false;
    first.style.visibility = 'hidden';
    first.disabled = true;
    hidingFirst.style.visibility = 'hidden';
    hidingFirst.disabled = true;
    pageMinusOne.style.visibility = 'visible';
    pageMinusOne.disabled = false;
    pageMinusTwo.style.visibility = 'visible';
    pageMinusTwo.disabled = false;
  } else {
    left.disabled = false;
    first.style.visibility = 'visible';
    first.disabled = false;
    hidingFirst.style.visibility = 'visible';
    hidingFirst.disabled = false;
    pageMinusOne.style.visibility = 'visible';
    pageMinusOne.disabled = false;
    pageMinusTwo.style.visibility = 'visible';
    pageMinusTwo.disabled = false;
  }

  if (Number(current.textContent) === Number(last.textContent)) {
    right.disabled = true;
    last.style.visibility = 'hidden';
    last.disabled = true;
    hidingLast.style.visibility = 'hidden';
    hidingLast.disabled = true;
    pagePlusOne.style.visibility = 'hidden';
    pagePlusOne.disabled = true;
    pagePlusTwo.style.visibility = 'hidden';
    pagePlusTwo.disabled = true;
  } else if (Number(current.textContent) === Number(last.textContent) - 1) {
    right.disabled = false;
    last.style.visibility = 'hidden';
    last.disabled = true;
    hidingLast.style.visibility = 'hidden';
    hidingLast.disabled = true;
    pagePlusOne.style.visibility = 'visible';
    pagePlusOne.disabled = false;
    pagePlusTwo.style.visibility = 'hidden';
    pagePlusTwo.disabled = true;
  } else if (Number(current.textContent) === Number(last.textContent) - 2) {
    right.disabled = false;
    last.style.visibility = 'hidden';
    last.disabled = true;
    hidingLast.style.visibility = 'hidden';
    hidingLast.disabled = true;
    pagePlusOne.style.visibility = 'visible';
    pagePlusOne.disabled = false;
    pagePlusTwo.style.visibility = 'visible';
    pagePlusTwo.disabled = false;
  } else {
    right.disabled = false;
    last.style.visibility = 'visible';
    last.disabled = false;
    hidingLast.style.visibility = 'visible';
    hidingLast.disabled = false;
    pagePlusOne.style.visibility = 'visible';
    pagePlusOne.disabled = false;
    pagePlusTwo.style.visibility = 'visible';
    pagePlusTwo.disabled = false;
  }
};

conditionalHide();

const changeCurrentPage = (e) => {
  e.preventDefault();
  current.textContent = e.currentTarget.textContent;
  console.log(current.textContent);
  galleryRefresh();
  fetchImages(Number(current.textContent))
    .then((data) => last.textContent = data.total_pages);

  conditionalHide();
};

const changeCurrentPageMovies = (e) => {
  e.preventDefault();
  current.textContent = e.currentTarget.textContent;
  console.log(current.textContent);
  galleryRefresh();
  fetchMovies(text.value, Number(current.textContent))
    .then((data) => last.textContent = data.total_pages);

  conditionalHide();
};

const skipToFirst = (e) => {
  e.preventDefault();
  changeCurrentPage(e);
  e.currentTarget.style.visibility = 'hidden';
  e.currentTarget.disabled = true;
  pageMinusOne.style.visibility = 'hidden';
  pageMinusOne.disabled = true;
  pageMinusTwo.style.visibility = 'hidden';
  pageMinusTwo.disabled = true;
  conditionalHide();
};

const skipToFirstMovies = (e) => {
  e.preventDefault();
  changeCurrentPageMovies(e);
  e.currentTarget.style.visibility = 'hidden';
  e.currentTarget.disabled = true;
  pageMinusOne.style.visibility = 'hidden';
  pageMinusOne.disabled = true;
  pageMinusTwo.style.visibility = 'hidden';
  pageMinusTwo.disabled = true;
  conditionalHide();
};

const skipToLast = (e) => {
  e.preventDefault();
  changeCurrentPage(e);
  e.currentTarget.style.visibility = 'hidden';
  e.currentTarget.disabled = true;
  pagePlusOne.style.visibility = 'hidden';
  pagePlusOne.disabled = true;
  pagePlusTwo.style.visibility = 'hidden';
  pagePlusTwo.disabled = true;
  conditionalHide();
};

const skipToLastMovies = (e) => {
  e.preventDefault();
  changeCurrentPageMovies(e);
  e.currentTarget.style.visibility = 'hidden';
  e.currentTarget.disabled = true;
  pagePlusOne.style.visibility = 'hidden';
  pagePlusOne.disabled = true;
  pagePlusTwo.style.visibility = 'hidden';
  pagePlusTwo.disabled = true;
  conditionalHide();
};

const increment = (e) => {
  e.preventDefault();
  current.textContent = Number(current.textContent) + Number(right.value);
  pageMinusTwo.textContent = Number(pageMinusTwo.textContent) + Number(right.value);
  pageMinusOne.textContent = Number(pageMinusOne.textContent) + Number(right.value);
  pagePlusOne.textContent = Number(pagePlusOne.textContent) + Number(right.value);
  pagePlusTwo.textContent = Number(pagePlusTwo.textContent) + Number(right.value);
  galleryRefresh();
  fetchImages(Number(current.textContent))
    .then((data) => last.textContent = data.total_pages);

  conditionalHide();
};

const incrementMovies = (e) => {
  e.preventDefault();
  current.textContent = Number(current.textContent) + Number(right.value);
  pageMinusTwo.textContent = Number(pageMinusTwo.textContent) + Number(right.value);
  pageMinusOne.textContent = Number(pageMinusOne.textContent) + Number(right.value);
  pagePlusOne.textContent = Number(pagePlusOne.textContent) + Number(right.value);
  pagePlusTwo.textContent = Number(pagePlusTwo.textContent) + Number(right.value);
  galleryRefresh();
  fetchMovies(text.value, Number(current.textContent))
    .then((data) => last.textContent = data.total_pages);

  conditionalHide();
};

const decrement = (e) => {
  e.preventDefault();

  current.textContent = Number(current.textContent) - Number(right.value);
  pageMinusTwo.textContent = Number(pageMinusTwo.textContent) - Number(right.value);
  pageMinusOne.textContent = Number(pageMinusOne.textContent) - Number(right.value);
  pagePlusOne.textContent = Number(pagePlusOne.textContent) - Number(right.value);
  pagePlusTwo.textContent = Number(pagePlusTwo.textContent) - Number(right.value);
  galleryRefresh();
  fetchImages(Number(current.textContent))
    .then((data) => last.textContent = data.total_pages);

  conditionalHide();
};

const decrementMovies = (e) => {
  e.preventDefault();
  current.textContent = Number(current.textContent) - Number(right.value);
  pageMinusTwo.textContent = Number(pageMinusTwo.textContent) - Number(right.value);
  pageMinusOne.textContent = Number(pageMinusOne.textContent) - Number(right.value);
  pagePlusOne.textContent = Number(pagePlusOne.textContent) - Number(right.value);
  pagePlusTwo.textContent = Number(pagePlusTwo.textContent) - Number(right.value);
  galleryRefresh();
  fetchMovies(text.value, Number(current.textContent))
    .then((data) => last.textContent = data.total_pages);

  conditionalHide();
};

pageMinusTwo.addEventListener('click', changeCurrentPage);
pageMinusOne.addEventListener('click', changeCurrentPage);
pagePlusOne.addEventListener('click', changeCurrentPage);
pagePlusTwo.addEventListener('click', changeCurrentPage);
right.addEventListener('click', increment);
left.addEventListener('click', decrement);
first.addEventListener('click', skipToFirst);
last.addEventListener('click', skipToLast);

export { conditionalHide };
export { changeCurrentPageMovies };
export { incrementMovies };
export { decrementMovies };
export { skipToFirstMovies };
export { skipToLastMovies };
export { changeCurrentPage };
export { increment };
export { decrement };
export { skipToFirst };
export { skipToLast };
