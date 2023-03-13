// Crée des objets de photographe
function photographerFactory(data) {
    // Découpe les données des photographes pour obtenir les propriétés choisies
    const { name, portrait, city, country, tagline, price } = data;

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
        a.setAttribute("href", "../../photographer.html");
        a.setAttribute("aria-label", `Voir la page de ${name}`);
        
        img.setAttribute("src", picture)
        img.setAttribute("alt", `Portrait de ${name}`);

        h2.textContent = name;
        location.textContent = `${city}, ${country}`;
        taglineElement.textContent = tagline;
        priceElement.textContent =  `${price}€/jour`;

        // Ajoute les éléments HTML à l'élément "article" contenu dans le lien "a"
        a.appendChild(article)
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);
        
        // Retourne l'élément "a" avec la carte
        return a;
    }

    // Retourne un objet contenant les propriétés du photographe
    //  et la fonction qui crée la carte du photographe
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}