export default class ImageApi {
  constructor() {
    this.serchQuery = '';
    this.page = 1;
  }

  fetchImage() {
    const authKey = '24313519-d6898f2d99b423a0b41f41fab';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.serchQuery}&page=${this.page}&per_page=12&key=${authKey}`;

    return fetch(url)
      .then(responce => responce.json())
      .then(data => {
        this.page += 1;
        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.serchQuery;
  }

  set query(newQuery) {
    this.serchQuery = newQuery;
  }
}
