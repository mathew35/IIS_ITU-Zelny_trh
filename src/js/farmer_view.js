function get_own(what, from) {
    const request = new XMLHttpRequest();
    request.open("POST", from);
    request.send();
    request.addEventListener("load", () => {
        let newData = request.responseText;
        console.log("update");
        sessionStorage.setItem(what, newData);
        farmer_view_pick();
    })
}

function add_prod_post() {
    const request = post('../php_ajax/add_prod.php', document.getElementById("addForm"));
    request.addEventListener("load", (event) => {
        let response = request.responseText;
        console.log(request.responseText);
        sessionStorage.setItem('ownProducts', sessionStorage.getItem('ownProducts') + "~" + response);
        farmer_view_pick();
    })
}

function edit_prod_post() {
    const request = post('../php_ajax/update_prod.php', document.getElementById("editForm"));
    request.addEventListener("load", (event) => {
        console.log(request.responseText);
        get_own('ownProducts', '../php_ajax/farmer_products.php');
    });
}

function event_post() {
    const request = post('../php_ajax/create_event.php', document.getElementById("eventForm"));
    request.addEventListener("load", (event) => {
        console.log(request.responseText);
        document.getElementById('popupBackground').remove();
        document.getElementById('popupWin').remove();
    })
}

function form_add() {
    let popup = document.getElementById("popupWin");
    let form = document.createElement("form");
    form.id = "addForm";
    form.action = "javascript:add_prod_post()";
    form.method = "POST";

    let labelCat = document.createElement('label');
    labelCat.htmlFor = "category";
    labelCat.textContent = "Kategóia";
    form.appendChild(labelCat);

    form.appendChild(document.createElement("br"));

    let selectCat = document.createElement("select");
    selectCat.selectedIndex = 1;
    selectCat.id = "category";
    selectCat.name = "category";

    let categories = post('../php_ajax/categories.php', null);
    categories.addEventListener("load", () => {
        var item = categories.responseText;
        item = item.split(',');
        for (let i = 0; i < item.length; i++) {
            let option = document.createElement('option');
            option.value = item[i];
            option.textContent = item[i];
            selectCat.appendChild(option);
        }
    })
    form.appendChild(selectCat);

    form.appendChild(document.createElement("br"));

    let labelCrop = document.createElement('label');
    labelCrop.htmlFor = "crop";
    labelCrop.textContent = "Plodina";
    form.appendChild(labelCrop);

    form.appendChild(document.createElement("br"));

    let selectCrop = document.createElement("select");
    selectCrop.id = "crop";
    selectCrop.name = "crop";
    form.appendChild(selectCrop);
    let addNew = document.createElement('option');
    addNew.textContent = "Pridaj novú";
    addNew.value = "addNew";
    selectCrop.appendChild(addNew);

    let crops = post('../php_ajax/crops.php', null);
    crops.addEventListener("load", () => {
        var item = crops.responseText;
        item = item.split(',');
        for (let i = 0; i < item.length; i++) {
            let option = document.createElement('option');
            option.value = item[i];
            option.textContent = item[i];
            selectCrop.appendChild(option);
        }
        selectCrop.selectedIndex = "1";
    })

    let labelNewCrop = document.createElement('label');
    labelNewCrop.htmlFor = "newCrop";
    labelNewCrop.textContent = "Nazov novej plodiny";
    labelNewCrop.style = 'display:none';
    let inputBr = document.createElement("br");
    inputBr.style = 'display:none';
    let labelBr = document.createElement("br");
    labelBr.style = 'display:none';
    let inputNewCrop = document.createElement('input');
    inputNewCrop.type = "text";
    inputNewCrop.id = "newCrop";
    inputNewCrop.name = "newCrop";
    inputNewCrop.style = 'display: none';
    form.appendChild(document.createElement("br"));
    form.appendChild(labelNewCrop);
    form.appendChild(labelBr);
    form.appendChild(inputNewCrop);
    form.appendChild(inputBr);

    selectCrop.addEventListener("change", () => {
        if (selectCrop.selectedIndex == "0") {
            inputNewCrop.style = '';
            inputBr.style = '';
            labelNewCrop.style = '';
            labelBr.style = '';
        } else {
            inputNewCrop.style = 'display:none';
            inputBr.style = 'display:none';
            labelNewCrop.style = 'display:none';
            labelBr.style = 'display:none';
        }
    });
    let labelCropname = document.createElement('label');
    labelCropname.htmlFor = "cropname";
    labelCropname.textContent = "Vlastný názov";
    form.appendChild(labelCropname);
    form.appendChild(document.createElement("br"));

    let inputCropname = document.createElement("input");
    inputCropname.type = "text";
    inputCropname.id = "cropname";
    inputCropname.name = "cropname";
    form.appendChild(inputCropname);
    form.appendChild(document.createElement("br"));

    let labelAmount = document.createElement('label');
    labelAmount.htmlFor = "amount";
    labelAmount.textContent = "Množstvo";
    form.appendChild(labelAmount);
    form.appendChild(document.createElement("br"));

    let inputAmount = document.createElement("input");
    inputAmount.type = "number";
    inputAmount.id = "amount";
    inputAmount.name = "amount";
    inputAmount.value = "1";
    form.appendChild(inputAmount);
    form.appendChild(document.createElement("br"));

    let labelPrice = document.createElement('label');
    labelPrice.htmlFor = "price";
    labelPrice.textContent = "Cena za jednotku";
    form.appendChild(labelPrice);
    form.appendChild(document.createElement("br"));

    let inputPrice = document.createElement("input");
    inputPrice.type = "text";
    inputPrice.id = "price";
    inputPrice.name = "price";
    inputPrice.value = "1";
    form.appendChild(inputPrice);
    form.appendChild(document.createElement("br"));

    let labelUnit = document.createElement('label');
    labelUnit.htmlFor = "unit";
    labelUnit.textContent = "Jednotka";
    form.appendChild(labelUnit);
    form.appendChild(document.createElement("br"));

    ///pouzit select
    let selectUnit = document.createElement("select");
    selectUnit.id = "unit";
    selectUnit.name = "unit";
    form.appendChild(selectUnit);
    let option = document.createElement('option');
    option.value = 0;
    option.textContent = "kg";
    selectUnit.appendChild(option);
    option = document.createElement('option');
    option.value = 1;
    option.textContent = "ks";
    selectUnit.selectedIndex = "0";
    selectUnit.appendChild(option);
    form.appendChild(selectUnit);
    form.appendChild(document.createElement("br"));

    let labelLocation = document.createElement('label');
    labelLocation.htmlFor = "location";
    labelLocation.textContent = "Miesto pôvodu";
    form.appendChild(labelLocation);
    form.appendChild(document.createElement("br"));

    let inputLocation = document.createElement("input");
    inputLocation.type = "text";
    inputLocation.id = "location";
    inputLocation.name = "location";
    form.appendChild(inputLocation);
    form.appendChild(document.createElement("br"));

    let labelPhoto = document.createElement('label');
    labelPhoto.htmlFor = "photo";
    labelPhoto.textContent = "Link na obrázok";
    form.appendChild(labelPhoto);
    form.appendChild(document.createElement("br"));

    let inputPhoto = document.createElement("input");
    inputPhoto.type = "text";
    inputPhoto.id = "photo";
    inputPhoto.name = "photo";
    form.appendChild(inputPhoto);
    form.appendChild(document.createElement("br"));

    let labelDescription = document.createElement('label');
    labelDescription.htmlFor = "description";
    labelDescription.textContent = "Popis produktu";
    form.appendChild(labelDescription);
    form.appendChild(document.createElement("br"));

    let inputDescription = document.createElement("input");
    inputDescription.type = "text";
    inputDescription.id = "description";
    inputDescription.name = "description";
    form.appendChild(inputDescription);
    form.appendChild(document.createElement("br"));

    let hr = document.createElement("hr");
    hr.style.width = "80%";
    form.appendChild(hr);
    let submit = document.createElement("button");
    let cancel = document.createElement("button");
    submit.textContent = "Pridať";
    cancel.textContent = "Zrušiť";
    cancel.addEventListener("click", (evt) => {
        document.getElementById("popupBackground").remove();
        document.getElementById("popupWin").remove();
    })
    popup.style.overflow = "scroll";
    form.appendChild(submit);
    form.appendChild(cancel);

    popup.appendChild(form);
}

