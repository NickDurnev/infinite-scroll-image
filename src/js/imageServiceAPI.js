const API_KEY = 'kV-N2ODDSC0P-V2K23wqDYGO4BZVIAMvAcbmzu5EzMQ';
const BASE_URL = 'https://api.unsplash.com/search';

export default class imageApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.perpage = 10;
    }

    fetchImage() {
        const url = `${BASE_URL}/collections?client_id=${API_KEY}&page=${this.page}&per_page=
        ${this.perpage}&query=${this.searchQuery}&fm=jpg&w=600&fit=max`;

        return fetch(url)
            .then(r => r.json())
            .then(({results}) => results)
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}