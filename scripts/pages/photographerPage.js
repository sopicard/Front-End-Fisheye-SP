import { photographerFactory } from "../factories/photographerFactory.js";
import { mediaFactory } from "../factories/mediaFactory.js";

let photographerMedia = [];

// Récupère les données JSON à partir d'un fichier et retourne un objet JS
async function getData(file) {
  const response = await fetch(file);
  const data = await response.json(); 
  return data;
}

// Trouve un photographe dans le tableau en fonction de son ID
const findPhotographerById = (id, photographers) => {
  const photographer = photographers.find((photographer) => photographer.id === id);
  return photographer;
};

// Récupère les médias correspondants à l'ID du photographe
const getMediaByPhotographerId = (id, media) => {
  const mediaByPhotographer = media.filter((media) => media.photographerId === id);
  return mediaByPhotographer;
};

// Trie les médias en fonction du type de tri selectionné(passé en paramètre)
function sortMedia(sortType) {
  if (sortType === "popularity") {
    photographerMedia.sort((a, b) => b.likes - a.likes);
  } else if (sortType === "date") {
    photographerMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortType === "title") {
    photographerMedia.sort((a, b) => a.title.localeCompare(b.title));
  }
}

// Met à jour l'affichage des médias en fonction du photographe et du tri appliqué
function updateDisplayMedia(photographerId) {
  const mediaContainer = document.querySelector(".media-container");
  mediaContainer.innerHTML = "";

  addMediaToContainer(photographerId, photographerMedia, mediaContainer);
}

// Additionne tous les likes du photographe concerné
function getTotalLikes(photographerMedia) {
  let totalLikes = 0;
  photographerMedia.forEach(media => {
    totalLikes += media.likes;
  });
  return totalLikes;
}

// Met à jour le nombre de likes pour un média + compteur total en fonction de l'incrément donné.
function updateLikes(mediaHeart, mediaLikes, increment) {
  const totalLikesElement = document.querySelector(".total-likes");
  const currentTotalLikes = parseInt(totalLikesElement.textContent);

  const currentLikes = parseInt(mediaLikes.textContent);
  const newLikes = increment ? currentLikes + 1 : currentLikes - 1;
  mediaLikes.textContent = newLikes;

  increment ? mediaHeart.setAttribute("data-is-liked", true) : mediaHeart.setAttribute("data-is-liked", false);
  increment ? mediaHeart.classList.add("liked") : mediaHeart.classList.remove("liked");

  const eventName = increment ? "mediaLiked" : "mediaUnLiked";
  const mediaEvent = new CustomEvent(eventName);
  document.dispatchEvent(mediaEvent);

  totalLikesElement.textContent = increment ? `${currentTotalLikes + 1}` : `${currentTotalLikes - 1}`;
}

//  Gère les évènements "liked"
function toggleLike(event) {
  if (event.type === "click" || event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    const mediaHeart = event.target;
    const mediaLikes = mediaHeart.parentElement.querySelector(".media-likes");
    const isLiked = mediaHeart.getAttribute("data-is-liked") === "true";
    updateLikes(mediaHeart, mediaLikes, !isLiked);
  }
}

// Crée et ajoute les éléments HTML des médias triés correspondants à l'id du photographe
function addMediaToContainer(photographerId, photographerMedia, mediaContainer) {
  photographerMedia.forEach(media => {
    media.photographerId = photographerId;
    const mediaElement = mediaFactory(media);
    const mediaHeart = mediaElement.querySelector(".media-heart");
    mediaContainer.appendChild(mediaElement);

    mediaHeart.addEventListener("click", toggleLike);
    mediaHeart.addEventListener("keydown", toggleLike);
    
    mediaElement.addEventListener("click", openLightBox);
  });
}