function generateEventForm(form, id) {
    form.id = "eventForm";
    form.action = "javascript:event_post()";
    form.method = "POST";

    let labelId2 = document.createElement('label');
    labelId2.htmlFor = "id2";
    labelId2.textContent = "ID2";
    labelId2.style.display = "none";
    form.appendChild(labelId2);

    let inputId2 = document.createElement('input');
    inputId2.type = "text";
    inputId2.id = "id2";
    inputId2.name = "id2";
    inputId2.value = id;
    inputId2.style.display = "none";
    form.appendChild(inputId2);

    let labelDateFrom = document.createElement('label');
    labelDateFrom.htmlFor = "datefrom";
    labelDateFrom.textContent = "Dátum začiatku";
    form.appendChild(labelDateFrom);
    form.appendChild(document.createElement("br"));

    let inputDateFrom = document.createElement("input");
    inputDateFrom.type = "date";
    inputDateFrom.id = "datefrom";
    inputDateFrom.name = "datefrom";
    inputDateFrom.value = new Date().toJSON().slice(0, 10).replace(/-/g, '-');;
    form.appendChild(inputDateFrom);
    form.appendChild(document.createElement("br"));

    let labelDateTo = document.createElement('label');
    labelDateTo.htmlFor = "dateto";
    labelDateTo.textContent = "Dátum ukončenia";
    form.appendChild(labelDateTo);
    form.appendChild(document.createElement("br"));

    let inputDateTo = document.createElement("input");
    inputDateTo.type = "date";
    inputDateTo.id = "dateto";
    inputDateTo.name = "dateto";
    inputDateTo.value = new Date().toJSON().slice(0, 10).replace(/-/g, '-');;
    form.appendChild(inputDateTo);
    form.appendChild(document.createElement("br"));

    let labelPlace = document.createElement('label');
    labelPlace.htmlFor = "place";
    labelPlace.textContent = "Miesto konania";
    form.appendChild(labelPlace);
    form.appendChild(document.createElement("br"));

    let inputPlace = document.createElement("input");
    inputPlace.type = "text";
    inputPlace.id = "place";
    inputPlace.name = "place";
    form.appendChild(inputPlace);
    form.appendChild(document.createElement("br"));

    let labelDescription2 = document.createElement('label');
    labelDescription2.htmlFor = "description2";
    labelDescription2.textContent = "Popis";
    form.appendChild(labelDescription2);
    form.appendChild(document.createElement("br"));

    let inputDescription2 = document.createElement("input");
    inputDescription2.type = "text";
    inputDescription2.id = "description2";
    inputDescription2.name = "description2";
    form.appendChild(inputDescription2);
    form.appendChild(document.createElement("br"));


    let hr = document.createElement("hr");
    hr.style.width = "80%";
    form.appendChild(hr);
    let createEventButton = document.createElement('button');
    createEventButton.textContent = "Pridať samozber";
    form.appendChild(createEventButton);
}

