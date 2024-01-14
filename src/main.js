import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

axios({
    method: "get",
    url: "<https://pixabay.com/api/>"
})
    .then(response => console.log(response))
.catch(error => console.error(error))

// const form = document.querySelector(".form");
// const gallery = document.querySelector(".gallery");
// const loader = document.querySelector(".loader");
// const loadMoreBtn = document.querySelector('button[data-action="load-more"]');

// const api = axios.create({
//     baseURL: "https://pixabay.com/api/",
//     params: {
//         key: "41672793-a8580f18ed6f224a15f8d2674",
//         q: "cat",
//         image_type: "photo",
//         orientation: "horizontal",
//         safesearch: true,
//     }
// });

// function searchImages(hits = []) {
//     const renderImages = hits.reduce((html, hit) =>
//         html + `
//            <li class="gallery-item">
//            <a class="gallery-link" href="${hit.largeImageURL}">
//            <img
//            class="gallery-image"
//            src="${hit.webformatURL}"
//            alt="${hit.tags}"
//            />
//            </a>
//            <div class="gallery-info">
//            <p>likes: ${hit.likes}</p> 
//            <p>views: ${hit.views}</p>
//            <p>comments: ${hit.comments}</p>
//            <p>downloads: ${hit.downloads}</p>
//            </div>
//            </li>
//             `
//         , "");
//             gallery.insertAdjacentHTML("beforeend", renderImages);
// }

// const getHits = async (params) => {
//     try {
//         const response = await api.get("https://pixabay.com/api/", { params });
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
// }

// getHits({
//     q: "cat",
//     page: 1,
//     per_page: 1
// }).then(data => {
//     renderImages(data.hits);
// })