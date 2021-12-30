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
    showBasket();
}

function deleteFromBasket(n) {
    // delete n-th element from array basketData
    basketData.splice(n, 1);
    showBasket();
}

function changeCountInbasketBasket(n, modifier) {
    // delete n-th element from array basketData
    basketData[n]["count"] += modifier;
    if (basketData[n]["count"] < 1) {
        basketData[n]["count"] = 1;
    }
    showBasket();
}

function showBasket() {

    const basketTable = document.getElementById("basketTable");
    const basketTableForShow = document.createElement("table");
    basketTableForShow.className = "w3-table-all";
    let totalAmount = 0;
    let totalCount = 0;

    // EXTRACT VALUE FOR HTML HEADER. 
    // ('id', "img" 'name', "count", 'price',)
    var col = [];
    for (var i = 0; i < basketData.length; i++) {
        for (var key in basketData[i]) {
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
    for (let i = 0; i < basketData.length; i++) {
        tr = basketTableForShow.insertRow(); // insert row at table end
        totalAmount += basketData[i]["price"] * basketData[i]["count"];
        totalCount = totalCount + basketData[i]["count"];
        for (let j = 1; j < col.length; j++) {
            let tabCell = tr.insertCell();
            if (j === 1) { // first row contains picture
                productPicture = document.createElement("img");
                productPicture.src = basketData[i][col[j]];
                productPicture.style.width = "30%";
                tabCell.appendChild(productPicture);
            } else if (j === 3) { // quantity
                let quantityId = "basketRow_" + i;
                let callString = "changeCountInbasketBasket(" + i;
                let html =
                    '<table class="w3-table"><tr>' +
                    '<td><button onclick="' + callString + ', -1);">-</button></td>' +
                    '<td><input id="' + quantityId + '" type="number" min=1 value="' + basketData[i]["count"] + '" style="max-width:40px" readonly></td>' +
                    '<td><button onclick="' + callString + ', 1);">+</button></td>' +
                    "</tr></table>"
                tabCell.innerHTML = html;
            } else {
                tabCell.innerHTML = basketData[i][col[j]];
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

    showElement("basket");
    // finally we add number to basket icon
    const cartItemCount = document.getElementById("cartItemCount");
    if (totalCount > 0) {
        cartItemCount.textContent = totalCount;
    } else {
        cartItemCount.textContent = "";
    }
}

function handleDeliveryClick(myRadio) {
    if (myRadio.value == "omniva") {
        showElement("omnivaLocationList");
        hideElement("latvijasPastsDelivery");
        hideElement("courierDelivery");
    } else if (myRadio.value == "lp") {
        hideElement("omnivaLocationList");
        showElement("latvijasPastsDelivery");
        hideElement("courierDelivery");
    } else if (myRadio.value == "courier") {
        hideElement("omnivaLocationList");
        hideElement("latvijasPastsDelivery");
        showElement("courierDelivery");
    } else {
        showElement("omnivaLocationList");
        hideElement("latvijasPastsDelivery");
        hideElement("courierDelivery");
    }
}

function restoreDelivery() {
    // hack for refreshed radioButtons when order is being edited
    let checkedElement;
    if (deliveryService == "OMNIVA") {
        checkedElement = document.getElementById("deliveryOmniva");
    } else if (deliveryService == "Latvijas pasts") {
        checkedElement = document.getElementById("deliveryLP");
    } else if (deliveryService == "Kurjers") {
        checkedElement = document.getElementById("deliveryCourier");
    }
    if (checkedElement) {
        checkedElement.checked = true;
        handleDeliveryClick(checkedElement);
    }
}

function checkPrivateData() {
    clientName = document.getElementById("clientName");
    clientEmail = document.getElementById("clientEmail");
    clientPhone = document.getElementById("clientPhone");

    if (!clientName.reportValidity()) {
        clientName.focus();
    } else if (!clientEmail.reportValidity()) {
        clientEmail.focus();
    } else if (!clientPhone.reportValidity()) {
        clientPhone.focus();
    } else {
        hideElement("checkPrivateDataButton");
        showElement("orderDelivery");
        showElement("orderReview");
    }
}

function checkOrder() {
    clientName = document.getElementById("clientName");
    clientEmail = document.getElementById("clientEmail");
    clientPhone = document.getElementById("clientPhone");

    if (!clientName.reportValidity()) {
        clientName.focus();
        return;
    } else if (!clientEmail.reportValidity()) {
        clientEmail.focus();
        return;
    } else if (!clientPhone.reportValidity()) {
        clientPhone.focus();
        return;
    } else {
        const deliveryBlock = document.getElementById("orderDelivery");
        deliveryBlock.disabled = false;
    }

    const deliveryOmniva = document.getElementById("deliveryOmniva");
    const omnivaLocationList = document.getElementById("omnivaLocationList");
    if (deliveryOmniva.checked) {
        if (omnivaLocationList.value == 'Izvēlieties Omniva Pakomātu') {
            alert("Izvēlieties Omniva pakomātu")
            omnivaLocationList.focus();
            return;
        }
        deliveryService = "OMNIVA";
        deliveryDetails = omnivaLocationList.value;
        deliveryPrice = 2.99;
    } else if (deliveryLP.checked) {
        deliveryService = "Latvijas pasts";
        deliveryPrice = 3.99;
        const lpAddress1 = document.getElementById("lpAddress1");
        const lpAddress2 = document.getElementById("lpAddress2");
        const lpAddress3 = document.getElementById("lpAddress3");
        if (!lpAddress1.reportValidity()) {
            lpAddress1.focus();
            return;
        } else if (!lpAddress2.reportValidity()) {
            lpAddress2.focus();
            return;
        } if (!lpAddress3.reportValidity()) {
            lpAddress3.focus();
            return;
        }
        deliveryDetails = lpAddress1.value + " " + lpAddress2.value + " " + lpAddress3.value;
    } else if (deliveryCourier.checked) {
        deliveryService = "Kurjers";
        deliveryPrice = 5;
        const rigaAddress = document.getElementById("rigaAddress");
        if (!rigaAddress.reportValidity()) {
            rigaAddress.focus();
            return;
        }
        deliveryDetails = rigaAddress.value;
    }
    showOrder();
}

function showOrder() {
    let totalAmount = 0;
    let totalCount = 0;
    const order = document.getElementById("order");
    orderHtml = "<h2>Pasūtījums</h2>" +
        '<table class="w3-table-all">' +
        "<tr><th>Attēls</th>" +
        "<th>Prece</th>" +
        "<th>Daudzums</th>" +
        "<th>Cena par 1gab.</th>" +
        "<th>Kopējā cena</th></tr>";
    basketData.forEach(function (item, index) {
        orderHtml += '<tr><td><img src="' + item.img + '" style="width:30%"></td>' +
            "<td>" + item.name + "</td>" +
            "<td>" + item.count + "</td>" +
            "<td>" + item.price + "€</td>" +
            "<td>" + (item.price * item.count).toFixed(2) + "€</td></tr>"
        totalAmount += item.price * item.count;
        totalCount = totalCount + item.count;
    })
    orderHtml += '<tr><td></td>' +
        "<td>Kopā</td>" +
        "<td>" + totalCount + "</td>" +
        "<td></td>" +
        "<td>" + totalAmount.toFixed(2) + "€</td></tr>"
    orderHtml += "</table>";

    let vat = (totalAmount * 0.21).toFixed(2);
    let totalWithoutVat = (totalAmount - vat).toFixed(2);
    orderHtml += '<div class="w3-container w3-right-align ">' +
        '<h5>Summa par precēm bez PVN ' + totalWithoutVat + '€<br>' +
        'PVN par precēm 21% ' + vat + '€<br>' +
        'Piegāde ' + deliveryPrice + '€<br>' +
        'Summa apmaksai ar PVN ' + (deliveryPrice + totalAmount).toFixed(2) + '€<br>' +
        '</h5></div>';

    orderHtml += "<h2>Pasūtītājs</h2>" +
        '<p><b>Vārds, uzvārds:</b>' + clientName.value + '</p>' +
        '<p><b>Epasts:</b>' + clientEmail.value + '</p>' +
        '<p><b>Telefons:</b>' + clientPhone.value + '</p>';

    orderHtml += "<h2>Piegāde</h2>" +
        '<p><b>Piegādes veids:</b>' + deliveryService + '</p>' +
        '<p><b>Piegādes detaļas:</b>' + deliveryDetails + '</p>';

    order.innerHTML = orderHtml;


    hideElement("orderPersInfo");
    hideElement("orderDelivery");
    hideElement("orderReview");
    showElement("order");
    showElement("orderConfirm");
}

function emailOrder() {
    // placeholder, todo: implement it in PHP
    alert("šeit tiks sūtīts e-pasts:" + orderHtml);
    location.reload();
}

function editOrder() {
    hideElement("orderPersInfo");
    hideElement("orderDelivery");
    hideElement("orderReview");
    hideElement("order");
    hideElement("orderConfirm");
    w3.hideElement(document.getElementById('orderBlock'));
    showElement("basket");
    restoreDelivery();
}

function createOrder() {
    w3.showElement(document.getElementById('orderBlock'));
    showElement("orderPersInfo");
    showElement("checkPrivateDataButton");
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