function edit_product(product) {
    overlay();
    let popup = document.getElementById("popupWin");
    let form = document.createElement("form");
    form.id = "editForm";
    form.action = "javascript:edit_prod_post()";
    form.method = "POST";

    let labelId = document.createElement('label');
    labelId.htmlFor = "id";
    labelId.textContent = "ID";
    labelId.style.display = "none";
    form.appendChild(labelId);

    let inputId = document.createElement('input');
    inputId.type = "text";
    inputId.id = "id";
    inputId.name = "id";
    inputId.value = product[0];
    inputId.style.display = "none";
    form.appendChild(inputId);

    let labelCat = document.createElement('label');
    labelCat.htmlFor = "category";
    labelCat.textContent = "Kategóia";
    form.appendChild(labelCat);

    form.appendChild(document.createElement("br"));

    let selectCat = document.createElement("select");
    selectCat.selectedIndex = 1;
    selectCat.id = "category";
    selectCat.name = "category";

    let categories = post('../php_ajax/categories.php', null);
    categories.addEventListener("load", () => {
        var item = categories.responseText;
        item = item.split(',');
        for (let i = 0; i < item.length; i++) {
            let option = document.createElement('option');
            option.value = item[i];
            option.textContent = item[i];
            selectCat.appendChild(option);
            selectCat.selectedIndex = (item[i] == (product[3]) ? i : selectCat.selectedIndex);
        }
    })
    form.appendChild(selectCat);

    form.appendChild(document.createElement("br"));

    let labelCrop = document.createElement('label');
    labelCrop.htmlFor = "crop";
    labelCrop.textContent = "Plodina";
    form.appendChild(labelCrop);

    form.appendChild(document.createElement("br"));

    let selectCrop = document.createElement("select");
    selectCrop.id = "crop";
    selectCrop.name = "crop";
    form.appendChild(selectCrop);
    let addNew = document.createElement('option');
    addNew.textContent = "Pridaj novú";
    addNew.value = "addNew";
    selectCrop.appendChild(addNew);
    let crops = post('../php_ajax/crops.php', null);
    crops.addEventListener("load", () => {
        var item = crops.responseText;
        item = item.split(',');
        for (let i = 0; i < item.length; i++) {
            let option = document.createElement('option');
            option.value = item[i];
            option.textContent = item[i];
            selectCrop.appendChild(option);
            selectCrop.selectedIndex = (item[i] == (product[2]) ? i + 1 : selectCrop.selectedIndex);
        }
    })

    let labelNewCrop = document.createElement('label');
    labelNewCrop.htmlFor = "newCrop";
    labelNewCrop.textContent = "Nazov novej plodiny";
    labelNewCrop.style = 'display:none';
    let inputBr = document.createElement("br");
    inputBr.style = 'display:none';
    let labelBr = document.createElement("br");
    labelBr.style = 'display:none';
    let inputNewCrop = document.createElement('input');
    inputNewCrop.type = "text";
    inputNewCrop.id = "newCrop";
    inputNewCrop.name = "newCrop";
    inputNewCrop.style = 'display: none';
    form.appendChild(document.createElement("br"));
    form.appendChild(labelNewCrop);
    form.appendChild(labelBr);
    form.appendChild(inputNewCrop);
    form.appendChild(inputBr);

    selectCrop.addEventListener("change", () => {
        if (selectCrop.selectedIndex == "0") {
            inputNewCrop.style = '';
            inputBr.style = '';
            labelNewCrop.style = '';
            labelBr.style = '';
        } else {
            inputNewCrop.style = 'display:none';
            inputBr.style = 'display:none';
            labelNewCrop.style = 'display:none';
            labelBr.style = 'display:none';
        }
    });

    let labelCropname = document.createElement('label');
    labelCropname.htmlFor = "cropname";
    labelCropname.textContent = "Vlastný názov";
    form.appendChild(labelCropname);
    form.appendChild(document.createElement("br"));

    let inputCropname = document.createElement("input");
    inputCropname.type = "text";
    inputCropname.id = "cropname";
    inputCropname.name = "cropname";
    inputCropname.value = product[1];
    form.appendChild(inputCropname);
    form.appendChild(document.createElement("br"));

    let labelAmount = document.createElement('label');
    labelAmount.htmlFor = "amount";
    labelAmount.textContent = "Množstvo";
    form.appendChild(labelAmount);
    form.appendChild(document.createElement("br"));

    let inputAmount = document.createElement("input");
    inputAmount.type = "number";
    inputAmount.id = "amount";
    inputAmount.name = "amount";
    inputAmount.value = product[4];
    form.appendChild(inputAmount);
    form.appendChild(document.createElement("br"));

    let labelPrice = document.createElement('label');
    labelPrice.htmlFor = "price";
    labelPrice.textContent = "Cena za jednotku";
    form.appendChild(labelPrice);
    form.appendChild(document.createElement("br"));

    let inputPrice = document.createElement("input");
    inputPrice.type = "text";
    inputPrice.id = "price";
    inputPrice.name = "price";
    inputPrice.value = product[5];
    form.appendChild(inputPrice);
    form.appendChild(document.createElement("br"));

    let labelUnit = document.createElement('label');
    labelUnit.htmlFor = "unit";
    labelUnit.textContent = "Jednotka";
    form.appendChild(labelUnit);
    form.appendChild(document.createElement("br"));

    ///pouzit select
    let selectUnit = document.createElement("select");
    selectUnit.id = "unit";
    selectUnit.name = "unit";
    form.appendChild(selectUnit);
    let option = document.createElement('option');
    option.value = "kg";
    option.textContent = "kg";
    selectUnit.appendChild(option);
    option = document.createElement('option');
    option.value = "ks";
    option.textContent = "ks";
    selectUnit.appendChild(option);
    selectUnit.selectedIndex = ((product[6] == "kg") ? 0 : 1);
    form.appendChild(selectUnit);
    form.appendChild(document.createElement("br"));

    let labelLocation = document.createElement('label');
    labelLocation.htmlFor = "location";
    labelLocation.textContent = "Miesto pôvodu";
    form.appendChild(labelLocation);
    form.appendChild(document.createElement("br"));

    let inputLocation = document.createElement("input");
    inputLocation.type = "text";
    inputLocation.id = "location";
    inputLocation.name = "location";
    inputLocation.value = product[9];
    form.appendChild(inputLocation);
    form.appendChild(document.createElement("br"));

    let labelPhoto = document.createElement('label');
    labelPhoto.htmlFor = "photo";
    labelPhoto.textContent = "Link na obrázok";
    form.appendChild(labelPhoto);
    form.appendChild(document.createElement("br"));

    let inputPhoto = document.createElement("input");
    inputPhoto.type = "text";
    inputPhoto.id = "photo";
    inputPhoto.name = "photo";
    inputPhoto.value = product[7];
    form.appendChild(inputPhoto);
    form.appendChild(document.createElement("br"));

    let labelDescription = document.createElement('label');
    labelDescription.htmlFor = "description";
    labelDescription.textContent = "Popis produktu";
    form.appendChild(labelDescription);
    form.appendChild(document.createElement("br"));

    let inputDescription = document.createElement("input");
    inputDescription.type = "text";
    inputDescription.id = "description";
    inputDescription.name = "description";
    inputDescription.value = product[8];
    form.appendChild(inputDescription);
    form.appendChild(document.createElement("br"));

    let hr = document.createElement("hr");
    hr.style.width = "80%";
    form.appendChild(hr);
    let submit = document.createElement("button");
    let cancel = document.createElement("button");
    submit.textContent = "Aktualizovať";
    cancel.textContent = "Obnoviť";
    cancel.addEventListener("click", (evt) => {
        document.getElementById("popupBackground").remove();
        document.getElementById("popupWin").remove();
        edit_product(product);
    });
    popup.style.overflow = "scroll";
    form.appendChild(submit);
    form.appendChild(cancel);

    popup.appendChild(form);
}

