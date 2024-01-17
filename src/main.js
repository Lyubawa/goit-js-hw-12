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
    page = 1;
    gallery.innerHTML = "";
    loader.classList.remove("visible");
    query = event.target.elements.search.value.trim();
    if (!query) {
        iziToast.error({
            title: "Error",
            message: "Sorry, imput is empty!",
            position: "topRight",
        });
        loader.classList.add("visible");
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
            renderImage(hits);
            loadMoreBtn.classList.remove("hide");
            galleryLightbox.refresh();
            form.reset();
        })
        .catch((error) => console.log(error))
        .finally(() => {
            loader.classList.add("visible");
        });
    
});

function renderImage(hits) {
    const markup = hits.reduce((html, hit) =>
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
        , "");
    gallery.insertAdjacentHTML("beforeend", markup);
}
    
loadMoreBtn.addEventListener("click", () => {
    try {
        page += 1;
        loadMoreBtn.classList.add("hide");
        loader.classList.remove("visible");

        const height = itemHeight.getBoundingClientRect().height;

        searchImages(query, page)
            .then((response) => {
                renderImage(response.data.hits);

                window.scrollBy(0, height * 2);

                const totalPages = Math.ceil(response.data.totalHits / perPage);

                if (page === totalPages) {
                    loadMoreBtn.classList.remove("hide");
                    iziToast.show({
                        message: "We're sorry, but you've reached the end od search results",
                        position: "topRight",
                    });
                    loader.classList.add("visible");
                    return;
                }
                galleryLightbox.refresh();
                loadMoreBtn.classList.remove("hide");
                loader.classList.remove("visible");
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
//         else if (response.data.hits.length < perPage) {
//             iziToast.show({
//                 message: "We're sorry, but you've reached the end od search results",
//                 position: "topRight",
//             });
//         }
//         renderImage(response.data.hits);
//         galleryLightbox.refresh();
//         form.reset();
//     })
//     .catch((error) => console.log(error))

// 

// const createImagesRequest = (searchQuery) => {
//     let page = 1;
//     let isLastPage = false;
//     const perPage = 40;

//     return async () => {
//         try {
//             if (isLastPage) return;

//             const { hits, totalHits } = await searchImages({ page, perPage, searchQuery });

//             if (page >= Math.ceil(totalHits / perPage)) {
//                 isLastPage = true;
//             }
//             page += 1;
//             return hits;
//         }
//         catch (error) {
//             console.error(error);
//         }
//     }
// }









// 




// axios("https://pixabay.com/api/?key=41672793-a8580f18ed6f224a15f8d2674") 
//     .then(response => console.log(response))
// .catch(error => console.log(error))