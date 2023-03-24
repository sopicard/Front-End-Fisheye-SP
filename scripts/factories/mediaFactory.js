// Crée les médias des photographies
function mediaFactory(data) {
  const { title, image, video, likes, date, price, photographerId } = data;

  const picturePath = `assets/photographers/${photographerId}/${image}`;
  const videoPath = `assets/photographers/${photographerId}/${video}`;

  const div = document.createElement("div");                                                                                    
  div.classList.add("media-photograph");

  // Ajoute l'image ou la vidéo en fonction du type de média
  if (image) {
    const img = document.createElement("img");
    img.setAttribute("src", picturePath);
    img.setAttribute("alt", title);
    div.appendChild(img);
  } else if (video) {
      const videoElement = document.createElement("video");
      videoElement.setAttribute("src", videoPath);
      videoElement.setAttribute("aria-label", title);
      div.appendChild(videoElement);
  };
  
  const mediaInfos = document.createElement("div");
  mediaInfos.classList.add("media-infos");
  const mediaTitle = document.createElement("p1");
  const mediaLikes = document.createElement("p2");
  const mediaHeart = document.createElement("i");

  mediaTitle.textContent = title;
  mediaLikes.textContent = likes;
  mediaHeart.classList.add("fas", "fa-heart");
  mediaHeart.setAttribute("data-is-liked", false);
  mediaHeart.setAttribute("id", `media-heart-${data.id}`);


  div.appendChild(mediaInfos);
  mediaInfos.appendChild(mediaTitle);
  mediaInfos.appendChild(mediaLikes);
  mediaInfos.appendChild(mediaHeart);

  // Retourne l'élément "div" construit
  return div;
};
  
export { mediaFactory };
  