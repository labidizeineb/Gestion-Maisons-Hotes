// Vérifie si la longueur d'une chaîne est supérieure ou égale à un nombre donné
function checkLength(ch, nb) {
    return (ch.length >= nb);
}
// Vérifie si la longueur d'une chaîne est égale à un nombre donné
function checkTel(ch, nb) {
    return (ch.length == nb);
}
// Compare la valeur d'une entrée avec un nombre donné
function checkNumber(nb1, nb2) {
    return (Number(nb1) > nb2)
}
//fonction pour generer l id
function id(T) {
    var max;
    if (T.length == 0) {
        max = 0;
    } else {
        max = T[0].id;
        for (var i = 1; i < T.length; i++) {
            if (T[i].id > max) {
                max = T[i].id;
            }
        }
    }
    return max;
}
// Récupère un tableau à partir du stockage local en utilisant une clé
function getTabFromLsByKey(key) {
    var T = JSON.parse(localStorage.getItem(key) || "[]");
    return T;
}
// Vérifie la validité d'une adresse e-mail
function checkEmail(email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}
// Valide les entrées et affiche un message en cas d'erreur
function validateInputs(x, id, msg) {
    if (x == false) {
        document.getElementById(id).innerHTML = msg;
        document.getElementById(id).style.color = "#f2b0a5";
    } else {
        document.getElementById(id).innerHTML = "";
    }
}
// Récupère la valeur d'un élément HTML en utilisant son identifiant
function getElementById(id) {
    var x = document.getElementById(id).value;
    return x;
}
// Recherche un objet dans un tableau du stockage local en utilisant son identifiant et une clé
function getFromLsByIdAndKey(id, key) {
    var tabs = getTabFromLsByKey(key);;
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].id == id) {
            return tabs[i];

        }
    }

}
// Fonction pour générer un nouveau captcha
function generate() {
    var captcha;
    // Access the element to store the generated captcha
    captcha = document.getElementById("image");
    var uniquechar = "";

    const randomchar =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // Generate captcha of length 5 with random characters
    for (var i = 0; i < 5; i++) {
        uniquechar += randomchar.charAt(
            Math.floor(Math.random() * randomchar.length)
        );
    }

    // Store generated captcha
    captcha.innerHTML = uniquechar;
}
// Fonction pour vérifier l'entrée de l'utilisateur par rapport au captcha généré
function printmsg() {
    var captcha = document.getElementById("image").innerHTML;
    const usr_input = document.getElementById("captchaInput").value;

    // Check whether the input is equal to the generated captcha or not
    if (usr_input === captcha) {
        document.getElementById("key").innerHTML = "Matched";
        document.getElementById("key").style.color = "#98BF64";
        return true;
    } else {
        document.getElementById("captchaInput").value = "";
        document.getElementById("key").innerHTML = "Not Matched";
        document.getElementById("key").style.color = "#f2b0a5";

        generate();
        return false;

    }
}
// Fonction d'inscription pour les clients
function signup() {
    //recuperation des données
    var firstName = getElementById("firstName");
    var isFNValid = checkLength(firstName, 3);
    validateInputs(isFNValid, "firstNameError", "first Name should have at least 3 carac");

    var lastName = getElementById("lastName");
    var isLNValid = checkLength(lastName, 3);
    validateInputs(isLNValid, "lastNameError", "last Name should have at least 3 carac");

    var email = getElementById("email");
    var isEmailValid = checkEmail(email);
    validateInputs(isEmailValid, "emailError", "adress mail is not valid");

    var tel = getElementById("tel");
    var isTelValid = checkTel(tel, 8);
    validateInputs(isTelValid, "telError", "Tel should have 8 carac");

    var adress = getElementById("adr");
    var isADRValid = checkLength(adress, 5);
    validateInputs(isADRValid, "adrError", "adress should have at least 5 carac");

    var pwd = getElementById("pwd");
    var isPwdValid = checkLength(pwd, 6);
    validateInputs(isPwdValid, "pwdError", "pwd should have at least 6 carac");

    //validation(controle de saisie)
    var usersTab = getTabFromLsByKey("users");
    if (isFNValid && isLNValid && isTelValid && isADRValid && isPwdValid && isEmailValid && printmsg()) {
        var usersTab = getTabFromLsByKey("users");
        //creation de l'objet (json)
        var user = {
            id: id(usersTab) + 1,
            firstName: firstName,
            lastName: lastName,
            email: email,
            tel: tel,
            adr: adress,
            pwd: pwd,
            role: "client"
        }
        //save into LS
        // var usersTab = getTabFromLsByKey("users");
        usersTab.push(user);
        localStorage.setItem("users", JSON.stringify(usersTab));
        location.replace("login.html");

    }
}
// Fonction d'inscription pour les propriétaires
function signupOwner() {
    //recuperation des données
    var firstName = getElementById("firstNameOwner");
    var isFNValid = checkLength(firstName, 3);
    validateInputs(isFNValid, "firstNameOwnerError", "first Name should have at least 3 carac");

    var lastName = getElementById("lastNameOwner");
    var isLNValid = checkLength(lastName, 3);
    validateInputs(isLNValid, "lastNameOwnerError", "last Name should have at least 3 carac");

    var email = getElementById("emailOwner");
    var isEmailValid = checkEmail(email);
    validateInputs(isEmailValid, "emailOwnerError", "adress mail is not valid");

    var tel = getElementById("telOwner");
    var isTelValid = checkTel(tel, 8);
    validateInputs(isTelValid, "telOwnerError", "Tel should have 8 carac");

    var adress = getElementById("adrOwner");
    var isADRValid = checkLength(adress, 5);
    validateInputs(isADRValid, "adrOwnerError", "adress should have at least 5 carac");

    var pwd = getElementById("pwdOwner");
    var isPwdValid = checkLength(pwd, 6);
    validateInputs(isPwdValid, "pwdOwnerError", "pwd should have at least 6 carac");

    //validation(controle de saisie)
    var usersTab = getTabFromLsByKey("users");
    if (isFNValid && isLNValid && isTelValid && isADRValid && isPwdValid && isEmailValid && printmsg()) {
        var usersTab = getTabFromLsByKey("users");
        //creation de l'objet (json)
        var user = {
            id: id(usersTab) + 1,
            firstName: firstName,
            lastName: lastName,
            email: email,
            tel: tel,
            adr: adress,
            pwd: pwd,
            role: "owner",
            status: "NOT OK"
        }
        //save into LS
        //var usersTab = getTabFromLsByKey("users");
        usersTab.push(user);
        localStorage.setItem("users", JSON.stringify(usersTab));
        location.replace("login.html");

    }
}
// Fonction d'inscription pour l'administrateur
function signupAdmin() {
    //recuperation des données
    var firstName = getElementById("firstNameAdmin");
    var isFNValid = checkLength(firstName, 4);
    validateInputs(isFNValid, "firstNameErrorAdmin", "first Name should have at least 4 carac");

    var lastName = getElementById("lastNameAdmin");
    var isLNValid = checkLength(lastName, 3);
    validateInputs(isLNValid, "lastNameErrorAdmin", "last Name should have at least 3 carac");

    var email = getElementById("emailAdmin");
    var isEmailValid = checkEmail(email);
    validateInputs(isEmailValid, "emailAdminError", "adress mail is not valid");

    var pwd = getElementById("pwdAdmin");
    var isPwdValid = checkLength(pwd, 6);
    validateInputs(isPwdValid, "pwdErrorAdmin", "pwd should have at least 6 carac");

    //validation(controle de saisie)
    var usersTab = getTabFromLsByKey("users");
    if (isFNValid && isLNValid && isPwdValid && isEmailValid && printmsg()) {
        var usersTab = getTabFromLsByKey("users");
        //creation de l'objet (json)
        var user = {
            id: id(usersTab) + 1,
            firstName: firstName,
            lastName: lastName,
            email: email,
            pwd: pwd,
            role: "admin"
        }
        //save into LS
        // var usersTab = getTabFromLsByKey("users");
        usersTab.push(user);
        localStorage.setItem("users", JSON.stringify(usersTab));
        location.replace("login.html");
    }
}
// Fonction de connexion pour les administrateurs, propriétaires et clients
function login() {
    //recuperation des donnnées
    var email = getElementById("emailLogin");
    var password = getElementById("passwordLogin");
    //recuperer tous les utililasateurs déja enregistrés
    var usersTab = getTabFromLsByKey("users");
    var findedUser;
    for (var i = 0; i < usersTab.length; i++) {
        if ((usersTab[i].email == email) && (usersTab[i].pwd == password)) {
            findedUser = usersTab[i];
            break;
        }
    }
    //l'utilisateur est bien trouvé
    if ((findedUser)) {
        if (findedUser.role == "client") {
            localStorage.setItem("connectedUser", JSON.stringify(findedUser.id));
            location.replace("index.html");

        } else if (findedUser.role == "owner") {
            //le propriétaire n'est pas vérifié
            if (findedUser.status == "NOT OK") {
                document.getElementById("login Error").innerHTML = "owner not yet verified";
                document.getElementById("login Error").style.color = "#f2b0a5";
            } else {
                document.getElementById("login Error").innerHTML = "";
                localStorage.setItem("connectedUser", JSON.stringify(findedUser.id));
                location.replace("owner.html");
            }

        } else {
            //le propriétaire est  vérifié
            document.getElementById("login Error").innerHTML = "";
            localStorage.setItem("connectedUser", JSON.stringify(findedUser.id));
            location.replace("admin.html");
        }
        //l'utilisateur n'est pas trouvé
    } else {
        //affichage d'un msg d'erreur en cas ou l'utilisateur soit non trouvé ou donnée erronée
        document.getElementById("login Error").innerHTML = "";

        document.getElementById("login Error").innerHTML = "incorrect login";
        document.getElementById("login Error").style.color = "#f2b0a5";


    }

}
// Fonction pour ajouter une nouvelle maison d'hôte
function addHouse() {
    //recuperation des donnees
    var connectedUserId = ((localStorage.getItem("connectedUser")));

    var houseName = getElementById("guestHouseName");
    var isHouseNameValid = checkLength(houseName, 3);
    validateInputs(isHouseNameValid, "HouseNameError", "Name should have at least 3 carac");

    var city = getElementById("guestHouseCity");

    var adr = getElementById("guestHouseAdr");
    var isAdrValid = checkLength(adr, 5);
    validateInputs(isAdrValid, "houseAdrError", "adress should have at least 5 carac");

    var area = getElementById("guestHouseArea");
    var isAreaValid = checkNumber(area, 199);
    validateInputs(isAreaValid, "areaError", "area should have at least 200 m²");

    var description = getElementById("guestHouseDescription");
    var isDescriptionValid = checkLength(description, 4);
    validateInputs(isDescriptionValid, "guestHouseDescriptionError", "description should have at least 4 carac");

    if (isHouseNameValid && isAdrValid && isAreaValid && isDescriptionValid) {
        var housesTab = getTabFromLsByKey("houses");
        //creation de l'objet JSON
        var house = {
            id: id(housesTab) + 1,
            name: houseName,
            city: city,
            adr: adr,
            area: area,
            rooms: 0,
            description: description,
            idOwner: connectedUserId
        }
        //save into LS
        // var housesTab = getTabFromLsByKey("houses");
        housesTab.push(house);
        localStorage.setItem("houses", JSON.stringify(housesTab));
        localStorage.setItem('displayHouseId', house.id);
        location.replace("addRoom.html");



    }
}
// Fonction pour afficher dynamiquement les maisons entrées par les propriétaires
function displayHouses() {
    var housesTab = getTabFromLsByKey("houses");
    content = "";
    for (var i = 0; i < housesTab.length; i++) {
        content = content + `
        <div class="col-lg-4 col-md-6">
        <div class="room-item">
            <img src="img/room/room-6.jpg" alt="">
            <div class="ri-text">
                <h4>${housesTab[i].name}</h4>
                <h3>${housesTab[i].city}</h3>
                <table>
                    <tbody>
                        <tr>
                            <td class="r-o">Adress:</td>
                            <td>${housesTab[i].adr}</td>
                        </tr>
                        <tr>
                            <td class="r-o">Area:</td>
                            <td>${housesTab[i].area} m²</td>
                        </tr>
                        
                        <tr>
                            <td class="r-o">Description:</td>
                            <td>${housesTab[i].description}</td>
                        </tr>
                    </tbody>
                </table>
                <a href="#" class="primary-btn" onclick="goToDisplay('${'displayHouseId'}',${housesTab[i].id},'${'rooms.html'}')">Display</a>
            </div>
        </div>
    </div>
        `
    }



    document.getElementById("divHouse").innerHTML = content;

}
// Fonction pour accéder à une page en ajoutant une clé dans le stockage local
function goToDisplay(key, id, html) {
    localStorage.setItem(key, id);
    location.replace(html);
}
// Fonction pour ajouter une nouvelle chambre à une maison d'hôte
function addRoom() {
    //recuperation des donnees
    var houseId = localStorage.getItem("displayHouseId");
    var housesTab = getTabFromLsByKey("houses");
    var house;
    for (var i = 0; i < housesTab.length; i++) {
        if (housesTab[i].id == houseId) {
            house = housesTab[i];
            console.log(house);
            break;
        }
    }

    var roomName = getElementById("roomName");
    var isRoomNameValid = checkLength(roomName, 3);
    validateInputs(isRoomNameValid, "roomNameError", "Name should have at least 3 carac");

    var price = getElementById("pricePerPerson");
    var isPriceValid = checkNumber(price, 0);
    validateInputs(isPriceValid, "roomPriceError", "Price should have at least 1");

    var size = getElementById("roomSize");
    var isSizeValid = checkNumber(size, 15);
    validateInputs(isSizeValid, "roomSizeError", "size should have at least 16 m² ");

    var capacity = getElementById("roomCapacity");
    var isCapacityValid = checkNumber(capacity, 0);
    validateInputs(isCapacityValid, "roomCapacityError", "Room's capacity should be at least 1");

    var bed = getElementById("roomBed");
    var isBedValid = checkNumber(bed, 0);
    validateInputs(isBedValid, "roomBedError", "Room should have at least 1 bed");

    var description = getElementById("roomDescription");
    var isDescriptionValid = checkLength(description, 4);
    validateInputs(isDescriptionValid, "roomDescriptionError", "Description should have at least 4 carac");


    if (isRoomNameValid && isPriceValid && isSizeValid && isCapacityValid && isBedValid && Number(house.rooms) < 5) {
        var roomsTab = getTabFromLsByKey("rooms");
        //creation de l'objet JSON
        var room = {
            id: id(roomsTab) + 1,
            roomName: roomName,
            price: price,
            size: size,
            capacity: capacity,
            bed: bed,
            description: description,
            houseId: houseId,
            dateEntry: currentDate(),
            dateExit: currentDate()
        }
        //save into LS
        house.rooms = Number(house.rooms) + 1;
        localStorage.setItem("houses", JSON.stringify(housesTab));
        roomsTab.push(room);
        localStorage.setItem("rooms", JSON.stringify(roomsTab));

    }
}
// Fonction pour afficher dynamiquement les chambres associées à une maison
function displayRooms() {
    var roomsTab = getTabFromLsByKey("rooms");
    var houseId = (localStorage.getItem("displayHouseId"));
    content = "";
    for (var i = 0; i < roomsTab.length; i++) {
        if (roomsTab[i].houseId == houseId) {
            content = content + `
    <div class="col-lg-4 col-md-6">
                <div class="room-item">
                    <img src="deluxe.img/images/room-2.jpg" alt="">
                    <div class="ri-text">
                        <h4>${roomsTab[i].roomName}</h4>
                        <h3>${roomsTab[i].price}DT/Perperson</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td class="r-o">Size:</td>
                                    <td>${roomsTab[i].size} m²</td>
                                </tr>
                                <tr>
                                    <td class="r-o">Capacity:</td>
                                    <td> <span>Max</span>${roomsTab[i].capacity}<span>person</span></td>
                                </tr>
                                <tr>
                                    <td class="r-o">Bed:</td>
                                    <td>${roomsTab[i].bed} beds</td>
                                </tr>
                                <tr>
                                    <td class="r-o">Description:</td>
                                    <td>${roomsTab[i].description}</td>
                                </tr>
                            </tbody>
                        </table>
                        <a href="#" class="primary-btn" onclick="goToDisplay('${'displayRoomId'}',${roomsTab[i].id},'${'roomDetails.html'}')">display</a>
                    </div>
                </div>
            </div>
            `;
        }


    }
    document.getElementById("divRoom").innerHTML = content;

}
// Fonction pour afficher les détails de la chambre sélectionnée
function displayRoomDetails() {
    //recuperer l'id du chambre selectionné
    var roomId = (localStorage.getItem("displayRoomId"));
    //recuperer tous les chambres enregistrés dans LS
    var roomsTab = getTabFromLsByKey("rooms");
    // recherche de l'obj du chambre selectionné
    var roomAdequat;
    for (var i = 0; i < roomsTab.length; i++) {
        if (roomsTab[i].id == roomId) {
            roomAdequat = roomsTab[i];
            break;
        }
    }
    document.getElementById('roomNameDetails').innerHTML = roomAdequat.roomName;
    document.getElementById('roomPriceDetails').innerHTML = roomAdequat.price + " DT/Perperson";
    document.getElementById('roomSizeDetails').innerHTML = roomAdequat.size;
    document.getElementById('roomCapacityDetails').innerHTML = roomAdequat.capacity;
    document.getElementById('roomBedDetails').innerHTML = roomAdequat.bed;
    document.getElementById('roomDescriptionDetails').innerHTML = roomAdequat.description;
}
//fonction qui va afficher la date d'aujourd'hui
function currentDate() {
    var date = new Date();
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return date.toLocaleString('en-IN', options);
}
// Fonction pour vérifier la disponibilité de la chambre
function checkAvailability() {
    var roomId = (localStorage.getItem("displayRoomId"));
    var room = getFromLsByIdAndKey(roomId, "rooms");
    var dispo = false;
    var entryDate = new Date(getElementById("dateIn"));
    var exitDate = new Date(getElementById("dateOut"));
    var adultsNumber = getElementById("adults");
    var childrenNumber = getElementById("children");
    var guestsNumber = Number(adultsNumber) + Number(childrenNumber);



    var dateEntry = new Date(room.dateEntry);
    var dateExit = new Date(room.dateExit);

    if ((entryDate.getTime() < exitDate.getTime()) &&(validDate(dateEntry, dateExit, entryDate, exitDate)) && (guestsNumber <= Number(room.capacity))) {
        document.getElementById('disponibilityMsg').innerHTML = "";
        document.getElementById('disponibilityMsg').innerHTML = "room is Available";
        document.getElementById('disponibilityMsg').style.color = "#98BF64";
        dispo = true;
    } else {
        document.getElementById('disponibilityMsg').innerHTML = "";
        document.getElementById('disponibilityMsg').innerHTML = "room is not Available";
        document.getElementById('disponibilityMsg').style.color = "#E57373";
    }
    return dispo;
}
//fonction pour valider la disponibilité de la date
function validDate(de, ds, dUe, dUs) {
    return ((dUe.getTime() >= ds.getTime()) && (dUs.getTime() > ds.getTime())) || ((dUe.getTime() < de.getTime()) && (dUs.getTime() <= de.getTime()))

}
// Fonction pour effectuer une réservation de chambre
function bookingNow() {
    //recuperation des données
    var userId = localStorage.getItem("connectedUser");
    var roomId = localStorage.getItem("displayRoomId");

    var entryDate = formateDate(new Date(getElementById("dateIn")));
    var exitDate = formateDate(new Date(getElementById("dateOut")));
    var adultsNumber = getElementById("adults");
    var childrenNumber = getElementById("children");




    if (checkAvailability()) {


        var reservationsTab = getTabFromLsByKey("reservations");
        //creation de l'objet (json)
        var reservation = {
            id: id(reservationsTab) + 1,
            userId: userId,
            roomId: roomId,
            entryDate: entryDate,
            exitDate: exitDate,
            adultsNumber: adultsNumber,
            childrenNumber: childrenNumber,
            status: false
        };

        //save into LS
        reservationsTab.push(reservation);
        localStorage.setItem("reservations", JSON.stringify(reservationsTab));


        document.getElementById("msgErr").innerHTML = "Booking Done";
        document.getElementById("msgErr").style.color = "#98BF64";
    } else {
        document.getElementById('msgErr').innerHTML = "Check Availability";
        document.getElementById('msgErr').style.color = "#E57373";

    }


}
// Fonction pour formater la date
function formateDate(date1) {
    var date = new Date(date1);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
}
//fonction pour afficher mes réservations
function displayReservations() {
    var reservationsTab = getTabFromLsByKey("reservations");
    var connectedUserId = JSON.parse(localStorage.getItem("connectedUser"));

    content = "";
    for (var i = 0; i < reservationsTab.length; i++) {
        if (reservationsTab[i].userId == connectedUserId) {
            var room = getFromLsByIdAndKey(reservationsTab[i].roomId, "rooms");
            console.log(reservationsTab[i].roomId);
            console.log(room);
            var entryDate = new Date(reservationsTab[i].entryDate);
            var exitDate = new Date(reservationsTab[i].exitDate);
            var periodInMilliseconds = exitDate - entryDate;
            var periodInDays = periodInMilliseconds / (1000 * 60 * 60 * 24);
            var numberOfGuests = Number(reservationsTab[i].adultsNumber) + Number(reservationsTab[i].childrenNumber)
            var totalPrice = Number(room.price) * periodInDays * numberOfGuests;
            content = content + `
                            <tr>
                                <td>
                                    <div class="media">
                                       
                                        <div class="media-body">
                                            <p>${room.roomName}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>${reservationsTab[i].entryDate}</h5>
                                </td>
                                <td>
                                    <h5>${reservationsTab[i].exitDate}</h5>
                                </td>
                                <td>
                                    <h5>${room.price} DT</h5>
                                </td>
                                <td>
                                    <h5>${reservationsTab[i].adultsNumber}</h5>
                                </td>
                                <td>
                                    <h5>${reservationsTab[i].childrenNumber}</h5>
                                </td>
                                <td>
                                    <h5>${totalPrice} DT</h5>
                                </td>
                                <td>
                                    <h5>${reservationsTab[i].status ? "Confirmed" : "not Confirmed"}</h5>
                                </td>
                                <td class="row">
                                <div>
                                    <button type="button" ${reservationsTab[i].status ? "disabled" : null} class="btn btn-outline-danger" onclick="deleteObjByIdAndKey(${reservationsTab[i].id}, '${'reservations'}')()"><i class="fa fa-trash"></i></button>
                                </div>
                                <div style="padding-left :10px;padding-right:10px">
                                    <h5 class="text-${validDate(new Date(room.dateEntry),new Date(room.dateExit),new Date(reservationsTab[i].entryDate),new Date(reservationsTab[i].exitDate)) ? "success" : "danger"}">${validDate(new Date(room.dateEntry),new Date(room.dateExit),new Date(reservationsTab[i].entryDate),new Date(reservationsTab[i].exitDate)) ? "dispo" : "non dispo"}</h5>
                                </div>
                                <div>
                                    <button type="button"  ${reservationsTab[i].status || validDate(new Date(room.dateEntry),new Date(room.dateExit),new Date(reservationsTab[i].entryDate),new Date(reservationsTab[i].exitDate))==false ? "disabled" : null} class="btn btn-outline-success" onclick="confirmReservation(${reservationsTab[i].id})"><i class="fa-regular fa-circle-check"></i></button>
                                </div>
                                </td>
                                
                            </tr>
        `;
        }
    }
    document.getElementById("divReservation").innerHTML = content;
}
// Fonction pour supprimer un élément du tableau dans le stockage local en utilisant l'ID et la clé
function deleteObjByIdAndKey(id, key) {
    var pos;
    var T = getTabFromLsByKey(key);
    for (var i = 0; i < T.length; i++) {
        if (T[i].id === id) {
            pos = i;
            break;
        }
    }
    T.splice(pos, 1);
    localStorage.setItem((key), JSON.stringify(T));
    location.reload();
}
// Fonction pour confirmer une réservation et mettre à jour la date de disponibilité
function confirmReservation(id) {
    reservationsTab = getTabFromLsByKey("reservations");

    for (var i = 0; i < reservationsTab.length; i++) {
        var roomsTab = getTabFromLsByKey("rooms");;
        for (var j = 0; j < roomsTab.length; j++) {
            if (roomsTab[j].id == reservationsTab[i].roomId) {
                roomAdequat = roomsTab[j];
                break;
            }
        }
        if ((reservationsTab[i].id == id) && (validDate(new Date(roomAdequat.dateEntry), new Date(roomAdequat.dateExit), new Date(reservationsTab[i].entryDate), new Date(reservationsTab[i].exitDate)))) {
            reservationsTab[i].status = true;
            roomAdequat.dateEntry = reservationsTab[i].entryDate;
            roomAdequat.dateExit = reservationsTab[i].exitDate;
            localStorage.setItem("reservations", JSON.stringify(reservationsTab));
            localStorage.setItem("rooms", JSON.stringify(roomsTab));
            location.reload();
            break;
        }
    }
}
// Fonction pour générer un en-tête dynamique en fonction du role de l'utilisateur
function generateHeader() {
    var connectedUserId = localStorage.getItem("connectedUser");
    var connectedUser = getFromLsByIdAndKey(connectedUserId, 'users')
    var content = ``;
    if (connectedUser) {
        if (connectedUser.role == "client") {
            content = `
            <nav class="mainmenu">
                <ul>
                    <li class="active"><a href="./index.html">Home</a></li>
                    <li ><a href="./houses.html">Houses</a></li>
                    <li><a href="./contact.html">Contact</a></li>
                    <li><a href="./profile.html">Hello ${connectedUser.firstName} ${connectedUser.lastName}!</a></li>
                    <li><a href="./reservations.html">Reservations</a></li>
                    <li><a href="./index.html" onclick='logOut()'>Logout</a></li>

                </ul>
            </nav>
`
        } else if (connectedUser.role == "owner") {
            content = `
            <nav class="mainmenu">
                <ul>
                    <li><a href="./index.html">Home</a></li>
                    <li ><a href="./addHouse.html">add House</a></li>
                    <li ><a href="./addRoom.html">add Room</a></li>
                    <li><a href="./profile.html">Hello ${connectedUser.firstName} ${connectedUser.lastName}!</a></li>
                    <li class="active"><a href="./owner.html">Dashboard</a></li>
                    <li><a href="./index.html" onclick='logOut()'>Logout</a></li>

                </ul>
            </nav>
`
        } else {
            content = `
            <nav class="mainmenu">
                <ul>
                    <li><a href="./index.html">Home</a></li>
                    <li><a href="./profile.html">Hello admin!</a></li>
                    <li class="active"><a href="./admin.html">Dashboard</a></li>
                    <li><a href="./index.html" onclick='logOut()'>Logout</a></li>

                </ul>
            </nav>
`
        }

    } else {
        content = `
                    <nav class="mainmenu">
                        <ul>
                            <li class="active"><a href="./index.html">Home</a></li>
                            <li><a href="./houses.html">Houses</a></li>
                            <li><a href="./contact.html">Contact</a></li>
                            <li><a href="./signup.html">Client</a></li>
                            <li><a href="./signupOwner.html">Owner</a></li>
                            <li><a href="./login.html" >Login</a></li>
                               
                        </ul>
                    </nav>
        `
    }
    document.getElementById("headerDiv").innerHTML = content;
}
// Fonction pour déconnecter les utilisateurs
function logOut() {
    localStorage.removeItem("connectedUser");
}
// Fonction pour afficher tous les utilisateurs dans la page admin
function displayUsersAdmin() {
    var usersTab = getTabFromLsByKey("users");

    var content = "";
    for (var i = 0; i < usersTab.length; i++) {
        if (usersTab[i].role == "client") {
            content = content + `
            <tr>
            <td>
                <div class="media-body">
                    <p>${usersTab[i].id}</p>
                </div>
            </td>
            <td>
                <div class="media">
                    
                    <div class="media-body">
                        <p>${usersTab[i].firstName}</p>
                        <p>${usersTab[i].lastName}</p>
                    </div>
                </div>
            </td>
            <td>
                <h5>${usersTab[i].email}</h5>
            </td>
            <td>
                <h5>${usersTab[i].tel}</h5>
            </td>
            <td>
                <h5>${usersTab[i].role}</h5>
            </td>
            <td>
                <h5></h5>
            </td>
            <td>
                <button type="button"  class="btn btn-outline-danger"  onclick="deleteClientAdmin(${usersTab[i].id})"><i class="fa fa-trash"></i></button>

            </td>
           
        </tr>
        `;
        } else if (usersTab[i].role == "owner") {
            if (usersTab[i].status == "OK") {
                content = content + `
                <tr>
                <td>
                    <div class="media-body">
                        <p>${usersTab[i].id}</p>
                    </div>
                </td>
                <td>
                    <div class="media">
                        
                        <div class="media-body">
                            <p>${usersTab[i].firstName}</p>
                            <p>${usersTab[i].lastName}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <h5>${usersTab[i].email}</h5>
                </td>
                <td>
                    <h5>${usersTab[i].tel}</h5>
                </td>
                <td>
                    <h5>${usersTab[i].role}</h5>
                </td>
                <td>
                    <h5>${usersTab[i].status}</h5>
                </td>
                <td>
                    <button type="button"  class="btn btn-outline-danger"  onclick="deleteOwnerAdmin(${usersTab[i].id})"><i class="fa fa-trash"></i></button>
    
                </td>
               
            </tr>
            `;
            } else {
                content = content + `
                <tr>
                    <td>
                        <div class="media-body">
                            <p>${usersTab[i].id}</p>
                        </div>
                    </td>
                    <td>
                        <div class="media">
                            
                            <div class="media-body">
                                <p>${usersTab[i].firstName}</p>
                                <p>${usersTab[i].lastName}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <h5>${usersTab[i].email}</h5>
                    </td>
                    <td>
                        <h5>${usersTab[i].tel}</h5>
                    </td>
                    <td>
                        <h5>${usersTab[i].role}</h5>
                    </td>
                    <td>
                        <h5>${usersTab[i].status}</h5>
                    </td>
                    <td>
                        <div style="padding-bottom:10px;">
                            <button type="button"  class="btn btn-outline-danger" onclick="deleteObjByIdAndKey(${usersTab[i].id},'${'users'}')"><i class="fa fa-trash"></i></button>
                        </div>
                        <div>                   
                            <button type="button"  class="btn btn-outline-success" onclick="validate(${usersTab[i].id})"><i class="fa-regular fa-circle-check"></i></button>                
                        </div>

                    </td>
            

                </tr>
                `;
            }
        }
    }
    document.getElementById("divUser").innerHTML = content;
}
// Fonction pour valider les propriétaires à partir de l'administrateur
function validate(id) {
    var usersTab = getTabFromLsByKey("users");
    for (var i = 0; i < usersTab.length; i++) {
        if (usersTab[i].id == id) {
            usersTab[i].status = "OK";
            break;
        }
    }
    localStorage.setItem("users", JSON.stringify(usersTab));
    location.reload();
}
// Fonction pour afficher toutes les maisons à l'administrateur
function displayAdminHouses() {
    var housesTab = getTabFromLsByKey("houses");

    var content = "";
    for (var i = 0; i < housesTab.length; i++) {
        var owner = getFromLsByIdAndKey(housesTab[i].idOwner, "users");

        content = content + `
            <tr>
            <td>
                <div class="media-body">
                    <p>${housesTab[i].id}</p>
                </div>
            </td>
            <td>
                <div class="media">
                    
                    <div class="media-body">
                        <p>${housesTab[i].name}</p>
                    </div>
                </div>
            </td>
            <td>
                <h5>${owner.firstName}</h5>
                <h5>${owner.lastName}</h5>
            </td>
            <td>
                <h5>${housesTab[i].city}</h5>
            </td>
            <td>
                <h5>${housesTab[i].adr}</h5>
            </td>
            <td>
                <h5>${housesTab[i].area} m²</h5>
            </td>
            <td>
                <h5>${housesTab[i].description}</h5>
            </td>
            
            <td>
                <div style="padding-bottom:10px;">
                    <button type="button"  class="btn btn-outline-danger" onclick="deleteHouseAdmin(${i})"><i class="fa fa-trash"></i></button>
                </div>
                <div>
                    <button type="button"  class="btn btn-outline-success"onclick="editHouseByAdmin(${housesTab[i].id})"><i class="fa fa-edit"></i></button>
                </div>
            </td>
           

        </tr>
        `;
    }
    document.getElementById("divHouse").innerHTML = content;
}
// Fonction qui permet à l'administrateur de supprimer une maison ainsi que ses chambres et les réservations associées
function deleteHouseAdmin(pos) {
    var housesTab = getTabFromLsByKey("houses");
    var house = housesTab[pos];
    house.rooms = Number(house.rooms) - 1;

    var roomsTab = getTabFromLsByKey("rooms");
    var newRooms = [];
    for (var j = 0; j < roomsTab.length; j++) {
        if (roomsTab[j].houseId != house.id) {
            newRooms.push(roomsTab[j])
        }
    }
    var reservationsTab = getTabFromLsByKey("reservations");
    var newRes = [];
    for (var i = 0; i < newRooms.length; i++) {
        for (var j = 0; j < reservationsTab.length; j++) {
            if (newRooms[i].id == reservationsTab[j].roomId) {
                newRes.push(reservationsTab[j])
            }
        }
    }

    localStorage.setItem("reservations", JSON.stringify(newRes));
    localStorage.setItem("rooms", JSON.stringify(newRooms));
    housesTab.splice(pos, 1);
    localStorage.setItem("houses", JSON.stringify(housesTab));
    location.reload();
}
// Fonction qui permet à l'administrateur d'éditer une maison
function editHouseByAdmin(id) {
    var house = getFromLsByIdAndKey(id, "houses")
    var form = `
    <div >

        <div class="login_form_inner " style="padding-bottom: 100px" >
        <h3>Edit House</h3>
        <div class="row login_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
            <div class="col-md-12 form-group">
                <input type="text" class="form-control" value="${house.name}" id="HouseNameEdit">
            </div>
            <div class="col-md-12 form-group">
                <input type="text" class="form-control" value="${house.area}" id="HouseAreaEdit">
            </div>
            
            <div class="col-md-12 form-group">
                <button type="submit" value="submit" class="primary-btn" onclick="validateEditHouse(${house.id})">validate</button>

            </div>
        </div>

    </div>
    </div>
    
    `
    document.getElementById("formId").innerHTML = form;
}
// Fonction qui permet à l'administrateur de valider la modification des maisons
function validateEditHouse(id) {
    //recuperation des données entrées par input
    var name = getElementById("HouseNameEdit");
    var area = getElementById("HouseAreaEdit");
    //recuperation des produits et recherche de l'elem
    var housesTab = getTabFromLsByKey("houses");
    for (var i = 0; i < housesTab.length; i++) {
        if (housesTab[i].id == id) {
            //modification des valeurs
            housesTab[i].name = name;
            housesTab[i].area = area;
            break;
        }
    }
    //enregistrer les nouvelles valeurs
    localStorage.setItem("houses", JSON.stringify(housesTab));
    console.log(housesTab);
    location.reload();
}
// Fonction pour afficher toutes les chambres à l'administrateur
function displayAdminRooms() {
    var roomsTab = getTabFromLsByKey("rooms");

    var content = "";
    for (var i = 0; i < roomsTab.length; i++) {
        var house = getFromLsByIdAndKey(roomsTab[i].houseId, "houses");


        content = content + `
            <tr>
            <td>
                <div class="media-body">
                    <p>${roomsTab[i].id}</p>
                </div>
            </td>
            <td>
                <div class="media-body">
                    <p>${house.name}</p>
                    <p>${house.city}</p>
                </div>
            </td>
            <td>
                <div class="media-body">
                    <p>${roomsTab[i].roomName}</p>
                </div>
            </td>
            
            <td>
                <h5>${roomsTab[i].size} m²</h5>
            </td>
            <td>
                <h5>${roomsTab[i].capacity}</h5>
            </td>
            <td>
                <h5>${roomsTab[i].bed} </h5>
            </td>
            <td>
                <h5>${roomsTab[i].price} </h5>
            </td>
            <td>
                <h5 class="text-center">${roomsTab[i].description}</h5>
            </td>
            
            <td>
            <div style="padding-bottom:10px;">
                <button type="button"  class="btn btn-outline-danger" onclick="deleteRoomAdmin(${roomsTab[i].id})"><i class="fa fa-trash"></i></button>
            </div>
            <div> 
                <button type="button"  class="btn btn-outline-success"onclick="editRoom(${roomsTab[i].id},'${'rooms'}')"><i class="fa fa-edit"></i></button>
            </div>
            </td>
           

        </tr>
        `;



    }
    document.getElementById("divRoom").innerHTML = content;

}
// Fonction qui permet à l'admin et au propriétaire d'éditer les chambres
function editRoom(id, key) {
    var ch = getFromLsByIdAndKey(id, key)
    var form = `
    <div >

        <div class="login_form_inner " style="padding-bottom: 100px" >
        <h3>Edit Room</h3>
        <div class="row login_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
            <div class="col-md-12 form-group">
                <input type="text" class="form-control" value="${ch.roomName}" id="RoomNameEdit">
            </div>
            <div class="col-md-12 form-group">
                <input type="text" class="form-control" value="${ch.capacity}" id="roomCapacityEdit">
            </div>
            <div class="col-md-12 form-group">
                <input type="number" class="form-control" value="${ch.bed}" id="roomBedEdit">
            </div>
            <div class="col-md-12 form-group">
                <input type="number" class="form-control" value="${ch.price}" id="roomPriceEdit">
            </div>
            <div class="col-md-12 form-group">
                <button type="submit" value="submit" class="primary-btn" onclick="validateEditRoom(${ch.id})">validate</button>

            </div>
        </div>

    </div>
    </div>
    
    `
    document.getElementById("formRoomId").innerHTML = form;
}
// Fonction qui permet à l'admin de valider l'édition des chambres
function validateEditRoom(id) {
    //recuperation des données entrées par input
    var name = getElementById("RoomNameEdit");
    var capacity = getElementById("roomCapacityEdit");
    var bed = getElementById("roomBedEdit");
    var price = getElementById("roomPriceEdit");
    //recuperation des produits et recherche de l'elem
    var roomsTab = getTabFromLsByKey("rooms");
    for (var i = 0; i < roomsTab.length; i++) {
        if (roomsTab[i].id == id) {
            //modification des valeurs
            roomsTab[i].roomName = name;
            roomsTab[i].capacity = capacity;
            roomsTab[i].bed = bed;
            roomsTab[i].price = price;
            break;
        }
    }
    //enregistrer les nouvelles valeurs
    localStorage.setItem("rooms", JSON.stringify(roomsTab));
    location.reload();
}
// Fonction pour supprimer une chambre avec ses réservations par l'administrateur
function deleteRoomAdmin(id) {
    var roomsTab = getTabFromLsByKey("rooms");
    var pos;
    for (var i = 0; i < roomsTab.length; i++) {
        if (roomsTab[i].id == id) {
            pos = i;
            break;
        }
    }
    var room = roomsTab[pos];
    var reservationsTab = getTabFromLsByKey("reservations");
    var housesTab = getTabFromLsByKey("houses");
    var newRes = [];

    for (var j = 0; j < reservationsTab.length; j++) {
        if (reservationsTab[j].roomId != room.id) {
            newRes.push(reservationsTab[j])
        }
    }

    localStorage.setItem("reservations", JSON.stringify(newRes));

    for (var j = 0; j < housesTab.length; j++) {
        if (housesTab[j].id == room.houseId) {
            housesTab[j].rooms = Number(housesTab[j].rooms) - 1;
        }
    }
    roomsTab.splice(pos, 1);
    localStorage.setItem("rooms", JSON.stringify(roomsTab));
    localStorage.setItem("houses", JSON.stringify(housesTab));
    location.reload();
}
// Fonction pour afficher toutes les réservations à l'administrateur
function displayAllReservations() {
    var reservationsTab = getTabFromLsByKey("reservations");

    var content = "";
    for (var i = 0; i < reservationsTab.length; i++) {
        if (reservationsTab[i].status) {
            var room = getFromLsByIdAndKey(reservationsTab[i].roomId, "rooms");
            var entryDate = new Date(reservationsTab[i].entryDate);
            var exitDate = new Date(reservationsTab[i].exitDate);
            var periodInMilliseconds = exitDate - entryDate;
            var periodInDays = periodInMilliseconds / (1000 * 60 * 60 * 24);
            var numberOfGuests = Number(reservationsTab[i].adultsNumber) + Number(reservationsTab[i].childrenNumber)
            var totalPrice = (Number(room.price)) * periodInDays * numberOfGuests;
            var user = getFromLsByIdAndKey(reservationsTab[i].userId, "users");

            content = content + `
            <tr>
            <td>
                <div class="media">
                   
                    <div class="media-body">
                        <p>${reservationsTab[i].id}</p>
                    </div>
                </div>
            </td>
            <td>
                <div class="media">
                   
                    <div class="media-body">
                        <p>${user.firstName}</p>
                        <p>${user.lastName}</p>
                    </div>
                </div>
            </td>
            <td>
                <div class="media">
                   
                    <div class="media-body">
                        <p>${room.id}</p>
                    </div>
                </div>
            </td>
            <td>
                <div class="media">
                   
                    <div class="media-body">
                        <p>${room.roomName}</p>
                    </div>
                </div>
            </td>
            <td>
                <h5>${reservationsTab[i].entryDate}</h5>
            </td>
            <td>
                <h5>${reservationsTab[i].exitDate}</h5>
            </td>
            <td>
                <h5>${room.price} DT</h5>
            </td>
            <td>
                <h5>${reservationsTab[i].adultsNumber}</h5>
            </td>
            <td>
                <h5>${reservationsTab[i].childrenNumber}</h5>
            </td>
            <td>
                <h5>${totalPrice} DT</h5>
            </td>
            
            <td >
                <button type="button"  class="btn btn-outline-danger"onclick="deleteObjByIdAndKey(${reservationsTab[i].id},'${'reservations'}')"><i class="fa fa-trash"></i></button>

            </td>
            
        </tr>
`;
        }



    }
    document.getElementById("divAllReservations").innerHTML = content;
}
// Fonction qui permet à l'administrateur de supprimer un client ainsi que ses réservations effectuées
function deleteClientAdmin(id) {
    var usersTab = getTabFromLsByKey("users");
    var pos;
    for (var i = 0; i < usersTab.length; i++) {
        if (usersTab[i].id == id) {
            pos = i;
            break;
        }
    }
    var reservationsTab = getTabFromLsByKey("reservations");
    for (var i = 0; i < reservationsTab.length; i++) {
        if (reservationsTab[i].userId == id) {
            posRes = i;
            break;
        }
    }
    reservationsTab.splice(posRes, 1);
    localStorage.setItem("reservations", JSON.stringify(reservationsTab));

    usersTab.splice(pos, 1);
    localStorage.setItem("users", JSON.stringify(usersTab));
    location.reload();


}
// Fonction pour supprimer le propriétaire avec ses maisons et chambres ansi que réservations effectuées par l'administrateur
function deleteOwnerAdmin(id) {
    var usersTab = getTabFromLsByKey("users");
    var posOwner;
    for (var i = 0; i < usersTab.length; i++) {
        if (usersTab[i].id == id) {
            posOwner = i;
            break;
        }
    }
    var newHouse = [];
    var housesTab = getTabFromLsByKey("houses");
    for (var j = 0; j < housesTab.length; j++) {
        if (housesTab[j].idOwner != id) {
            newHouse.push(housesTab[j])
        }
    }

    var roomsTab = getTabFromLsByKey("rooms");
    var newRooms = [];
    for (var i = 0; i < newHouse.length; i++) {
        for (var j = 0; j < roomsTab.length; j++) {
            if (newHouse[i].id == roomsTab[j].houseId) {
                newRooms.push(roomsTab[j])
            }
        }
    }

    var reservationsTab = getTabFromLsByKey("reservations");
    var newRes = [];
    for (var i = 0; i < newRooms.length; i++) {
        for (var j = 0; j < reservationsTab.length; j++) {
            if (newRooms[i].id == reservationsTab[j].roomId) {
                newRes.push(reservationsTab[j])
            }
        }
    }

    localStorage.setItem("reservations", JSON.stringify(newRes));
    localStorage.setItem("rooms", JSON.stringify(newRooms));
    localStorage.setItem("houses", JSON.stringify(newHouse));
    usersTab.splice(posOwner, 1);
    localStorage.setItem("users", JSON.stringify(usersTab));
    location.reload()
}
// Fonction pour afficher les maisons au propriétaire
function displayOwnerHouses() {
    var housesTab = getTabFromLsByKey("houses");
    var connectedUserId = ((localStorage.getItem("connectedUser")));
    var myHouses = [];
    var content = "";
    for (var i = 0; i < housesTab.length; i++) {
        if (housesTab[i].idOwner == connectedUserId) {
            myHouses.push(housesTab[i])
        }
    }
    for (var i = 0; i < myHouses.length; i++) {
        content = content + `
        <tr>
        <td>
            <div class="media-body">
                <p>${myHouses[i].id}</p>
            </div>
        </td>
        <td>
            <div class="media">
                
                <div class="media-body">
                    <p>${myHouses[i].name}</p>
                </div>
            </div>
        </td>
        
        <td>
            <h5>${myHouses[i].city}</h5>
        </td>
        <td>
            <h5>${myHouses[i].adr}</h5>
        </td>
        <td>
            <h5>${myHouses[i].area} m²</h5>
        </td>
       
        <td>
            <h5>${myHouses[i].description}</h5>
        </td>
        
        <td>
            <div style="padding-bottom:10px;">
                <button type="button"  class="btn btn-outline-danger" onclick="deleteHouseAdmin(${i})"><i class="fa fa-trash"></i></button>
            </div >
            <div style="padding-bottom:10px;">
                <button type="button"  class="btn btn-outline-success" onclick="editHouseByAdmin(${myHouses[i].id})"><i class="fa fa-edit"></i></button>
            </div>
            <div>
                <button type="button"  class="btn btn-outline-primary" onclick="addRoomByOwner(${myHouses[i].id})"><i class="fa-solid fa-circle-plus"></i></button>
            </div>

        </td>
       

    </tr>
    `;
    }
    document.getElementById("divHouseOwner").innerHTML = content;
    localStorage.setItem("myHouses", JSON.stringify(myHouses));


}
//Fonction pour ajouter une chambre a une maison deja ajoutée par propriétaire
function addRoomByOwner(id) {
    localStorage.setItem("displayHouseId", JSON.stringify(id));
    location.replace("addRoom.html");

}
// Fonction pour afficher les chambres au propriétaire
function displayOwnerRooms() {
    var roomsTab = getTabFromLsByKey("rooms");
    var myHouses = getTabFromLsByKey("myHouses");

    var myRooms = [];
    var content = "";

    for (var i = 0; i < myHouses.length; i++) {
        for (var j = 0; j < roomsTab.length; j++) {
            if (roomsTab[j].houseId == myHouses[i].id) {
                myRooms.push(roomsTab[j])
            }
        }
    }
    localStorage.setItem("myRooms", JSON.stringify(myRooms));


    for (var i = 0; i < myRooms.length; i++) {
        var house = getFromLsByIdAndKey(myRooms[i].houseId, "houses");

        content = content + `
        <tr>
        <td>
            <div class="media-body">
                <p>${myRooms[i].id}</p>
            </div>
        </td>
        
        <td>
            <div class="media-body">
                <p>${house.name}</p>
                <p>${house.city}</p>
            </div>
        </td>
        <td>
            <div class="media-body">
                <p>${myRooms[i].roomName}</p>
            </div>
        </td>
        
        <td>
            <h5>${myRooms[i].size} m²</h5>
        </td>
        <td>
            <h5>${myRooms[i].capacity}</h5>
        </td>
        <td>
            <h5>${myRooms[i].bed} </h5>
        </td>
        <td>
            <h5>${myRooms[i].price} </h5>
        </td>
        <td>
            <h5 class="text-center">${myRooms[i].description}</h5>
        </td>
        
        <td>
            <div style="padding-bottom:10px;">
                <button type="button"  class="btn btn-outline-danger" onclick="deleteRoomOwner(${myRooms[i].id})"><i class="fa fa-trash"></i></button>
            </div>
            <div>
                <button type="button"  class="btn btn-outline-success"onclick="editRoom(${myRooms[i].id},'${'myRooms'}')"><i class="fa fa-edit"></i></button>
            </div>
        </td>
       

    </tr>
        `;

    }

    document.getElementById("divRoomOwner").innerHTML = content;


}
// Fonction pour supprimer la chambre avec ses réservations (propriétaire)
function deleteRoomOwner(id) {
    var mypos;
    var pos;
    var myRooms = getTabFromLsByKey("myRooms");
    var roomsTab = getTabFromLsByKey("rooms");
    var reservationsTab = getTabFromLsByKey("reservations");
    var newRes = [];

    for (var i = 0; i < myRooms.length; i++) {
        if (myRooms[i].id == id) {
            mypos = i;
        }
    }
    for (var i = 0; i < roomsTab.length; i++) {
        if (roomsTab[i].id == id) {
            pos = i;
        }
    }


    var room = myRooms[mypos];
    for (var j = 0; j < reservationsTab.length; j++) {
        if (reservationsTab[j].roomId != room.id) {
            newRes.push(reservationsTab[j])
        }
    }
    var housesTab = getTabFromLsByKey("houses");
    for (var j = 0; j < housesTab.length; j++) {
        if (housesTab[j].id == room.houseId) {
            housesTab[j].rooms = Number(housesTab[j].rooms) - 1;
        }
    }

    localStorage.setItem("houses", JSON.stringify(housesTab));
    localStorage.setItem("reservations", JSON.stringify(newRes));
    myRooms.splice(mypos, 1);
    localStorage.setItem("myRooms", JSON.stringify(myRooms));
    roomsTab.splice(pos, 1);
    localStorage.setItem("rooms", JSON.stringify(roomsTab));
    location.reload();





}
// Fonction pour afficher les réservations au propriétaire
function displayOwnerReservations() {
    var myRooms = getTabFromLsByKey("myRooms");
    var reservationsTab = getTabFromLsByKey("reservations");

    var myReservations = [];
    var content = "";

    for (var i = 0; i < myRooms.length; i++) {
        for (var j = 0; j < reservationsTab.length; j++) {
            if ((myRooms[i].id == reservationsTab[j].roomId)) {
                myReservations.push(reservationsTab[j])
            }
        }
    }
    localStorage.setItem("myReservations", JSON.stringify(myReservations));

    console.log(myRooms);
    console.log(myReservations);

    for (var i = 0; i < myReservations.length; i++) {
        if (myReservations[i].status) {
            var room = getFromLsByIdAndKey(myReservations[i].roomId, "rooms");
            var entryDate = new Date(myReservations[i].entryDate);
            var exitDate = new Date(myReservations[i].exitDate);
            var periodInMilliseconds = exitDate - entryDate;
            var periodInDays = periodInMilliseconds / (1000 * 60 * 60 * 24);
            var numberOfGuests = Number(myReservations[i].adultsNumber) + Number(myReservations[i].childrenNumber)
            var totalPrice = room.price * periodInDays * numberOfGuests;
            var user = getFromLsByIdAndKey(myReservations[i].userId, "users");

            content = content + `
            <tr>
            <td>
                <div class="media">
                   
                    <div class="media-body">
                        <p>${myReservations[i].id}</p>
                    </div>
                </div>
            </td>
            <td>
                <div class="media">
                   
                    <div class="media-body">
                        <p>${user.firstName}</p>
                        <p>${user.lastName}</p>
                    </div>
                </div>
            </td>
            <td>
                <div class="media">
                   
                    <div class="media-body">
                        <p>${room.id}</p>
                    </div>
                </div>
            </td>
            <td>
                <div class="media">
                   
                    <div class="media-body">
                        <p>${room.roomName}</p>
                    </div>
                </div>
            </td>
            <td>
                <h5>${myReservations[i].entryDate}</h5>
            </td>
            <td>
                <h5>${myReservations[i].exitDate}</h5>
            </td>
            <td>
                <h5>${room.price} DT</h5>
            </td>
            <td>
                <h5>${myReservations[i].adultsNumber}</h5>
            </td>
            <td>
                <h5>${myReservations[i].childrenNumber}</h5>
            </td>
            <td>
                <h5>${totalPrice} DT</h5>
            </td>
            
            <td >
                <button type="button"  class="btn btn-outline-danger"onclick="deleteObjByIdAndKey(${myReservations[i].id},'${'myReservations'}')"><i class="fa fa-trash"></i></button>

            </td>
            
        </tr>
`;

        }

        document.getElementById("divResOwner").innerHTML = content;


    }
}
// Fonction pour afficher les données de l'utilisateur dans son profil
function displayProfile() {
    var content = '';
    //recuperer l'id d'utilisateur connecté
    var connectedUserId = (localStorage.getItem("connectedUser"));

    // recherche de l'obj du user selectionné
    var userAdequat = getFromLsByIdAndKey(connectedUserId, "users");
    if (userAdequat.role == "admin") {
        content = `
        <table style="margin-top: 75px;" >
            <tbody>
                <tr style="display: flex;">
                    <td class="r-o"><h3 style="color: #708090;">First Name:</h3></td>
                    <td><h3>${userAdequat.firstName}</h3> </td>
                </tr>
                <tr style="display: flex;">
                    <td class="r-o"><h3 style="color: #708090;">Last Name:</h3></td>
                    <td><h3>${userAdequat.lastName}</h3></td>
                </tr>
                <tr style="display: flex;">
                    <td class="r-o"><h3 style="color: #708090;">Email:</h3></td>
                    <td ><h3>${userAdequat.email}</h3></td>
                </tr>
                
            </tbody>
        </table>
        <div style="padding-left: 125px;">
            <button type="button" class="btn btn-outline-secondary" onclick="EditProfileStore(${userAdequat.id})">Edit Profile</button>
        </div>

        `;
    } else {
        content = `
        <table style="margin-top: 30px;" >
            <tbody>
                <tr style="display: flex;">
                    <td class="r-o"><h3 style="color: #708090;">First Name:</h3></td>
                    <td><h3>${userAdequat.firstName}</h3> </td>
                </tr>
                <tr style="display: flex;">
                    <td class="r-o"><h3 style="color: #708090;">Last Name:</h3></td>
                    <td><h3>${userAdequat.lastName}</h3></td>
                </tr>
                <tr style="display: flex;">
                    <td class="r-o"><h3 style="color: #708090;">Email:</h3></td>
                    <td ><h3>${userAdequat.email}</h3></td>
                </tr>
                <tr style="display: flex;">
                    <td class="r-o"><h3 style="color: #708090;">Phone:</h3></td>
                    <td ><h3>${userAdequat.tel}</h3></td>
                </tr>
                <tr style="display: flex;">
                    <td class="r-o"><h3 style="color: #708090;">Adress:</h3></td>
                    <td ><h3>${userAdequat.adr}</h3></td>
                </tr>
                
            </tbody>
        </table>
        <div style="padding-left: 125px;">
            <button type="button" style="width:150px;height:50px" class="btn btn-outline-secondary" onclick="EditProfileStore(${userAdequat.id})" >Edit Profile</button>
        </div>
        
        
        `;
    }
    document.getElementById('divProfile').innerHTML = content;



}
// Fonction pour éditer le profil
function EditProfileStore(id) {
    var user = getFromLsByIdAndKey(id, "users")
    if (user.role == "admin") {
        var form = `
    <div class="login_form_inner" style="padding-bottom: 100px" >
		<h3>Edit Profile</h3>
	    <div class="row login_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
			<div class="col-md-12 form-group">
				<input type="text" class="form-control" value="${user.firstName}" id="firstNameEdit">
			</div>
            <div class="col-md-12 form-group">
				<input type="text" class="form-control" value="${user.lastName}" id="lastNameEdit">
			</div>
			<div class="col-md-12 form-group">
				<input type="email" class="form-control" value="${user.email}" id="emailEdit">
			</div>
			<div class="col-md-12 form-group">
                <button type="submit" value="submit" class="primary-btn" onclick="validateEditProfile(${user.id})">validate</button>

            </div>
		</div>
    </div>
    `;
    } else {
        var form = `
        <div class="login_form_inner" style="padding-bottom: 100px" >
		<h3>Edit Profile</h3>
	    <div class="row login_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
			<div class="col-md-12 form-group">
				<input type="text" class="form-control" value="${user.firstName}" id="firstNameEdit">
			</div>
            <div class="col-md-12 form-group">
				<input type="text" class="form-control" value="${user.lastName}" id="lastNameEdit">
			</div>
			<div class="col-md-12 form-group">
				<input type="email" class="form-control" value="${user.email}" id="emailEdit">
			</div>
			<div class="col-md-12 form-group">
				<input type="tel" class="form-control" value="${user.tel}" id="telEdit">
			</div>
			<div class="col-md-12 form-group">
				<input type="adr" class="form-control" value="${user.adr}" id="adrEdit">
			</div>
			<div class="col-md-12 form-group">
                <button type="submit" value="submit" class="primary-btn" onclick="validateEditProfile(${user.id})">validate</button>

            </div>
		</div>
    </div>
        `;
    }

    document.getElementById("formProfil").innerHTML = form;
}
// Fonction pour valider l'édition du profil
function validateEditProfile(id) {
    var user = getFromLsByIdAndKey(id, "users")
    if (user.role == "admin") {
        //recuperation des données entrées par input
        var firstName = getElementById("firstNameEdit");
        var lastName = getElementById("lastNameEdit");
        var email = getElementById("emailEdit");
        //recuperation des produits et recherche de l'elem
        var usersTab = getTabFromLsByKey("users");
        for (var i = 0; i < usersTab.length; i++) {
            if (usersTab[i].id == id) {
                //modification des valeurs
                usersTab[i].firstName = firstName;
                usersTab[i].lastName = lastName;
                usersTab[i].email = email;
                break;
            }
        }
        
    } else {
        //recuperation des données entrées par input
        var firstName = getElementById("firstNameEdit");
        var lastName = getElementById("lastNameEdit");
        var email = getElementById("emailEdit");
        var tel = getElementById("telEdit");
        var adress = getElementById("adrEdit");
        //recuperation des produits et recherche de l'elem
        var usersTab = getTabFromLsByKey("users");
        for (var i = 0; i < usersTab.length; i++) {
            if (usersTab[i].id == id) {
                //modification des valeurs
                usersTab[i].firstName = firstName;
                usersTab[i].lastName = lastName;
                usersTab[i].email = email;
                usersTab[i].tel = tel;
                usersTab[i].adr = adress;
                break;
            }
        }
        
    }
    //enregistrer les nouvelles valeurs
    localStorage.setItem("users", JSON.stringify(usersTab));
    location.reload();
}
// Fonction pour aller vers la page de recherche
function goToSearch() {
    location.replace("search.html");
}
// Fonction pour aller vers la page qui va afficher les maisons que vous avez recherchées
function goToHousesSearch() {
    var searchInputValue =getElementById("searchInput");
    localStorage.setItem("searchInputValue", searchInputValue);
    location.replace("housesBySearch.html");

}
// Fonction pour effectuer une recherche
function search() {
    var trouve = false;
    var housesTab = getTabFromLsByKey("houses");
    var searchVal = ((localStorage.getItem("searchInputValue")));
    console.log(searchVal);
    var content = "";

    for (var i = 0; i < housesTab.length; i++) {
        if ((housesTab[i].city == searchVal) || (housesTab[i].name == searchVal)) {

            content = content + `
        <div class="col-lg-4 col-md-6">
        <div class="room-item">
            <img src="img/room/room-6.jpg" alt="">
            <div class="ri-text">
                <h4>${housesTab[i].name}</h4>
                <h3>${housesTab[i].city}</h3>
                <table>
                    <tbody>
                        <tr>
                            <td class="r-o">Adress:</td>
                            <td>${housesTab[i].adr}</td>
                        </tr>
                        <tr>
                            <td class="r-o">Area:</td>
                            <td>${housesTab[i].area} m²</td>
                        </tr>
                        
                        <tr>
                            <td class="r-o">Description:</td>
                            <td>${housesTab[i].description}</td>
                        </tr>
                    </tbody>
                </table>
                <a href="#" class="primary-btn" onclick="goToDisplay('${'displayHouseId'}',${housesTab[i].id},'${'rooms.html'}')">Display</a>
            </div>
        </div>
    </div>
        `;
            trouve = true;
            document.getElementById("divHouseSearch").innerHTML = content;

        }
    }
    if ((trouve == false) &&(i>housesTab.length)){
        document.getElementById("divHouseSearch").innerHTML = "house not yet exist";
        document.getElementById("divHouseSearch").style.color = "#E57373";

    }
}
// Fonction pour afficher dynamiquement les maisons entrées par les propriétaires dans la page d'accueil 
function displayHousesHome() {
    var housesTab = getTabFromLsByKey("houses");
    content = "";
    for (var i = 0; i < housesTab.length; i++) {
        content = content + `
        <div class="col-lg-3 col-md-6">
            <div class="hp-room-item set-bg" data-setbg="img/room/room-b1.jpg">
                <div class="hr-text">
                    <h3>${housesTab[i].name}</h3>
                    <h2>${housesTab[i].city}</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td class="r-o">Adress:</td>
                                <td>${housesTab[i].adr}</td>
                            </tr>
                            <tr>
                                <td class="r-o">Area:</td>
                                <td>${housesTab[i].area} m²</td>
                            </tr>
                            <tr>
                                <td class="r-o">Description:</td>
                                <td>${housesTab[i].description}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                    <a href="#" class="primary-btn" onclick="goToDisplay('${'displayHouseId'}',${housesTab[i].id},'${'rooms.html'}')">More Details</a>
                </div>
            </div>
        </div>
    
     `;
    }
    document.getElementById("divHouseHome").innerHTML = content;

}