import imageCardTpl from '../templates/image-card.hbs';
import API from './apiService';
import { notice, error } from '@pnotify/core';
import { debounce } from 'lodash';
import * as basicLightbox from 'basiclightbox';

const refs = {
  serchFormEl: document.querySelector('#search-form'),
  listEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more'),
};

const imageApi = new API();

refs.serchFormEl.addEventListener('input', debounce(onSearch, 500));
refs.loadMoreBtnEl.addEventListener('click', onBtnClick);
refs.loadMoreBtnEl.classList.add('is-hidden');
refs.listEl.classList.add('is-hidden');

function onSearch(evt) {
  imageApi.query = evt.target.value.trim();
  if (!imageApi.query) return;
  refs.listEl.innerHTML = '';
  imageApi.resetPage();
  imageApi.fetchImage().then(data => {
    if (!data.length) {
      const myError = error({
        text: 'image not found. enter valid query!',
        delay: 2000,
        addClass: 'notice',
      });
      return;
    }
    showElements();
    refs.listEl.insertAdjacentHTML('beforeend', imageCardTpl(data));
  });
}

function onBtnClick(evt) {
  imageApi
    .fetchImage()
    .then(data => refs.listEl.insertAdjacentHTML('beforeend', imageCardTpl(data)));
  setTimeout(scrollIntoView, 500);
}

function scrollIntoView() {
  refs.loadMoreBtnEl.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function showElements() {
  refs.loadMoreBtnEl.classList.remove('is-hidden');
  refs.listEl.classList.remove('is-hidden');
}

// refs.listEl.addEventListener('click', openLargeImg);

// function openLargeImg(evt) {
//   if (evt.target.tagName === 'IMG') {
//     const instance = basicLightbox.create(
//       `<img src="assets/images/image.png" width="800" height="600">`,
//     );
//     instance.show();
//   }
// }
