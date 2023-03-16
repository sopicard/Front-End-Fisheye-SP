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

// Cherche le photographe dans le tableau à partir de son ID en utilisant méthode find()
const findPhotographerById = (id, photographers) => {
  const photographer = photographers.find((photographer) => photographer.id === id);
  return photographer;
};

// Récupère les médias correspondant à l'ID du photographe dans l'URL
const getMediasByPhotographerId = (id, medias) => {
  const mediasByPhotographer = medias.filter((media) => media.photographerId === id);
  return mediasByPhotographer;
};

// Affiche les données du photographe sur la page
async function displayPhotographerData(id) {
  // Attend que la promesse retournée par getData soit résolue
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

  // Crée les éléments HTML pour les médias du photographe
  photographerMedias.forEach(media => {
    const mediaElement = mediaFactory(media);
    // => mettre le mediaElement créé à la page HTML
  });

  // => mettre le photographerElement créé à la page HTML
}

// Affiche les données du photographe
displayPhotographerData(id);