function add_event(product) {
    overlay();
    let popup = document.getElementById("popupWin")
    let form2 = document.createElement('form');
    generateEventForm(form2, product[0]);
    popup.appendChild(form2);
}

function new_product() {
    overlay();
    form_add();
}

function updateOnOrder(status, id) {
    var request = new XMLHttpRequest();
    request.open("POST", '../php_ajax/update_order.php');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send("status=" + status + "&id=" + id + "");
    request.addEventListener("load", () => {
        console.log(request.responseText);
        get_own('ownOrders', '../php_ajax/farmer_orders.php');
    })
}

function generate_table(type, data) {
    let scrollTop = 0;
    let content = document.createElement("div");
    content.style.display = "grid";
    content.style.gridTemplateColumns = "1fr 1fr"
    let wrapper = document.getElementById("table");
    wrapper.innerHTML = '';
    wrapper.appendChild(content);
    if (type == "farmer_view") {
        let addProduct = document.createElement("div");
        addProduct.id = "addProduct";
        addProduct.className = "shop-item";
        addProduct.style.backgroundImage = "url('../add_product.svg'";
        addProduct.style.backgroundSize = "contain";
        addProduct.style.backgroundPosition = "center";
        addProduct.style.backgroundRepeat = "no-repeat";
        addProduct.addEventListener("click", (event) => {
            new_product();
        });
        content.appendChild(addProduct);
    }
    if (data != null) {
        if (data[0] != "null" && data[0] != "") {
            if (type == "order_view") {
                //neako upravit stale
                cmp1 = 2;
                cmp2 = 1
            }
            for (let i = 0; i < data.length; i++) {
                let product = document.createElement("div");
                let id = null;
                product.className = "shop-item";
                if (type == "order_view") {
                    product.style.padding = "10px";
                    product.style.width = "calc(100% - 40px)";
                    product.style.color = "black";
                    console.log(data[i]);
                    let spl = data[i].split(' ');
                    let res = "PROCESSED: " + spl[7] + " CROPID: " + spl[5] +
                        " FARMER: " +
                        spl[4] +
                        " AMOUNT: " + spl[6] +
                        " ID: " + spl[0];
                    id = spl[0];
                    product.textContent = res;
                    product.id = spl[0];
                    console.log(spl[7]);
                    if (spl[7] == 2) {
                        product.style.color = "red";
                    }
                    if (spl[7] == 1) {
                        product.style.color = "green";
                    }
                } else {
                    data[i] = data[i].split(';');
                    if (data[i][7] != "") {
                        product.style.backgroundImage = "url(" + data[i][7] + ")";

                    }
                    let header = document.createElement("h2");
                    let span = document.createElement("span");
                    header.appendChild(span);
                    product.appendChild(header);
                    span.textContent = data[i][1];
                    let p = document.createElement("p");
                    span = document.createElement("span");
                    span.textContent = data[i][9];
                    p.appendChild(span);
                    product.appendChild(p);
                    p = document.createElement("p");
                    span = document.createElement("span");
                    let span1 = document.createElement("span");
                    span1.class = "price";
                    span1.textContent = data[i][5];
                    span.appendChild(span1);
                    span1 = document.createElement("span");
                    span1.textContent = "/" + data[i][6];
                    span.appendChild(span1);
                    p.appendChild(span);
                    product.appendChild(p);
                    product.id = data[i][0];
                    //pridanie tlacitok na edit produktu, vytvorenie samozberu a zrusenie produktu
                    let buttonRow = document.createElement("div");
                    buttonRow.style.display = "flex";
                    buttonRow.style.justifyContent = "space-evenly";
                    buttonRow.style.float = "right";
                    let editButton = document.createElement("h2");
                    editButton.textContent = "Editovať";
                    editButton.style.backgroundColor = "rgba(138, 190, 214, 0.5)";
                    editButton.style.padding = "10px";
                    editButton.style.borderRadius = "20px";
                    editButton.addEventListener("mouseover", () => {
                        editButton.style.backgroundColor = "rgba(138, 190, 214, 0.8)";
                    })
                    editButton.addEventListener("mouseleave", () => {
                        editButton.style.backgroundColor = "rgba(138, 190, 214, 0.5)";
                    })
                    editButton.addEventListener("click", () => {
                        edit_product(data[i]);
                    })
                    let addEventButton = document.createElement("h2");
                    addEventButton.textContent = "Pridať samozber";
                    addEventButton.style.backgroundColor = "rgba(66, 167, 214, 0.5)";
                    addEventButton.style.padding = "10px";
                    addEventButton.style.borderRadius = "20px";
                    addEventButton.addEventListener("mouseover", () => {
                        addEventButton.style.backgroundColor = "rgba(66, 167, 214, 0.8)";
                    })
                    addEventButton.addEventListener("mouseleave", () => {
                        addEventButton.style.backgroundColor = "rgba(66, 167, 214, 0.5)";
                    })
                    addEventButton.addEventListener("click", () => {
                        add_event(data[i]);
                    })
                    let removeButton = document.createElement("h2");
                    removeButton.textContent = "Vymazať produkt";
                    removeButton.style.backgroundColor = "rgba(232, 32, 47, 0.5)";
                    removeButton.style.padding = "10px";
                    removeButton.style.borderRadius = "20px";
                    removeButton.addEventListener("mouseover", () => {
                        removeButton.style.backgroundColor = "rgba(232, 32, 47, 0.8)";
                    })
                    removeButton.addEventListener("mouseleave", () => {
                        removeButton.style.backgroundColor = "rgba(232, 32, 47, 0.5)";
                    })
                    removeButton.addEventListener("click", () => {
                        product.style.display = "none";
                    })
                    buttonRow.appendChild(editButton);
                    buttonRow.appendChild(addEventButton);
                    buttonRow.appendChild(removeButton);
                    product.appendChild(buttonRow);
                }
                if (type == "order_view") {
                    let accButt = document.createElement("button");
                    let decButt = document.createElement("button");
                    accButt.textContent = "Potvrdit";
                    decButt.textContent = "Zrusit";
                    accButt.style = "display:none";
                    decButt.style = "display:none";
                    accButt.addEventListener("click", () => {
                        updateOnOrder(1, data[i].split(';')[0].split(' ')[0]);
                        accButt.style = "display:none";
                        decButt.style = "display:none";
                        product.style.color = "green";
                    })
                    decButt.addEventListener("click", () => {
                        updateOnOrder(2, data[i].split(';')[0].split(' ')[0]);
                        accButt.style = "display:none";
                        decButt.style = "display:none";
                        product.style.color = "red";
                    })
                    if (product.style.color != "green" && product.style.color != "red") {
                        accButt.style = "";
                        decButt.style = "";
                    }
                    product.append(accButt, decButt);
                    product.style.display = "inline-flex";
                }
                content.appendChild(product);
            }
        }
    }
    if (content.children.length == 0 && content.children.length == 0) {
        //no orders 
        let noOrder = document.createElement("p");
        if (type == "order_view") noOrder.textContent = "No orders!";
        if (type == "f") noOrder.textContent = "No orders!";
        if (type == "order_view") noOrder.textContent = "No orders!";
        content.append(noOrder);
    }
    content.scrollTo(0, scrollTop);

}

