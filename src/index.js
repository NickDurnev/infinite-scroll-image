import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { throttle } from 'throttle-debounce';
import renderImagesContainer from "./js/renderImages";
import imageServiceAPI from "./js/imageServiceAPI";
import scrollPageDownRegister from './js/infiniteScroll';

const refs = getRefs();

export function getRefs() {
    return {
        searchForm: document.querySelector('.js-search-form'),
        imageContainer: document.querySelector('.image-grid'),
    }
}

refs.searchForm.addEventListener('submit', onSearch);
refs.searchForm.addEventListener('input', resetSearch);
window.addEventListener("scroll", throttle(300,scrollPageDownRegister));

export const newImagesService = new imageServiceAPI();

export function fetchImages() {
    newImagesService.fetchImage().then((images) => {
        if (images.length === 0) {
        Notify.info('Таких картинок нет. Введите что-то поинтереснее')
    }
        newImagesService.incrementPage();
        renderImagesContainer(images);
    })
        .catch(error => Notify.failure('Картинки кончились'));
}

function onSearch(e) {
    e.preventDefault();
    newImagesService.query = e.currentTarget.elements.query.value;
    
    if (newImagesService.query === "") {
        return Notify.info('Введите что-то')
    }

    fetchImages();
}

function resetSearch(e) {
    newImagesService.query = e.currentTarget.elements.query.value;
    if (newImagesService.query !== "") {
        return;
    }
    if (newImagesService.query === "") {
    newImagesService.resetPage();
    refs.imageContainer.innerHTML='<div class="grid-sizer"></div>'
    }
}







