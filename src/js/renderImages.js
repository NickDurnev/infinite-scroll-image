import imageTpl from '../teamplates/image.hbs';
import Masonry from "masonry-layout";
import imagesloaded from "imagesloaded";
import { getRefs } from '../index';

const refs = getRefs();

refs.imageContainer.addEventListener('click', zoomImage);

function masonryGallery() {
    const msnry = new Masonry( refs.imageContainer, {
            itemSelector: ".image-item",
            columnWidth: '.grid-sizer',
            percentPosition: true,
            stagger: 30
    });
    return msnry;
}

export default function renderImagesContainer(images) {
    refs.imageContainer.insertAdjacentHTML('beforeend', imageTpl(images));
    imagesloaded(refs.imageContainer, masonryGallery)
}

function zoomImage(e) {
    const msnry = masonryGallery();
    if (e.target.nodeName !== 'IMG') {
    return;
    }
    e.target.parentNode.classList.toggle('image-item--gigante');
    msnry.layout();
}





