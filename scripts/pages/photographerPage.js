// Récupère l'URL de la page concernée
const urlParams = new URLSearchParams(window.location.search);

// Récupère la valeur de l'id dans l'URL
const id = urlParams.get("id");

// Affiche l'id dans la console
console.log(id);