// Affiche les informations du photographe dans le header de la page
function displayHeader(photographer) {
  const photographerElement = photographerFactory(photographer);

  const photographerHeader = document.querySelector(".photograph-header");
  const photographerHeaderDOM = photographerElement.getPhotographerHeaderDOM();
  const { div, img } = photographerHeaderDOM;

  const contactButton = document.querySelector(".contact_button");

  photographerHeader.insertBefore(div, contactButton);
  photographerHeader.insertBefore(img, contactButton.nextSibling);

  const contactModal = document.querySelector("#contact_modal");
  contactModal.setAttribute("aria-label", `Contactez-moi ${photographer.name}`);
}

// Affiche les médias triés sur la page
function displayMedia(photographerId, media) {
  const mediaContainer = document.createElement("div");
  mediaContainer.classList.add ("media-container");

  const sortingContainer = document.querySelector(".sorting-container");
  sortingContainer.insertAdjacentElement("afterend", mediaContainer);

  const mainPart = document.querySelector("main");
  mainPart.appendChild(mediaContainer);

  addMediaToContainer(photographerId, media, mediaContainer);
}

// Crée et affiche l'encart totalLikes + prix/jour
function displayTotalLikesAndPrice(photographerMedia, photographer) {
  const totalLikes = getTotalLikes(photographerMedia);
  const pricePerDay = photographer.price;

  const totalContainer = document.createElement("div");
  const totalLikesElement = document.createElement("p");
  const heartIcon = document.createElement("span");
  const pricePerDayElement = document.createElement("p");
  
  totalContainer.classList.add("total-container");
  totalLikesElement.classList.add("total-likes")
  totalLikesElement.textContent = `${totalLikes}`;
  heartIcon.classList.add("total-heart", "fas", "fa-heart");
  pricePerDayElement.textContent = `${pricePerDay}€/jour`;

  const mainPart = document.querySelector("main");
  mainPart.appendChild(totalContainer);
  totalContainer.appendChild(totalLikesElement);
  totalContainer.appendChild(heartIcon);
  totalContainer.appendChild(pricePerDayElement);
}

// Crée la structure de la lightbox
function createLightBox() {
  const lightbox = document.createElement("dialog");
  const lightboxContent = document.createElement("div");
  const mediaBox = document.createElement("div"); 
  const previousArrow = document.createElement("button");
  const nextArrow = document.createElement("button");
  
  const closeButton = createCloseButton();
  
  lightbox.classList.add("lightbox");
  lightbox.setAttribute("aria-label", "Vue en gros plan de l'image");
  lightboxContent.classList.add("lightbox-content");
  mediaBox.classList.add("media-box");
  previousArrow.classList.add("previous-arrow","fas", "fa-angle-left", "focus-line-orange");
  previousArrow.setAttribute("aria-label", "Image précédente");
  nextArrow.classList.add("next-arrow", "fas", "fa-angle-right", "focus-line-orange");
  nextArrow.setAttribute("aria-label", "Image suivante");
  
  lightboxContent.appendChild(previousArrow);
  lightboxContent.appendChild(mediaBox);
  lightboxContent.appendChild(closeButton);
  lightboxContent.appendChild(nextArrow);

  lightbox.appendChild(lightboxContent);
  document.body.appendChild(lightbox);

  previousArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + photographerMedia.length) % photographerMedia.length;
    updateLightBox(currentIndex);
  });
  
  nextArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % photographerMedia.length;
    updateLightBox(currentIndex);
  });   
}

let currentIndex = 0;

// Ouvre la lightbox et affiche le contenu correspondant
function openLightBox(event) { 
  if (event.target.classList.contains("media-heart")) {
    return;
  }

  // Récupère les données du média sélectionné
  const clickedMedia = event.target.closest(".media-photograph");
  currentIndex = photographerMedia.findIndex(media => media.id === parseInt(clickedMedia.getAttribute("data-media-id")));

  const lightbox = document.querySelector(".lightbox");

  updateLightBox(currentIndex);
  
  // Ouvre la lightbox
  lightbox.showModal();
}

