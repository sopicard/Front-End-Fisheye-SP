import { photographerFactory } from "../factories/photographerFactory.js";
import { mediaFactory } from "../factories/mediaFactory.js";

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

// Récupère médias correspondants à l'ID du photographe
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
function updateLikeCount(mediaHeartId, mediaLikes) {
  const mediaHeart = document.querySelector(`#${mediaHeartId}`);
  const isLiked = mediaHeart.getAttribute("data-is-liked") === "true";

  if(!isLiked) {
    const currentLikes = parseInt(mediaLikes.textContent);
    const newLikes = currentLikes + 1;
    mediaLikes.textContent = newLikes;

    mediaHeart.setAttribute("data-is-liked", true);
    mediaHeart.classList.add("liked");

    const mediaLikedEvent = new CustomEvent("mediaLiked");
    document.dispatchEvent(mediaLikedEvent);

    const totalLikesElement = document.querySelector(".total-container p");
    const totalLikesHeart = totalLikesElement.querySelector(".total-container i");
    const isTotalLiked = totalLikesHeart.getAttribute("data-is-liked") === "true";
    if (!isTotalLiked) {
      totalLikesHeart.setAttribute("data-is-liked", true);
      totalLikesHeart.classList.add("liked");
    }
  };
};

// Met à jour le nombre total de likes pour tous les médias
function updateTotalLikes() {
  const totalLikesElement = document.querySelector(".total-container p");
  const currentTotalLikes = parseInt(totalLikesElement.textContent);
  const newTotalLikes = currentTotalLikes + 1;
  totalLikesElement.textContent = `${newTotalLikes}`;
}

document.addEventListener("mediaLiked", updateTotalLikes);

// Crée et ajoute les éléments HTML des médias triés correspondants à l'id du photographe
function addMediaToContainer(photographerId, photographerMedia, mediaContainer) {
  photographerMedia.forEach(media => {
    media.photographerId = photographerId;
    const mediaElement = mediaFactory(media);
    const mediaHeart = mediaElement.querySelector(".fa-heart");
    const mediaLikes = mediaElement.querySelector(".media-infos p2");
    mediaContainer.appendChild(mediaElement);

    mediaHeart.addEventListener("click", () => {
      updateLikeCount(`media-heart-${media.id}`, mediaLikes);  
    });
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
  totalLikesElement.textContent = `${totalLikes}`;
  heartIcon.classList.add("fas", "fa-heart");
  pricePerDayElement.textContent = `${pricePerDay}€/jour`;

  const mainPart = document.querySelector("main");
  mainPart.appendChild(totalContainer);
  totalContainer.appendChild(totalLikesElement);
  totalContainer.appendChild(heartIcon);
  totalContainer.appendChild(pricePerDayElement);
};

// Initialisation pour charger et afficher les données
async function init() {
  const data = await getData("../../data/photographers.json");
  const { photographers, media} = data;

  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get("id"));

  const photographer = findPhotographerById(photographerId, photographers);
  photographerMedia = getMediaByPhotographerId(photographerId, media);

  sortMedia("popularity");

  displayHeader(photographer);
  displayMedia(photographerId, photographerMedia);
  displayTotalLikesAndPrice(photographerMedia, photographer);

  const sortSelect = document.querySelector("#sort-select");
  sortSelect.addEventListener("change", (event) => {
    sortMedia(event.target.value);
    updateDisplayMedia(photographerId);
  });
};

init();
