// Crée les médias des photographies
function mediaFactory(data, forLightbox = false) {

  // Récupère les données nécessaires depuis l'objet data
  const { title, image, video, likes, photographerId } = data;

  const picturePath = `assets/photographers/${photographerId}/${image}`;
  const videoPath = `assets/photographers/${photographerId}/${video}`;

  // Crée un lien <a> pour chaque média
  const a = document.createElement("a");
  a.setAttribute("href", "#");
  a.setAttribute("aria-label", `Link to ${title}`);
  a.setAttribute("data-media-id", data.id);
  if (forLightbox) {
    a.classList.add("lightbox-media");
  } else {
    a.classList.add("media-photograph");
    a.classList.add("focus-line-orange");
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
    a.appendChild(imgContainer); 

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
    a.appendChild(videoContainer);
  }

  // Ajoute les informations du media
  if (!forLightbox) { 
    const mediaInfos = document.createElement("div");
    mediaInfos.classList.add("media-infos");
    const mediaTitle = document.createElement("h3");
    mediaTitle.classList.add("media-title");
    const mediaLikes = document.createElement("p");
    mediaLikes.classList.add("media-likes");
    const mediaHeart = document.createElement("span");
    mediaHeart.classList.add("media-heart");
    mediaHeart.classList.add("focus-line-orange");

    mediaTitle.textContent = title;
    mediaTitle.setAttribute = ("lang", "en");

    mediaLikes.textContent = likes;
    mediaLikes.setAttribute("aria-label", `${likes} likes`);
    mediaLikes.setAttribute("aria-live", "polite");
    mediaLikes.setAttribute("role", "status");

    mediaHeart.classList.add("media-heart", "fas", "fa-heart");
    mediaHeart.setAttribute("data-is-liked", false);
    mediaHeart.setAttribute("tabindex", "0");
    mediaHeart.setAttribute("aria-label", "Click to like this media");
    mediaHeart.setAttribute("role", "button");
  
    a.appendChild(mediaInfos);
    mediaInfos.appendChild(mediaTitle);
    mediaInfos.appendChild(mediaLikes);
    mediaInfos.appendChild(mediaHeart);
  }  
  
  // Retourne l'élément "a" construit
  return a;
}
  
export { mediaFactory };