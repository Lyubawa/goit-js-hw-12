import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".btn");
const itemHeight = document.querySelector(".gallery-item");


let query;
let page = 1;
const perPage = 40;

const galleryLightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    nav: true,
    close: true,
    enableKeyboard: true,
    docClose: true,
});

async function searchImages(searchQuery, page) {
    const BASE_URL = "https://pixabay.com/api/";
    
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
    key: "41672793-a8580f18ed6f224a15f8d2674",
    q: searchQuery,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: page,
    per_page: perPage,
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
    query = event.target.elements.search.value.trim();
    if (!query) {
        iziToast.error({
            title: "Error",
            message: "Sorry, imput is empty!",
            position: "topRight",
        });
        loader.classList.add('visible');
        return;
    }
    searchImages(query)
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
});

page = 1;

loadMoreBtn.addEventListener("click", () => {
    try {
        page += 1;
        loadMoreBtn.classList.add('visible');
        loader.classList.remove('visible');

        itemHeight.getBoundingClientRect().height;

        searchImages(query, page)
            .then((response) => {
                renderImages(response.data.hits);

                window.scrollBy(0, itemHeight * 2);

                const totalPages = Math.ceil(response.data.totalHits / perPage);

                if (page === totalPages) {
                    loadMoreBtn.classList.remove('visible');
                    iziToast.show({
                        message: "We're sorry, but you've reached the end od search results",
                        position: "topRight",
                    });
                    loader.classList.add('visible');
                    return;
                }
                galleryLightbox.refresh();

                loadMoreBtn.classList.remove('visible');
                loader.classList.remove('visible');
            });
    }
    catch (error) {
        console.log(error);
    }
});











// searchImages(query, page) 
//     .then(response => {
//         if (!response.data.hits.length) {
//             iziToast.error({
//                     title: "Error",
//                     message: "Sorry, there are no images matching your search query. Please try again!",
//                     position: "topRight",
//                     messageColor: "#ffffff",
//                     titleColor: "#ffffff",
//                     iconColor: "#ffffff",
//                     backgroundColor: "#EF4040",
//                 });
//         }
//         else if (response.data.hits.length > perPage) {
//             iziToast.show({
//                 message: "We're sorry, but you've reached the end od search results",
//                 position: "topRight",
//             });
//         }
//         renderImages(response.data.hits);
//         galleryLightbox.refresh();
//         form.reset();
//     })
//     .catch((error) => console.log(error))




// axios("https://pixabay.com/api/?key=41672793-a8580f18ed6f224a15f8d2674") 
//     .then(response => console.log(response))
// .catch(error => console.log(error))