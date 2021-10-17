
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
