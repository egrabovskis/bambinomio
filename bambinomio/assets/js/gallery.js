
function nextElement(n, product) {
  galeryCounters.set(product, galeryCounters.get(product) + n);
  showElement(galeryCounters.get(product), product);
}

function showElement(n, product) {

  // show the right element
  slideClass = product + "Slides"; // slide class is product id + "Slides"
  let x = document.getElementsByClassName(slideClass);
  if (n > x.length) {
    galeryCounters.set(product, 1);
    n = 1;
  }
  if (n < 1) {
    galeryCounters.set(product, x.length);
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

function generateGallery2(idBigPicture, idListThumbmails, idSizes, idBasketButton, data) {
  let bigPic = document.getElementById(idBigPicture);
  if (!bigPic) return;   // by first call of functiona data are not laoded yet
  let thumbnails = document.getElementById(idListThumbmails);
  thumbnails.innerHTML = "";
  for (let i = 0; i < data.colors.length; i++) {
    let div = document.createElement("div");
    div.className = "w3-quarter";
    let img = document.createElement("img");
    img.className = "swimnappies w3-opacity w3-hover-opacity-off w3-round";
    img.src = data.colors[i].img;
    img.style.width = "100%";
    img.style.cursor = "pointer;"
    img.onclick = function () { showGalleryImage2(i, idBigPicture, idSizes, idBasketButton, data); };

    div.appendChild(img);
    thumbnails.appendChild(div);
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

  // modify basket button
  let basketButton = document.getElementById(idBasketButton);
  basketButton.onclick = function () { 
    addToBasket(
      data.id,
      data.colors[n].img,
      data.name + " " + data.colors[n].name + " " + sizes.value,
      data.price ); 
  };

}
