import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector('button[data-action="load-more"]');

let searchQuery;

const galleryqueryLightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    nav: true,
    close: true,
    enableKeyboard: true,
    docClose: true,
});


async function searchImages(searchQuery) {
    const BASE_URL = "https://pixabay.com/api/";
    
    try {
        const response = await api.get(`${BASE_URL}`, {
            params: {
    key: "41672793-a8580f18ed6f224a15f8d2674",
    q: searchQuery,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    gallery.innerHTML = '';
    loader.classList.remove('visible');
    searchQuery = event.target.elements.search.value.trim();
    if (!searchQuery) {
        iziToast.error({
        title: "Error",
        message: "Sorry, imput is empty!",
        position: "topRight",
        });
        loader.classList.add('visible');
        return;
    }
    searchImages(searchQuery)
    .then(({ hits }) => {
        if (hits.length === 0) {
            iziToast.error({
        title: "Error",
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
        messageColor: "#ffffff",
        titleColor: "#ffffff",
        iconColor: "#ffffff",
        backgroundColor: "#EF4040",
            });   
            return;
            } 
                const renderImages = hits.reduce((html, hit) => {
                    return (
                        html + `
           <li class="gallery-item">
           <a class="gallery-link" href="${hit.largeImageURL}">
           <img
           class="gallery-image"
           src="${hit.webformatURL}"
           alt="${hit.tags}"
           />
           </a>
           <div class="gallery-info">
           <p>likes: ${hit.likes}</p> 
           <p>views: ${hit.views}</p>
           <p>comments: ${hit.comments}</p>
           <p>downloads: ${hit.downloads}</p>
           </div>
           </li>
            `
            );
            }, "")
            gallery.innerHTML = renderImages;
            galleryLightbox.refresh();
               })        
        .catch((error) => console.log(error))
        .finally(() => {
        loader.classList.add('visible');
        });
    event.currentTarget.reset();
})





// axios("https://pixabay.com/api/?key=41672793-a8580f18ed6f224a15f8d2674") 
//     .then(response => console.log(response))
// .catch(error => console.log(error))