//  Crée et gère le bouton de fermeture de la lightbox
function createCloseButton() {
  const closeButton = document.createElement("button");
  closeButton.classList.add("lightbox-close-button", "fas", "fa-times");
  closeButton.classList.add("focus-line-orange");
  closeButton.setAttribute("aria-label", "Fermer la fenêtre de vue rapprochée");

  closeButton.addEventListener("click", () => {
    const lightbox = document.querySelector(".lightbox");
    lightbox.close();
  });

  return closeButton;
}

// Crée les éléments HTML pour la lightbox en utilisant mediaFactory
function createLightboxContent(selectedMedia) {
  const lightboxLink = document.createElement("div");
  const lightboxImage = document.createElement("img");
  const lightboxVideo = document.createElement("video");
  const lightboxTitle = document.createElement("h3");

  lightboxLink.classList.add("focus-line-orange");
  lightboxImage.classList.add("lightbox-img");
  lightboxVideo.classList.add("lightbox-video");
  lightboxTitle.classList.add("lightbox-title");
  lightboxTitle.textContent = selectedMedia.title;

  const mediaBox = document.querySelector(".media-box");
  mediaBox.textContent = "";

  lightboxLink.setAttribute("aria-label", selectedMedia.title);
  lightboxLink.setAttribute("tabindex", "0");
  lightboxTitle.setAttribute("lang", "en");

  if (selectedMedia.image) {
    const lightboxImageContainer = document.createElement("div");
    lightboxImageContainer.classList.add("lightbox-img");
    lightboxImage.setAttribute("src", `assets/photographers/${selectedMedia.photographerId}/${selectedMedia.image}`);
    lightboxImage.setAttribute("alt", selectedMedia.title);
    lightboxImageContainer.appendChild(lightboxImage); 
    lightboxLink.appendChild(lightboxImageContainer); 
  } else if (selectedMedia.video) {
    const lightboxVideoContainer = document.createElement("div"); 
    lightboxVideoContainer.classList.add("lightbox-video");
    lightboxVideo.setAttribute("src", `assets/photographers/${selectedMedia.photographerId}/${selectedMedia.video}`);
    lightboxVideo.setAttribute("aria-label", selectedMedia.title);
    lightboxVideo.controls = true;
    lightboxVideo.setAttribute("preload", "metadata");
    lightboxVideoContainer.appendChild(lightboxVideo); 
    lightboxLink.appendChild(lightboxVideoContainer);
  }
  mediaBox.appendChild(lightboxLink);
  mediaBox.appendChild(lightboxTitle);
}

// Met à jour la lightbox pour afficher un nouveau media
function updateLightBox(currentIndex) {
  const selectedMedia = photographerMedia[currentIndex];
  createLightboxContent(selectedMedia);
}

// Initialise pour charger et afficher les données
async function init() {
  const data = await getData("../../data/photographers.json");
  const { photographers, media} = data;

  createLightBox();

  document.addEventListener("keydown", (event) => {
    const lightbox = document.querySelector(".lightbox");
    // Vérifie si la lightbox est ouverte
    if (lightbox.open) {
      if (event.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + photographerMedia.length) % photographerMedia.length;
        updateLightBox(currentIndex);
      } else if (event.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % photographerMedia.length;
        updateLightBox(currentIndex);
      }
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get("id"));

  const photographer = findPhotographerById(photographerId, photographers);
  photographerMedia = getMediaByPhotographerId(photographerId, media);

  sortMedia("popularity");
  
  const photographerName = document.querySelector(".photographer_name");
  photographerName.textContent = photographer.name;

  displayHeader(photographer);
  displayMedia(photographerId, photographerMedia);
  displayTotalLikesAndPrice(photographerMedia, photographer);

  const sortSelect = document.querySelector("#sort-select");
  sortSelect.addEventListener("change", (event) => {
    sortMedia(event.target.value);
    updateDisplayMedia(photographerId);
  });
}

init();
