import { photographerFactory } from "../factories/photographerFactory.js";
import { mediaFactory } from "../factories/mediaFactory.js";

// Ajoute un écouteur d'évènement => redirige vers la page d'acceuil
const logo = document.querySelector(".logo");
logo.setAttribute("alt", "Fisheye Home page");

logo.addEventListener("click", () => {
  window.location.href = "index.html";
});

let photographerMedia = [];

// Récupère les données des photographes et des médias à partir du fichier JSON
async function getData(file) {
  const response = await fetch(file);
  const data = await response.json(); 
  return data;
};

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

// Trie les médias en fonction du type de tri selectionné
function sortMedia(sortType) {
  if (sortType === "popularity") {
    photographerMedia.sort((a, b) => b.likes - a.likes);
  } else if (sortType === "date") {
    photographerMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortType === "title") {
    photographerMedia.sort((a, b) => a.title.localeCompare(b.title));
  }
};

// Met à jour l'affichage des médias en fonction de l'option de tri choisie
function updateDisplayMedia(photographerId) {
  const mediaContainer = document.querySelector(".media-container");
  mediaContainer.innerHTML = "";

  addMediaToContainer(photographerId, photographerMedia, mediaContainer);
};

// Additionne tous les likes du photographe concerné
function getTotalLikes(photographerMedia) {
  let totalLikes = 0;
  photographerMedia.forEach(media => {
    totalLikes += media.likes;
  });
  return totalLikes;
};

// Met à jour le nombre de likes pour un seul média
function updateLikeCount(mediaHeart, mediaLikes) {
  const isLiked = mediaHeart.getAttribute("data-is-liked") === "true";

  if(!isLiked) {
    const currentLikes = parseInt(mediaLikes.textContent);
    const newLikes = currentLikes + 1;
    mediaLikes.textContent = newLikes;

    mediaHeart.setAttribute("data-is-liked", true);
    mediaHeart.classList.add("liked");

    const mediaLikedEvent = new CustomEvent("mediaLiked");
    document.dispatchEvent(mediaLikedEvent);
  };
};

// Met à jour le nombre total de likes pour tous les médias
function updateTotalLikes() {
  const totalLikesElement = document.querySelector(".total-likes");
  const currentTotalLikes = parseInt(totalLikesElement.textContent);
  const newTotalLikes = currentTotalLikes + 1;
  totalLikesElement.textContent = `${newTotalLikes}`;

  const totalLikesHeart = document.querySelector(".total-heart");
  const isTotalLiked = totalLikesHeart.getAttribute("data-is-liked") === "true";
  if (!isTotalLiked) {
    totalLikesHeart.setAttribute("data-is-liked", true);
    totalLikesHeart.classList.add("liked");
  }
}

document.addEventListener("mediaLiked", updateTotalLikes);

// Crée et ajoute les éléments HTML des médias triés correspondants à l'id du photographe
function addMediaToContainer(photographerId, photographerMedia, mediaContainer) {
  photographerMedia.forEach(media => {
    media.photographerId = photographerId;
    const mediaElement = mediaFactory(media);
    const mediaHeart = mediaElement.querySelector(".media-heart");
    const mediaLikes = mediaElement.querySelector(".media-likes");
    mediaContainer.appendChild(mediaElement);

    mediaHeart.addEventListener("click", () => {
      updateLikeCount(mediaHeart, mediaLikes);  
    });
    
    mediaElement.addEventListener("click", openLightBox);
  });
};

// Affiche les informations du photographe dans le header de la page
function displayHeader(photographer) {
  const photographerElement = photographerFactory(photographer);

  const photographerHeader = document.querySelector(".photograph-header");
  const photographerHeaderDOM = photographerElement.getPhotographerHeaderDOM();
  const { div, img } = photographerHeaderDOM;

  const contactButton = document.querySelector(".contact_button");

  photographerHeader.insertBefore(div, contactButton);
  photographerHeader.insertBefore(img, contactButton.nextSibling);
};

// Affiche les médias triés sur la page
function displayMedia(photographerId, media) {
  const mediaContainer = document.createElement("div");
  mediaContainer.classList.add ("media-container");

  const sortingContainer = document.querySelector(".sorting-container");
  sortingContainer.insertAdjacentElement("afterend", mediaContainer);

  const mainPart = document.querySelector("main");
  mainPart.appendChild(mediaContainer);

  addMediaToContainer(photographerId, media, mediaContainer);
};

// Crée et affiche l'encart totalLikes + prix/jour
function displayTotalLikesAndPrice(photographerMedia, photographer) {
  const totalLikes = getTotalLikes(photographerMedia);
  const pricePerDay = photographer.price;

  const totalContainer = document.createElement("div");
  const totalLikesElement = document.createElement("p");
  const heartIcon = document.createElement("i");
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
};