let data = null;
// get_own('ownProducts', 'farmer_products.php');
// get_own('ownOrders', 'farmer_orders.php');
// get_own('user_cart', 'get_cart.php');
// get_own('user_cart_items', 'get_cart_items.php');


function farmer_view() {
    if (updateFarmer_view == null) {
        updateFarmer_view = setInterval(farmer_view_pick, 5000);
        get_prods = setInterval(get_own, 5000, 'ownProducts', '../php_ajax/farmer_products.php');
    }
    console.log("farmer_view");
    data = String(sessionStorage.getItem('ownProducts')).split('~');
    generate_table("farmer_view", data);
}

function order_view() {
    if (updateFarmer_view == null) {
        updateFarmer_view = setInterval(farmer_view_pick, 5000);
        get_prods = setInterval(get_own, 5000, 'ownOrders', '../php_ajax/farmer_orders.php');
    }
    console.log("order view");
    data = String(sessionStorage.getItem('ownOrders')).split(',');
    generate_table("order_view", data);


}

function farmer_view_pick() {
    if (sessionStorage.getItem('farmer_view') == "products") {
        farmer_view();
        //hide filter 
        let filter = document.getElementsByClassName('filter-section');
        for (let i = 0; i < filter.length; i++) {
            filter.item(i).style.display = 'none';
        }
        //adjust top marign of main section
        let table = document.getElementById('table');
        table.style.marginTop = '80px';
    } else if (sessionStorage.getItem('farmer_view') == "orders") {
        order_view();
        //hide filter 
        let filter = document.getElementsByClassName('filter-section');
        for (let i = 0; i < filter.length; i++) {
            filter.item(i).style.display = 'none';
        }
        //adjust top marign of main section
        let table = document.getElementById('table');
        table.style.marginTop = '80px';
    } else if (sessionStorage.getItem('farmer_view') == "cart") {
        cart_view();
        //hide filter 
        let filter = document.getElementsByClassName('filter-section');
        for (let i = 0; i < filter.length; i++) {
            filter.item(i).style.display = 'none';
        }
        //adjust top marign of main section
        let table = document.getElementById('table');
        table.style.marginTop = '80px';
    } else if (sessionStorage.getItem('farmer_view') == "profile") {
        profile_view();
        //hide filter 
        let filter = document.getElementsByClassName('filter-section');
        for (let i = 0; i < filter.length; i++) {
            filter.item(i).style.display = 'none';
        }
        //adjust top marign of main section
        let table = document.getElementById('table');
        table.style.marginTop = '80px';
    } else {
        // restoreAll();
        clearInterval(updateFarmer_view);
        clearInterval(get_prods);
        clearInterval(get_cart);
        clearInterval(get_cart_items);
        clearInterval(get_profile);
    }
}

let updateFarmer_view; // = setInterval(farmer_view_pick, 5000);
let get_prods; // = setInterval(get_own, 5000, 'ownProducts', 'farmer_products.php');
let get_cart;
let get_cart_items;
let get_profile;