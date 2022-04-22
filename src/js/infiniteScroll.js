import imagesloaded from "imagesloaded";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { getRefs,fetchImages } from "../index";

const refs = getRefs();

export default function scrollPageDownRegister() {
    let maxYOffset = document.documentElement.offsetHeight - document.documentElement.clientHeight;
    console.log(maxYOffset);
    console.log(this.pageYOffset);
    if (Math.ceil(this.pageYOffset) >= (maxYOffset - 100)) {
        Loading.circle();
        fetchImages();
        imagesloaded(refs.imageContainer, () => {
            Loading.remove();
        })
    }
}


