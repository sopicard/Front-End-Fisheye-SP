// Crée les médias des photographies
function mediaFactory(data, forLightbox = false) {
  const { title, image, video, likes, date, price, photographerId } = data;

  const picturePath = `assets/photographers/${photographerId}/${image}`;
  const videoPath = `assets/photographers/${photographerId}/${video}`;

  const div = document.createElement("div");  
  div.setAttribute("data-media-id", data.id);
  if (forLightbox) {
    div.classList.add("lightbox-media");
  } else {
    div.classList.add("media-photograph");
  }
  
  // Ajoute l'image ou la vidéo en fonction du type de média
  if (image) {
    const img = document.createElement("img");
    img.setAttribute("src", picturePath);
    img.setAttribute("alt", title);
    if (forLightbox) {
      img.classList.add("lightbox-img");
    } else {
      img.classList.add("media-photograph-img");
    }
    div.appendChild(img);

  } else if (video) {
      const videoElement = document.createElement("video");
      videoElement.setAttribute("src", videoPath);
      videoElement.setAttribute("aria-label", title);
      videoElement.controls = true;
      if (forLightbox) {
        videoElement.classList.add("lightbox-video");
      } else {
        videoElement.classList.add("media-photograph-video");
      }
      div.appendChild(videoElement);
  };

  if (!forLightbox) { 
  const mediaInfos = document.createElement("div");
  mediaInfos.classList.add("media-infos");
  const mediaTitle = document.createElement("p");
  mediaTitle.classList.add("media-title");
  const mediaLikes = document.createElement("p");
  mediaLikes.classList.add("media-likes");
  const mediaHeart = document.createElement("i");
  mediaHeart.classList.add("media-heart");

  mediaTitle.textContent = title;
  mediaLikes.textContent = likes;
  mediaLikes.setAttribute("aria-label", "likes")
  mediaHeart.classList.add("media-heart", "fas", "fa-heart");
  mediaHeart.setAttribute("data-is-liked", false);
  
  div.appendChild(mediaInfos);
  mediaInfos.appendChild(mediaTitle);
  mediaInfos.appendChild(mediaLikes);
  mediaInfos.appendChild(mediaHeart);
  } 
  
  // Retourne l'élément "div" construit
  return div;
};
  
export { mediaFactory };
  