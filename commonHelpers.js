import{S as L,i as c,a as v}from"./assets/vendor-bad0427b.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const p=document.querySelector(".form"),h=document.querySelector(".gallery"),a=document.querySelector(".loader"),f=document.querySelector(".btn"),y=document.querySelector(".gallery-item");let l,n=1;const g=40,u=new L(".gallery a",{captionsData:"alt",captionDelay:250,nav:!0,close:!0,enableKeyboard:!0,docClose:!0});async function m(r,t){const i="https://pixabay.com/api/";try{return(await v.get(`${i}`,{params:{key:"41672793-a8580f18ed6f224a15f8d2674",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:g}})).data}catch(s){console.error(s)}}p.addEventListener("submit",r=>{if(r.preventDefault(),h.innerHTML="",a.classList.remove("visible"),l=r.target.elements.search.value.trim(),!l){c.error({title:"Error",message:"Sorry, imput is empty!",position:"topRight"}),a.classList.add("visible");return}m(l).then(({hits:t})=>{if(t.length===0){c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#ffffff",titleColor:"#ffffff",iconColor:"#ffffff",backgroundColor:"#EF4040"});return}const i=t.reduce((s,e)=>s+`
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
            `,"");h.innerHTML=i,f.classList.remove("hide"),u.refresh()}).catch(t=>console.log(t)).finally(()=>{a.classList.add("visible")}),r.currentTarget.reset()});n=1;m(l,n).then(r=>{r.data.hits.length?r.data.hits.length<g&&c.show({message:"We're sorry, but you've reached the end od search results",position:"topRight"}):c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#ffffff",titleColor:"#ffffff",iconColor:"#ffffff",backgroundColor:"#EF4040"}),renderImages(r.data.hits),u.refresh(),p.reset()}).catch(r=>console.log(r));f.addEventListener("click",()=>{try{n+=1,f.classList.add("hide"),a.classList.remove("visible"),y.getBoundingClientRect().height,m(l,n).then(r=>{renderImages(r.data.hits),window.scrollBy(0,y*2);const t=Math.ceil(r.data.totalHits/g);if(n===t){c.show({message:"We're sorry, but you've reached the end od search results",position:"topRight"}),a.classList.add("visible");return}u.refresh(),f.classList.remove("hide"),a.classList.remove("visible")})}catch(r){console.log(r)}});
//# sourceMappingURL=commonHelpers.js.map
