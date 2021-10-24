function addToBasket(id, img, name, price,) {
    // search if the product is already in basket
    var product = basketData.filter(obj => {
        return obj.id === id
    })
    if (product.length > 0) {  // we just increase the count
        product[0].count += 1;
    } else {  // the product is not yet in basket
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
        for (var j = 1; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            if (j === 1) {  // first row contains picture
                productPicture = document.createElement("img");
                productPicture.src = data[i][col[j]];
                productPicture.style.width = "30%";
                tabCell.appendChild(productPicture);
            } else {
                tabCell.innerHTML = data[i][col[j]];
            }
        }
    }
    let vat = (totalAmount * 0.21).toFixed(2);
    console.log("vat", vat);
    console.log("totalAmount ", totalAmount);
    console.log("totalCount ", totalCount);


    console.log("---- 005 basketTableForShow:", basketTableForShow);

    // sum row
    let trs = basketTableForShow.insertRow();
    let tabCells = trs.insertCell();

   tabCells = trs.insertCell();
    tabCells.innerHTML = "kopā";
    tabCells = trs.insertCell();
    tabCells.innerHTML = totalCount;
    tabCells = trs.insertCell();
    tabCells.innerHTML = totalAmount;
    tabCells = trs.insertCell();
    tabCells.innerHTML = vat;

    basketTableForShow.appendChild(trs);

    basketTable.innerHTML = "";
    basketTable.appendChild(basketTableForShow);
    console.log("---- 010 basketTableForShow:", basketTableForShow);

    // make basket visible
    var b = document.getElementById("basket");
    b.className += " w3-show";
}
