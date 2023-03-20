import { photographerFactory } from "../factories/photographerFactory.js";
import { mediaFactory } from '../factories/mediaFactory.js';

let photographerMedia = [];

// Récupère données photographes et médias à partir du fichier JSON
async function getData(file) {
  const response = await fetch(file);
  const data = await response.json(); 
  return data;
};

// Cherche photographe dans le tableau à partir de son ID
const findPhotographerById = (id, photographers) => {
  const photographer = photographers.find((photographer) => photographer.id === id);
  return photographer;
};

// Récupère médias correspondants à ID photographe
const getMediaByPhotographerId = (id, media) => {
  const mediaByPhotographer = media.filter((media) => media.photographerId === id);
  return mediaByPhotographer;
};

async function displayHeader(photographer) {
  // Crée les éléments HTML pour le photographe
  const photographerElement = photographerFactory(photographer);

  // Insère le header du photographe
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerHeaderDOM = photographerElement.getPhotographerHeaderDOM();
  const { div, img } = photographerHeaderDOM;

  const contactButton = document.querySelector(".contact_button");

  // Insère les informations du photographe avant le bouton
  photographerHeader.insertBefore(div, contactButton);

  // Insère la photo du photographe après le bouton
  photographerHeader.insertBefore(img, contactButton.nextSibling);
};

// Affiche les données des médias sur la page
async function displayMedia(photographerId, photographerMedia) {
  // Crée un conteneur pour les médias du photographe
  const mediaContainer = document.createElement("div");
  mediaContainer.classList.add ("media-container");
  const mainPart = document.querySelector("main");
  mainPart.appendChild(mediaContainer);

  // Crée les éléments HTML pour les médias du photographe et les ajoute au container
  photographerMedia.forEach(media => {
    media.photographerId = photographerId;
    const mediaElement = mediaFactory(media);
    mediaContainer.appendChild(mediaElement);
  });
};

async function init() {
  // Attend la récupération des données du fichier JSON
  const data = await getData("../../data/photographers.json");
  const { photographers, media} = data;

  // Récupère l'ID du photographe depuis l'URL de la page
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get("id"));

  // Trouve le photographe et ses médias correspondants
  const photographer = findPhotographerById(photographerId, photographers);
  const photographerMedia = getMediaByPhotographerId(photographerId, media);

  // Affiche les données du photographe
  displayHeader(photographer);
  displayMedia(photographerId, photographerMedia);
};

init();
