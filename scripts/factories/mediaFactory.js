// Crée les médias des photographies
function mediaFactory(data, forLightbox = false) {

  // Récupère les données nécessaires depuis l'objet data
  const { title, image, video, likes, photographerId } = data;

  const picturePath = `assets/photographers/${photographerId}/${image}`;
  const videoPath = `assets/photographers/${photographerId}/${video}`;

  // Crée un élémnet <article> pour chaque média
  const article = document.createElement("article");
  article.setAttribute("data-media-id", data.id);
  
  if (forLightbox) {
    article.classList.add("lightbox-media");
  } else {
    article.classList.add("media-photograph");
  }
  
  // Ajoute l'image ou la vidéo en fonction du type de média
  if (image) {
    const imgContainer = document.createElement("div"); 

    // Ajoute une classe CSS pour le style de l'image selon le contex
    if (forLightbox) {
      imgContainer.classList.add("lightbox-img");
    } else {
      imgContainer.classList.add("media-photograph-img");
    }

    // Crée un élément <img> pour afficher l'image
    const img = document.createElement("img");
    img.setAttribute("src", picturePath);
    img.setAttribute("alt", title);
    imgContainer.appendChild(img);
    article.appendChild(imgContainer); 

  } else if (video) {
    const videoContainer = document.createElement("div");
    if (forLightbox) {
      videoContainer.classList.add("lightbox-video");
    } else {
      videoContainer.classList.add("media-photograph-video");
    }
    const videoElement = document.createElement("video");
    videoElement.setAttribute("src", videoPath);
    videoElement.setAttribute("aria-label", title);
    videoElement.controls = true;
    videoContainer.appendChild(videoElement);
    article.appendChild(videoContainer);
  }

  // Ajoute les informations du media
  if (!forLightbox) { 
    const aInfos = document.createElement("a");
    aInfos.classList.add("a_infos");
    const mediaInfos = document.createElement("div");
    mediaInfos.classList.add("media-infos");
    const mediaTitle = document.createElement("h3");
    mediaTitle.classList.add("media-title");
    const mediaLikes = document.createElement("p");
    mediaLikes.classList.add("media-likes");
    const mediaHeart = document.createElement("button");
    mediaHeart.classList.add("media-heart", "fas", "fa-heart", "focus-line-orange");

    aInfos.setAttribute("href", "#");
    aInfos.setAttribute("aria-label", `Zoom sur ${title}`);
    mediaTitle.textContent = title;
    mediaTitle.setAttribute = ("lang", "en");

    mediaLikes.textContent = likes;
    mediaLikes.setAttribute("aria-label", `${likes} likes`);
    mediaLikes.setAttribute("aria-live", "polite");
    mediaLikes.setAttribute("role", "status");

    mediaHeart.setAttribute("data-is-liked", false);
    mediaHeart.setAttribute("type", "button");
    mediaHeart.setAttribute("aria-label", "Cliquez pour indiquer que vous aimez ce média");
  
    aInfos.appendChild(mediaInfos);
    mediaInfos.appendChild(mediaTitle);
    mediaInfos.appendChild(mediaLikes);
    
    article.appendChild(aInfos);
    article.appendChild(mediaHeart);
  }  
  
  // Retourne l'élément "article" construit
  return article;
}
  
export { mediaFactory };