// Crée la structure de la lightbox
function createLightBox() {
  const lightbox = document.createElement("dialog");
  const lightboxContent = document.createElement("div");
  const mediaBox = document.createElement("div"); 
  const previousArrow = document.createElement("i");
  const nextArrow = document.createElement("i");
  
  const closeButton = closeLightbox();
  
  lightbox.classList.add("lightbox");
  lightbox.setAttribute("aria-label", "image closeup view");
  lightboxContent.classList.add("lightbox-content");
  mediaBox.classList.add("media-box");
  previousArrow.classList.add("previous-arrow","fas", "fa-angle-left");
  nextArrow.classList.add("next-arrow", "fas", "fa-angle-right");
  
  lightboxContent.appendChild(previousArrow);
  lightboxContent.appendChild(mediaBox);
  lightboxContent.appendChild(closeButton);
  lightboxContent.appendChild(nextArrow);

  lightbox.appendChild(lightboxContent);
  document.body.appendChild(lightbox);
};

let currentIndex = 0;

// Ouvre la lightbox et affiche le contenu correspondant
function openLightBox(event) {
  event.preventDefault(); 

  if (event.target.classList.contains("media-heart")) {
    return;
  };

  // Récupère les données du média sélectionné
  const clickedMedia = event.target.closest(".media-photograph");
  currentIndex = photographerMedia.findIndex(media => media.id === parseInt(clickedMedia.getAttribute("data-media-id")));
  const selectedMedia = photographerMedia[currentIndex];

  const lightbox = document.querySelector(".lightbox");

  lightboxNavEvents ();

  updateLightBox(currentIndex);
  
  // Ouvre la lightbox
  lightbox.showModal();
};

function closeLightbox () {
  const closeButton = document.createElement("i");
  closeButton.classList.add("close-button", "fas", "fa-times");

  closeButton.addEventListener("click", () => {
    const lightbox = document.querySelector(".lightbox");
    lightbox.close();
  });

  return closeButton;

}

// Crée les éléments HTML pour la lightbox en utilisant mediaFactory
function createLightboxContent(selectedMedia) {
  const lightboxImage = document.createElement("img");
  const lightboxVideo = document.createElement("video");
  const lightboxTitle = document.createElement("p");

  lightboxImage.classList.add("lightbox-img");
  lightboxVideo.classList.add("lightbox-video");
  lightboxTitle.classList.add("lightbox-title");
  lightboxTitle.textContent = selectedMedia.title;

  const mediaBox = document.querySelector(".media-box");
  mediaBox.textContent = "";

  if (selectedMedia.image) {
    lightboxImage.setAttribute("src", `assets/photographers/${selectedMedia.photographerId}/${selectedMedia.image}`);
    lightboxImage.setAttribute("alt", selectedMedia.title);
    mediaBox.appendChild(lightboxImage);
  } else if (selectedMedia.video) {
    lightboxVideo.setAttribute("src", `assets/photographers/${selectedMedia.photographerId}/${selectedMedia.video}`);
    lightboxVideo.setAttribute("aria-label", selectedMedia.title);
    lightboxVideo.controls = true;
    lightboxVideo.setAttribute("preload", "metadata");
    mediaBox.appendChild(lightboxVideo);
  };

  mediaBox.appendChild(lightboxTitle);
}

// Ecoute les évènements sur les flèches de la lightbox
function lightboxNavEvents() {
  const previousArrow = document.querySelector(".previous-arrow");
  const nextArrow = document.querySelector(".next-arrow");

  previousArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + photographerMedia.length) % photographerMedia.length;
    updateLightBox(currentIndex);
  });

  nextArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % photographerMedia.length;
    updateLightBox(currentIndex);
  });
};

// Met à jour la lightbox pour afficher un nouveau media
function updateLightBox(currentIndex) {
  const selectedMedia = photographerMedia[currentIndex];

  createLightboxContent(selectedMedia);

  const mediaBox = document.querySelector(".media-box");
  mediaBox.textContent = "";
  const newMediaElement = mediaFactory(selectedMedia, true);
  mediaBox.appendChild(newMediaElement);

  const previousArrow = document.querySelector(".previous-arrow");
  const nextArrow = document.querySelector(".next-arrow");

  // Affiche ou masque les boutons "prev" et "next" en fonction de l'index
  if (currentIndex === 0) {
    previousArrow.style.display = "none";
  } else {
    previousArrow.style.display = "block";
  };

  if (currentIndex === photographerMedia.length - 1) {
    nextArrow.style.display = "none";
  } else {
    nextArrow.style.display = "block";
  };
};

function keybordNavigation(event) {
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox.open) {
    return;
  };

  if (event.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + photographerMedia.length) % photographerMedia.length;
    updateLightBox(currentIndex);
  } else if (event.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % photographerMedia.length;
    updateLightBox(currentIndex);
  } else if (event.key === "Escape") {
    lightbox.close();
  };
};

document.addEventListener("keydown", (event) => {
  keybordNavigation(event);
});

// Initialise pour charger et afficher les données
async function init() {
  const data = await getData("../../data/photographers.json");
  const { photographers, media} = data;

  createLightBox();

  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get("id"));

  const photographer = findPhotographerById(photographerId, photographers);
  photographerMedia = getMediaByPhotographerId(photographerId, media);

  displayHeader(photographer);
  displayMedia(photographerId, photographerMedia);
  displayTotalLikesAndPrice(photographerMedia, photographer);
  
  sortMedia("popularity");

  const sortSelect = document.querySelector("#sort-select");
  sortSelect.addEventListener("change", (event) => {
    sortMedia(event.target.value);
    updateDisplayMedia(photographerId);
  });
};

init();
