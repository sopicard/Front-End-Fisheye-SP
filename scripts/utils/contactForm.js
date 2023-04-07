const contactModal = document.querySelector("#contact_modal");

function displayModal() {
    contactModal.showModal();
} 

function closeModal() {
    contactModal.close();
}

const contactButton = document.querySelector(".contact_button");
contactButton.addEventListener("click", displayModal);

const modalCloseButton = document.querySelector(".modal-close-button");
modalCloseButton.addEventListener("click", closeModal);

const contactForm = document.querySelector(".contact_form");
let formSubmitted = false;

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = document.querySelector("#firstName").value;
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    console.log("Prénom:", firstName);
    console.log("Nom:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    formSubmitted = true;
});

function applySuccessStyle() {
    if (formSubmitted) {
        const contactFormElements = document.querySelectorAll("input, textarea, select")
        contactFormElements.forEach((element) => {
            element.classList.add("success");
        });
    }
};

contactForm.addEventListener("submit", applySuccessStyle);