// Crée les médias des photographies
function mediaFactory(data, forLightbox = false) {
  const { title, image, video, likes, date, price, photographerId } = data;

  const picturePath = `assets/photographers/${photographerId}/${image}`;
  const videoPath = `assets/photographers/${photographerId}/${video}`;

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
    const img = document.createElement("img");
    img.setAttribute("src", picturePath);
    img.setAttribute("alt", title);
    if (forLightbox) {
      img.classList.add("lightbox-img");
    } else {
      img.classList.add("media-photograph-img");
    }
    a.appendChild(img);

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
      a.appendChild(videoElement);
  };

  if (!forLightbox) { 
  const mediaInfos = document.createElement("div");
  mediaInfos.classList.add("media-infos");
  const mediaTitle = document.createElement("h3");
  mediaTitle.classList.add("media-title");
  const mediaLikes = document.createElement("p");
  mediaLikes.classList.add("media-likes");
  const mediaHeart = document.createElement("i");
  mediaHeart.classList.add("media-heart");
  mediaHeart.classList.add("focus-line-orange");

  mediaTitle.textContent = title;

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
};
  
export { mediaFactory };
  