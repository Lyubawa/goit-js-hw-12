import{S as L,i as d,a as b}from"./assets/vendor-bad0427b.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&e(f)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const m=document.querySelector(".form"),g=document.querySelector(".gallery"),l=document.querySelector(".loader"),i=document.querySelector(".btn");let n,c=1;const u=40;i.addEventListener("click",v);const p=new L(".gallery a",{captionsData:"alt",captionDelay:250,nav:!0,close:!0,enableKeyboard:!0,docClose:!0});async function y(a,r){const s="https://pixabay.com/api/";try{return(await b.get(`${s}`,{params:{key:"41672793-a8580f18ed6f224a15f8d2674",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:u}})).data}catch(e){console.error(e)}}m.addEventListener("submit",a=>{if(a.preventDefault(),c=1,g.innerHTML="",l.classList.remove("visible"),n=a.target.elements.search.value.trim(),!n){d.error({title:"Error",message:"Sorry, input is empty!",position:"topRight"}),l.classList.add("visible");return}y(n).then(({hits:r,totalHits:s})=>{if(r.length===0){d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#ffffff",titleColor:"#ffffff",iconColor:"#ffffff",backgroundColor:"#EF4040"});return}h(r),i.classList.remove("hide"),p.refresh(),m.reset(),s<=u&&i.classList.add("hide")}).catch(r=>console.log(r)).finally(()=>{l.classList.add("visible")})});function h(a){const r=a.reduce((s,e)=>s+`
           <li class="gallery-item">
           <a class="gallery-link" href="${e.largeImageURL}">
           <img
           class="gallery-image"
           src="${e.webformatURL}"
           alt="${e.tags}"
           />
           </a>
           <div class="gallery-info">
           <p>likes: ${e.likes}</p> 
           <p>views: ${e.views}</p>
           <p>comments: ${e.comments}</p>
           <p>downloads: ${e.downloads}</p>
           </div>
           </li>
            `,"");g.insertAdjacentHTML("beforeend",r)}async function v(a){i.classList.add("hide"),l.classList.add("visible");const s=document.querySelector(".gallery-item:first-child").getBoundingClientRect().height;try{c+=1;const{hits:e,totalHits:t}=await y(n,c),o=Math.ceil(t/u);h(e),p.refresh(),c===o?(i.classList.add("hide"),d.show({message:"We're sorry, but you've reached the end od search results",position:"topRight",messageColor:"#ffffff",titleColor:"#ffffff",iconColor:"#ffffff",backgroundColor:"#EF4040"})):i.classList.remove("hide")}catch(e){console.log(e)}finally{window.scrollBy({top:2*s,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
