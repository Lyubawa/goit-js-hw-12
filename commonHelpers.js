import{S as L,i as f,a as v}from"./assets/vendor-bad0427b.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const u=document.querySelector(".form"),m=document.querySelector(".gallery"),i=document.querySelector(".loader"),l=document.querySelector(".btn"),b=document.querySelector(".gallery-item");let n,c=1;const g=40,p=new L(".gallery a",{captionsData:"alt",captionDelay:250,nav:!0,close:!0,enableKeyboard:!0,docClose:!0});async function y(o,e){const a="https://pixabay.com/api/";try{return(await v.get(`${a}`,{params:{key:"41672793-a8580f18ed6f224a15f8d2674",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:g}})).data}catch(r){console.error(r)}}u.addEventListener("submit",o=>{if(o.preventDefault(),c=1,m.innerHTML="",i.classList.remove("visible"),n=o.target.elements.search.value.trim(),!n){f.error({title:"Error",message:"Sorry, imput is empty!",position:"topRight"}),i.classList.add("visible");return}y(n).then(({hits:e})=>{if(e.length===0){f.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#ffffff",titleColor:"#ffffff",iconColor:"#ffffff",backgroundColor:"#EF4040"});return}h(e),l.classList.remove("hide"),p.refresh(),u.reset()}).catch(e=>console.log(e)).finally(()=>{i.classList.add("visible")})});function h(o){const e=o.reduce((a,r)=>a+`
           <li class="gallery-item">
           <a class="gallery-link" href="${r.largeImageURL}">
           <img
           class="gallery-image"
           src="${r.webformatURL}"
           alt="${r.tags}"
           />
           </a>
           <div class="gallery-info">
           <p>likes: ${r.likes}</p> 
           <p>views: ${r.views}</p>
           <p>comments: ${r.comments}</p>
           <p>downloads: ${r.downloads}</p>
           </div>
           </li>
            `,"");m.insertAdjacentHTML("beforeend",e)}l.addEventListener("click",()=>{try{c+=1,l.classList.add("hide"),i.classList.remove("visible");const o=b.getBoundingClientRect().height;y(n,c).then(e=>{h(e.data.hits),window.scrollBy(0,o*2);const a=Math.ceil(e.data.totalHits/g);if(c===a){l.classList.remove("hide"),f.show({message:"We're sorry, but you've reached the end od search results",position:"topRight"}),i.classList.add("visible");return}p.refresh(),l.classList.remove("hide"),i.classList.remove("visible")})}catch(o){console.log(o)}});
//# sourceMappingURL=commonHelpers.js.map
