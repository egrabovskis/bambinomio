function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          // Valdis - added status == 0 for loacal tests
          if (this.status == 200 || this.status == 0) {
            elmnt.innerHTML = this.responseText;
            var codes = elmnt.getElementsByTagName("script");
            for (var i = 0; i < codes.length; i++) {
              eval(codes[i].text);
            }
          }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();

      generateGallery2("swimnappy-current", "swimnappies-list", "swimnappies-list-small","swimNapiesSizes", "swimNapiesBasketButton", swimNappiesData);
      generateGallery2("miosoft-current", "miosoft-list", "miosoft-list-small", "mioSoftSizes", "mioSoftBasketButton", mioSoftData);
      generateGallery2("miosolo-current", "miosolo-list", "miosolo-list-small", "mioSoloSizes", "mioSoloBasketButton", mioSoloData);

      /*exit the function:*/
      return;
    }
  }
};