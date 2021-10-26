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
    console.log("---- baskeButtons:", baskeButtons);
    for (var i = 0; i < baskeButtons.length; i++) {
        baskeButtons[i].className += " w3-show";
    }
    console.log("---- added to basket:", basketData);
}

function deleteFromBasket(n) {
    // delete n-th element from array basketData
    basketData.splice(n, 1);
    showBasket(basketData);
}

function showBasket(data) {
    var basketTable = document.getElementById("basketTable");
    var basketTableForShow = document.createElement("table");
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
    th.innerHTML = "Preces nosaukums";
    tr.appendChild(th);
    th = document.createElement("th");
    th.innerHTML = "skaits";
    tr.appendChild(th);
    th = document.createElement("th");
    th.innerHTML = "Cena par 1gab.";
    tr.appendChild(th);

    basketTableForShow.innerHTML = "";
    basketTableForShow.appendChild(tr);

    // append data
    for (let i = 0; i < data.length; i++) {
        tr = basketTableForShow.insertRow(); // insert row at table end
        totalAmount += data[i]["price"] * data[i]["count"];
        totalCount = totalCount + data[i]["count"];
        for (let j = 1; j < col.length; j++) {
            var tabCell = tr.insertCell();
            if (j === 1) { // first row contains picture
                productPicture = document.createElement("img");
                productPicture.src = data[i][col[j]];
                productPicture.style.width = "30%";
                tabCell.appendChild(productPicture);
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