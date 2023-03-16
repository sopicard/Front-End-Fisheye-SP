import { photographerFactory } from "../factories/photographerFactory.js";

// Récupère les données des photographes à partir du fichier JSON
async function getPhotographers() {
    // Requête + attente réponse
    const response = await fetch('../../data/photographers.json');
    // Transforme la réponse en données JSON
    const data = await response.json();
    // Récupère le tableau des photographes dans les données
    const photographers = data.photographers;

    // Retourne le tableau des photographes
    return photographers;
}

//Affiche la carte de chaque photographe
async function displayData() {
    // Attend que la promesse retournée par getPhotographers soit résolue
    const photographers = await getPhotographers();

    const photographersSection = document.querySelector(".photographer_section");

    // Crée une carte pour chaque photographe
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// Initialise l'application en affichant les données des photographes
async function init() {
    await displayData();
}

// Appelle la fonction init pour démarrer l'application
init();
    