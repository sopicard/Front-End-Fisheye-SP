import { photographerFactory } from "../factories/photographerFactory.js"
import { mediaFactory } from '../factories/mediaFactory.js';

// Récupère les données des photographes et des médias à partir du fichier JSON
async function getData(file) {
  const response = await fetch(file);
  const data = await response.json();
  return data;
}

// Récupère l'ID du photographe depuis l'URL de la page
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get("id"));

// Cherche le photographe dans le tableau à partir de son ID
const findPhotographerById = (id, photographers) => {
  const photographer = photographers.find((photographer) => photographer.id === id);
  return photographer;
};

// Récupère les médias correspondant à l'ID du photographe
const getMediasByPhotographerId = (id, medias) => {
  const mediasByPhotographer = medias.filter((media) => media.photographerId === id);
  return mediasByPhotographer;
};

// Affiche les données du photographe sur la page
async function displayPhotographerData(id) {
  // Attend la récupération des données du fichier JSON
  const data = await getData("../../data/photographers.json");
  console.log("Data:", data);
  const photographers = data.photographers;
  const medias = data.media;

  // Trouve le photographe et ses médias correspondants
  const photographer = findPhotographerById(id, photographers);
  console.log('Photographer:', photographer);
  const photographerMedias = getMediasByPhotographerId(id, medias);
  console.log('Photographer Medias:', photographerMedias);

  // Crée les éléments HTML pour le photographe
  const photographerElement = photographerFactory(photographer);

  // Insère le header du photographe
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerHeaderDOM = photographerElement.getPhotographerHeaderDOM();
  const { div, img} = photographerHeaderDOM;

  const contactButton = document.querySelector(".contact_button")

  // Insère les informations du photographe avant le bouton
  photographerHeader.insertBefore(div, contactButton);

  // Insère la photo du photographe après le bouton
  photographerHeader.insertBefore(img, contactButton.nextSibling);

  // Crée un conteneur pour les médias du photographe
  const mediaContainer = document.createElement("div");
  mediaContainer.classList.add ("media-container");
  const mainPart = document.querySelector("main");
  mainPart.appendChild(mediaContainer);

  // Crée les éléments HTML pour les médias du photographe et les ajoute au container
  photographerMedias.forEach(media => {
    media.photographerId = id;
    const mediaElement = mediaFactory(media);
    mediaContainer.appendChild(mediaElement);
  });
}

// Affiche les données du photographe
displayPhotographerData(id);
