function toggleNavBar() {
  toggleElement("navig-medium-screens");
}

function toggleElement(id) {
  const x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

function showElement(id) {
  const x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  }
  x.disabled = false; 
}

function hideElement(id) {
  const x = document.getElementById(id);
  if (x.className.indexOf("w3-show") != -1) {
    x.className = x.className.replace(" w3-show", "");
  }
  x.disabled = true; 
}
