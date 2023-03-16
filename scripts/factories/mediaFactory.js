function mediaFactory(data) {
    // Extrait les propriétés choisies des données des medias
    const { title, image, video, likes, date, price, photographerId } = data;

    // Chemin d'accès aux images et videos
    const picturePath = `assets/photographers/${photographerId}/${image}`;
    const videoPath = `assets/photographers/${photographerId}/${video}`;

    // Crée les éléments HTML
    const div = document.createElement("div");
    div.classList.add("media-photograph");

    if (image) {
      const img = document.createElement("img");
      // Configure les propriétés des éléments HTML
      img.setAttribute("src", picturePath);
      img.setAttribute("alt", title);
      // Ajoute les éléments HTML à la "div" media-photograph
      div.appendChild(img);
    } else if (video) {
        const videoElement = document.createElement("video");
        // Configure les propriétés des éléments HTML
        videoElement.setAttribute("src", videoPath);
        videoElement.setAttribute("aria-label", title);
        // Ajoute les éléments HTML à la "div" media-photograph
        div.appendChild(videoElement);
    }
    
    const mediaInfos = document.createElement("div");
    mediaInfos.classList.add("media-infos");
    const mediaTitle = document.createElement("p1");
    const mediaLikes = document.createElement("p2");
    const mediaHeart = document.createElement("i");

    mediaTitle.textContent = title;
    mediaLikes.textContent = likes;
    mediaHeart.classList.add("fas", "fa-heart");

    mediaInfos.appendChild(mediaTitle);
    mediaInfos.appendChild(mediaLikes);
    mediaInfos.appendChild(mediaHeart);

    div.appendChild(mediaInfos);

    // Retourner l'élément "div" construit
    return div;
  }
  
export { mediaFactory };
  