import{S as L,i as f,a as v}from"./assets/vendor-bad0427b.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&e(d)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const m=document.querySelector(".form"),u=document.querySelector(".gallery"),l=document.querySelector(".loader"),i=document.querySelector(".btn");let n,c=1;const g=40;i.addEventListener("click",b);const p=new L(".gallery a",{captionsData:"alt",captionDelay:250,nav:!0,close:!0,enableKeyboard:!0,docClose:!0});async function y(s,r){const a="https://pixabay.com/api/";try{return(await v.get(`${a}`,{params:{key:"41672793-a8580f18ed6f224a15f8d2674",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:g}})).data}catch(e){console.error(e)}}m.addEventListener("submit",s=>{if(s.preventDefault(),c=1,u.innerHTML="",l.classList.remove("visible"),n=s.target.elements.search.value.trim(),!n){f.error({title:"Error",message:"Sorry, imput is empty!",position:"topRight"}),l.classList.add("visible");return}y(n).then(({hits:r})=>{if(r.length===0){f.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#ffffff",titleColor:"#ffffff",iconColor:"#ffffff",backgroundColor:"#EF4040"});return}h(r),i.classList.remove("hide"),p.refresh(),m.reset()}).catch(r=>console.log(r)).finally(()=>{l.classList.add("visible")})});function h(s){const r=s.reduce((a,e)=>a+`
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
            `,"");u.insertAdjacentHTML("beforeend",r)}async function b(s){i.classList.remove("hide"),l.classList.add("visible");const a=document.querySelector(".gallery-item:first-child").getBoundingClientRect().height;try{c+=1;const{data:{hits:e,totalHits:t}}=await y(n,c),o=Math.ceil(t/g);i.classList.remove("hide"),u.insertAdjacentHTML("beforeend",h(e)),p.refresh(),c===o&&(i.classList.remove("hide"),f.show({message:"We're sorry, but you've reached the end od search results",position:"topRight"}))}catch(e){console.log(e)}finally{window.scrollBy({top:2*a,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
