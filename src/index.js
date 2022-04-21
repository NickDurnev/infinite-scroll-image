import { Notify } from 'notiflix/build/notiflix-notify-aio';
import imagesloaded from "imagesloaded";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { throttle } from 'throttle-debounce';
import renderImagesContainer from "./js/renderImages";
import imageServiceAPI from "./js/imageServiceAPI";

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

function fetchImages() {
    newImagesService.fetchImage().then((images) => {
        newImagesService.incrementPage();
        renderImagesContainer(images);
    })
    .catch(error => Notify.failure('Картинки кончились'))
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

function scrollPageDownRegister() {
    let maxYOffset = document.documentElement.offsetHeight - document.documentElement.clientHeight;
    console.log(maxYOffset);
    
    if (Math.ceil(this.pageYOffset) == maxYOffset) {
        Loading.circle();
        fetchImages();
        imagesloaded(refs.imageContainer, () => {
            Loading.remove();
        })
    }
}




