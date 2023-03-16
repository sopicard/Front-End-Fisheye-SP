// Crée des objets de photographe
function photographerFactory(data) {
    // Extrait les propriétés choisies des données des photographes
    const { name, id, portrait, city, country, tagline, price } = data;

    // Chemin d'accès à l'img du photographe
    const picture = `assets/photographers/photographersProfile/${portrait}`;

    // Crée la carte pour le photographe
    function getUserCardDOM() {

        // Crée les éléments HTML pour chaque carte
        const a = document.createElement("a");
        const article = document.createElement("article");
        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const location = document.createElement("p1");
        const taglineElement = document.createElement("p2");
        const priceElement = document.createElement("p3");

        // Configure les propriétés des éléments HTML
        a.setAttribute("href", `../../photographer.html?id=${id}`);
        a.setAttribute("aria-label", `Voir la page de ${name}`);
        
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
        // Crée une div pour contenir les informations du photographe
        const div = document.createElement("div");
        div.classList.add("infosDiv");
        // Crée les éléments HTML pour afficher les informations du photographe
        const h2 = document.createElement("h2");
        const location = document.createElement("p1");
        const taglineElement = document.createElement("p2");
        const img = document.createElement("img");

        // Configure les propriétés des éléments HTML avec les données du photographe
        h2.textContent = name;
        location.textContent = `${city}, ${country}`;
        taglineElement.textContent = tagline;

        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);

        // Ajoute les éléments HTML à la div des informations
        div.appendChild(h2);
        div.appendChild(location);
        div.appendChild(taglineElement);

        // Retourne un objet contenant la div des informations et l'image du photographe
        return { div, img };

    }

    // Retourne un objet contenant les propriétés du photographe
    //  et les fonctions qui crée la carte et l'en-tête du photographe
    return { name, picture, city, country, tagline, price, getUserCardDOM, getPhotographerHeaderDOM}
}

export { photographerFactory };
