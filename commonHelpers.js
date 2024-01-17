import{S as h,i as f,a as v}from"./assets/vendor-bad0427b.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const L=document.querySelector(".form"),u=document.querySelector(".gallery"),a=document.querySelector(".loader"),l=document.querySelector(".btn"),m=document.querySelector(".gallery-item");let n,c=1;const g=40,p=new h(".gallery a",{captionsData:"alt",captionDelay:250,nav:!0,close:!0,enableKeyboard:!0,docClose:!0});async function y(t,r){const i="https://pixabay.com/api/";try{return(await v.get(`${i}`,{params:{key:"41672793-a8580f18ed6f224a15f8d2674",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:g}})).data}catch(s){console.error(s)}}L.addEventListener("submit",t=>{if(t.preventDefault(),u.innerHTML="",a.classList.remove("visible"),n=t.target.elements.search.value.trim(),!n){f.error({title:"Error",message:"Sorry, imput is empty!",position:"topRight"}),a.classList.add("visible");return}y(n).then(({hits:r})=>{if(r.length===0){f.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#ffffff",titleColor:"#ffffff",iconColor:"#ffffff",backgroundColor:"#EF4040"});return}const i=r.reduce((s,e)=>s+`
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
            `,"");u.innerHTML=i,p.refresh()}).catch(r=>console.log(r)).finally(()=>{a.classList.add("visible")}),t.currentTarget.reset()});c=1;l.addEventListener("click",()=>{try{c+=1,l.classList.add("visible"),a.classList.remove("visible"),m.getBoundingClientRect().height,y(n,c).then(t=>{renderImages(t.data.hits),window.scrollBy(0,m*2);const r=Math.ceil(t.data.totalHits/g);if(c===r){l.classList.remove("visible"),f.show({message:"We're sorry, but you've reached the end od search results",position:"topRight"}),a.classList.add("visible");return}p.refresh(),l.classList.remove("visible"),a.classList.remove("visible")})}catch(t){console.log(t)}});
//# sourceMappingURL=commonHelpers.js.map
