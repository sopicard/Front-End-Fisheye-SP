// Crée des objets de photographe
function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/photographersProfile/${portrait}`;

    // Crée la carte pour le photographe
    function getUserCardDOM() {
        const a = document.createElement("a");
        a.classList.add("focus-line-orange");
        const article = document.createElement("article");
        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const location = document.createElement("h3");
        location.classList.add("location");
        const taglineElement = document.createElement("h4");
        taglineElement.classList.add("tagline");
        const priceElement = document.createElement("p");
        priceElement.classList.add("price-p");

        a.setAttribute("href", `../../photographer.html?id=${id}`);
        a.setAttribute("aria-label", `Consulter la page de ${name}`); 
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);
        h2.textContent = name;
        location.textContent = `${city}, ${country}`;
        taglineElement.textContent = tagline;
        priceElement.textContent =  `${price}€/jour`;

        // Ajoute les éléments HTML à l'élément "article" contenu dans le lien "a"
        a.appendChild(article);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);
        
        // Retourne l'élément "a" contenant la carte
        return a;
    }

    // Crée une div contenant les informations du photographe
    function getPhotographerHeaderDOM() {
        const div = document.createElement("div");
        div.classList.add("infosDiv");
        const h2 = document.createElement("h2");
        const location = document.createElement("h3");
        location.classList.add("location");
        const taglineElement = document.createElement("h4");
        taglineElement.classList.add("tagline");
        const img = document.createElement("img");

        h2.textContent = name;
        location.textContent = `${city}, ${country}`;
        taglineElement.textContent = tagline;
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);

        div.appendChild(h2);
        div.appendChild(location);
        div.appendChild(taglineElement);

        // Retourne un objet contenant la div des informations et l'image du photographe
        return { div, img };

    }

    // Retourne un objet contenant les propriétés du photographe
    //  et les fonctions qui crée la carte et le header du photographe
    return { name, picture, city, country, tagline, price, getUserCardDOM, getPhotographerHeaderDOM};
}

export { photographerFactory };
