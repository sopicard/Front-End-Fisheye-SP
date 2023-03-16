import { photographerFactory } from "../factories/photographerFactory.js";

// Récupère les données des photographes à partir du fichier JSON
async function getPhotographers() {
    // Envoie une requête et attend la réponse
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
    // Attend la récupération du tableau des photographes
    const photographers = await getPhotographers();

    const photographersSection = document.querySelector(".photographer_section");

    // Crée et ajoute une carte pour chaque photographe
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// Initialise l'application en affichant les cartes des photographes
async function init() {
    await displayData();
}

// Démarre l'application en appelant la fonction init
init();
    