import { photographerFactory } from "../factories/photographerFactory.js";

// Récupère les données des photographes à partir du fichier JSON
async function getPhotographers() {
    const response = await fetch('../../data/photographers.json');
    const data = await response.json();
    const photographers = data.photographers;

    return photographers;
};

// Affiche la carte de chaque photographe
function displayData(photographers) {
   const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

// Initialise l'application en affichant les cartes des photographes
async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);
};

// Démarre l'application en appelant la fonction init
init();
    