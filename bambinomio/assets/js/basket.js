function addToBasket(id, img, name, price,) {
    // search if the product is already in basket
    var product = basketData.filter(obj => {
        return obj.name === name
    })
    if (product.length > 0) { // we just increase the count
        product[0].count += 1;
    } else { // the product is not yet in basket
        basketData.push({
            "id": id,
            "img": img,
            "name": name,
            "count": 1,
            "price": price,
        });
    }
    // make basket button visible
    var baskeButtons = document.getElementsByClassName("basketButton");
    for (var i = 0; i < baskeButtons.length; i++) {
        baskeButtons[i].className += " w3-show";
    }
}

function deleteFromBasket(n) {
    // delete n-th element from array basketData
    basketData.splice(n, 1);
    showBasket(basketData);
}

function changeCountInbasketBasket(n, modifier) {
    // delete n-th element from array basketData
    basketData[n]["count"] += modifier;
    if (basketData[n]["count"] < 1) {
        basketData[n]["count"] = 1;
    }
    showBasket(basketData);
}

function showBasket(data) {
    var basketTable = document.getElementById("basketTable");
    var basketTableForShow = document.createElement("table");
    basketTableForShow.className = "w3-table-all";
    let totalAmount = 0;
    let totalCount = 0;

    // EXTRACT VALUE FOR HTML HEADER. 
    // ('id', "img" 'name', "count", 'price',)
    var col = [];
    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // insert header
    let tr = basketTableForShow.insertRow();
    let th = document.createElement("th");

    th.innerHTML = "Attēls";
    tr.appendChild(th);
    th = document.createElement("th");
    th.innerHTML = "Prece";
    tr.appendChild(th);
    th = document.createElement("th");
    th.innerHTML = "Daudz.";
    tr.appendChild(th);
    th = document.createElement("th");
    th.innerHTML = "Cena par 1gab.";
    tr.appendChild(th);
    th = document.createElement("th");
    th.innerHTML = "Dzēst";
    tr.appendChild(th);


    basketTableForShow.innerHTML = "";
    basketTableForShow.appendChild(tr);

    // append data
    for (let i = 0; i < data.length; i++) {
        tr = basketTableForShow.insertRow(); // insert row at table end
        totalAmount += data[i]["price"] * data[i]["count"];
        totalCount = totalCount + data[i]["count"];
        for (let j = 1; j < col.length; j++) {
            let tabCell = tr.insertCell();
            if (j === 1) { // first row contains picture
                productPicture = document.createElement("img");
                productPicture.src = data[i][col[j]];
                productPicture.style.width = "30%";
                tabCell.appendChild(productPicture);
            } else if (j === 3) { // quantity
                let quantityId = "basketRow_" + i;
                let callString = "changeCountInbasketBasket(" + i;
                let html =
                    '<table class="w3-table"><tr>' +
                    '<td><button onclick="' + callString + ', -1);">-</button></td>' +
                    '<td><input id="' + quantityId + '" type="number" min=1 value="' + data[i]["count"] + '" style="max-width:40px" readonly></td>' +
                    '<td><button onclick="' + callString + ', 1);">+</button></td>' +
                    "</tr></table>"
                tabCell.innerHTML = html;
            } else {
                tabCell.innerHTML = data[i][col[j]];
            }
        }
        tabCell = tr.insertCell();
        let deleteIcon = document.createElement("i");
        deleteIcon.className = "fa fa-trash-o";
        deleteIcon.ariaHidden = "true";
        deleteIcon.onclick = function () {
            deleteFromBasket(i)
        };
        tabCell.appendChild(deleteIcon);
        // tabCell.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
    }

    let vat = (totalAmount * 0.21).toFixed(2);
    totalAmount = totalAmount.toFixed(2);
    totalWithoutVat = (totalAmount - vat).toFixed(2);


    basketTable.innerHTML = "";
    basketTable.appendChild(basketTableForShow);

    document.getElementById("totalWithoutVat").innerHTML = totalWithoutVat;
    document.getElementById("vat").innerHTML = vat;
    document.getElementById("totalAmount").innerHTML = totalAmount;


    // make basket visible
    var b = document.getElementById("basket");
    b.className += " w3-show";
}

function handleDeliveryClick(myRadio) {
    if (myRadio.value == "omniva") {
        showElement("omnivaLocationList");
    } else {
        hideElement("omnivaLocationList");
    }
}

function checkOrder() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const deliveryOmniva = document.getElementById("deliveryOmniva");
    const omnivaLocationList = document.getElementById("omnivaLocationList");

    if (!name.checkValidity()) {
        name.focus();
    } else if (!email.checkValidity()) {
        email.focus();
    } else if (!phone.checkValidity()) {
        phone.focus();
    } else if (deliveryOmniva.checked && omnivaLocationList.value == 'Izvēlieties Omniva Pakomātu')  {
        alert("Izvēlieties Omniva pakomātu")
        omnivaLocationList.focus();
    } else {
        const form = document.getElementById("fullOrderForm");
        form.onsubmit = function () {
            return true;
        };
    }
}

function getOmnivaLocations() {
    let dropdown = document.getElementById('omnivaLocationList');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Izvēlieties Omniva Pakomātu';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = 'https://www.omniva.lv/locations.json';

    fetch(url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response  
                response.json().then(function (data) {
                    let option;

                    for (let i = 0; i < data.length; i++) {
                        if (data[i].A0_NAME == "LV") {  // tikai LV pakomātus
                            option = document.createElement('option');
                            option.text = data[i].NAME;
                            option.value = data[i].NAME;
                            dropdown.add(option);
                        }
                    }
                });
            }
        )
        .catch(function (err) {
            console.error('Fetch Error -', err);
        });


}