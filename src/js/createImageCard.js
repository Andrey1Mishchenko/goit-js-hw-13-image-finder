import imageCardTpl from '../templates/image-card.hbs';
import API from './apiService';
import { notice, error } from '@pnotify/core';
import { debounce } from 'lodash';

const refs = {
  serchFormEl: document.querySelector('#search-form'),
  listEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more'),
};

const imageApi = new API();

refs.serchFormEl.addEventListener('input', debounce(onSearch, 500));
refs.loadMoreBtnEl.addEventListener('click', onBtnClick);

function onSearch(evt) {
  imageApi.query = evt.target.value.trim();
  if (!imageApi.query) return;
  refs.listEl.innerHTML = '';
  imageApi.resetPage();
  imageApi.fetchImage().then(x => refs.listEl.insertAdjacentHTML('beforeend', imageCardTpl(x)));
}

function onBtnClick(evt) {
  imageApi.fetchImage().then(x => refs.listEl.insertAdjacentHTML('beforeend', imageCardTpl(x)));
}
