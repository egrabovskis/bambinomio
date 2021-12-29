
function galleryNext(n, product) {
  // show next element for simple gallery
  galleryCounters.set(product, galleryCounters.get(product) + n);
  galleryShow(galleryCounters.get(product), product);
}

function galleryShow(n, product) {
  // show the chosen element for simple gallery
  slideClass = product + "Slides"; // slide class is product id + "Slides"
  let x = document.getElementsByClassName(slideClass);
  if (n > x.length) {
    galleryCounters.set(product, 1);
    n = 1;
  }
  if (n < 1) {
    galleryCounters.set(product, x.length);
    n = x.length;
  };

  let i;
  for (i = 0; i < x.length; i++) {  // hide all elements
    x[i].style.display = "none";
  }
  x[n - 1].style.display = "block"; // show the selected element 

  // navigations dots (w3-badges)
  var dots = document.getElementsByClassName("dots-" + product);
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  dots[n - 1].className += " w3-white";
}

function generateGallery2(idBigPicture, idListThumbmails, idListThumbmailsSmall, idSizes, idBasketButton, data) {
  let bigPic = document.getElementById(idBigPicture);
  if (!bigPic) return;   // by first call of functiona data are not loaded yet

  // thumbnails for big screen
  let thumbnails = document.getElementById(idListThumbmails);
  thumbnails.innerHTML = "<p>Lai izvēlētos krāsu, izvēlēties atbilstošo attēlu</p>";
  for (let i = 0; i < data.colors.length; i++) {
    let div = document.createElement("div");
    div.className = "w3-quarter";
    let img = document.createElement("img");
    img.className = "w3-opacity w3-hover-opacity-off w3-round";
    img.src = data.colors[i].img;
    img.style.width = "100%";
    img.style.cursor = "pointer;"
    img.onclick = function () { showGalleryImage2(i, idBigPicture, idSizes, idBasketButton, data); };

    div.appendChild(img);
    thumbnails.appendChild(div);
  }

  // thumbnails for small and medium screen
  let thumbnailsSmall = document.getElementById(idListThumbmailsSmall);
  thumbnailsSmall.innerHTML = "Lai izvēlētos krāsu, izvēlēties atbilstošo attēlu";
  for (let i = 0; i < data.colors.length; i++) {
    let img = document.createElement("img");
    img.className = "w3-opacity w3-hover-opacity-off w3-round w3-margin";
    img.src = data.colors[i].img;
    img.style.width = "25%";
    img.style.cursor = "pointer;"
    img.onclick = function () { showGalleryImage2(i, idBigPicture, idSizes, idBasketButton, data); };

    thumbnailsSmall.appendChild(img);
  }
  showGalleryImage2(0, idBigPicture, idSizes, idBasketButton, data);  // show first picture
}

function showGalleryImage2(n, idBigPicture, idSizes, idBasketButton, data) {
  let bigPic = document.getElementById(idBigPicture);
  bigPic.innerHTML = "";
  let img = document.createElement("img");
  img.src = data.colors[n].img;
  img.style.width = "100%";
  bigPic.appendChild(img);

  // add sizes
  let sizes = document.getElementById(idSizes);
  sizes.innerHTML = "";
  if (data.colors[n].sizes.indexOf("S") !== -1) {
    let sizeS = document.createElement("option");
    sizeS.value = sizeS.text = "mazas (S) - 5-7kg";
    sizes.appendChild(sizeS);
  }
  if (data.colors[n].sizes.indexOf("M") !== -1) {
    let sizeM = document.createElement("option");
    sizeM.value = sizeM.text = "vidējas (M)- 7-9kg";
    sizes.appendChild(sizeM);
  }
  if (data.colors[n].sizes.indexOf("L") !== -1) {
    let sizeL = document.createElement("option");
    sizeL.value = sizeL.text = "lielas (L) - 9-12 kg";
    sizes.appendChild(sizeL);
  }
  if (data.colors[n].sizes.indexOf("XL") !== -1) {
    let sizeXL = document.createElement("option");
    sizeXL.value = sizeXL.text = "ļoti lielas (XL) - 12-15 kg";
    sizes.appendChild(sizeXL);
  }
  if (data.colors[n].sizes.indexOf("small") !== -1) {
    let sizesmall = document.createElement("option");
    sizesmall.value = sizesmall.text = "līdz 9kg (līdz 6mēnešiem)";
    sizes.appendChild(sizesmall);
  }
  if (data.colors[n].sizes.indexOf("big") !== -1) {
    let sizebig = document.createElement("option");
    sizebig.value = sizebig.text = "no 9kg (no 6mēnešiem)";
    sizes.appendChild(sizebig);
  }
  if (data.colors[n].sizes.indexOf("onesize") !== -1) {
    let sizeonesize = document.createElement("option");
    sizeonesize.value = sizeonesize.text = "viena izmēra";
    sizes.appendChild(sizeonesize);
  }

  // modify basket button
  let basketButton = document.getElementById(idBasketButton);
  basketButton.onclick = function () {
    addToBasket(
      data.id,
      data.colors[n].img,
      data.name + " " + data.colors[n].name + " " + sizes.value,
      data.price);
  };

}
