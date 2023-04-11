// Récupère l'élément modale de contact 
const contactModal = document.querySelector("#contact_modal");

function displayModal() {
    contactModal.showModal();
} 

function closeModal() {
    contactModal.close();
}

// Ajoute un écouteur sur le bouton "Contactez-moi"
const contactButton = document.querySelector(".contact_button");
contactButton.addEventListener("click", displayModal);

// Ajoute un écouteur pour supprimer l'évènement
const modalCloseButton = document.querySelector(".modal_close_button");
modalCloseButton.addEventListener("click", closeModal);

const contactForm = document.querySelector(".contact_form");
let formSubmitted = false;

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Récupère les valeurs des champs des formulaires
    const firstName = document.querySelector("#firstName").value;
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    // Affiche les données récupérées dans la console
    console.log("Prénom:", firstName);
    console.log("Nom:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    formSubmitted = true;
});

// Réinitialise le form et ferme la modale
function submitAndResetForm() {
    if (formSubmitted) {
        contactForm.reset();
        closeModal();
    }
}

// Ajoute un écouteur sur la soumission du formulaire
contactForm.addEventListener("submit", submitAndResetForm);