var lava = document.getElementById("lave");
var zelda = document.getElementById("myself");
var users = new usersManager();
var mapEvents = new mapEventsManager();


// Ajout de l'utilisateur courant a la liste
users.add("myself", new Personnage(zelda, lava));


/**
 * EVENEMENTS MAP
 */
mapEvents.add("teleport", function (zeldaElement) {
    var x = 790;
    var y = 157 - zeldaElement.size / 2;

    zeldaElement.setLeft(x);
    zeldaElement.setTop(y);

    // On envoie la teleportation au serveur
    socket.emit('setPosition', {
        name: "Teleport",
        x: x,
        y: y
    });
});

mapEvents.add("teleportBack", function (zeldaElement) {
    var x = 319;
    var y = 910 - zeldaElement.size / 2;

    zeldaElement.setLeft(x);
    zeldaElement.setTop(y);

    // On envoie la teleportation au serveur
    socket.emit('setPosition', {
        name: "Teleport",
        x: x,
        y: y
    });
});


/**
 * On ecoute les evenements clavier
 */
document.addEventListener('keydown', function (e) {
    var keyPressed = e.keyCode;
    var position = "";

    switch(keyPressed) {
        case 40:
            position = "Down";
            users.get("myself").down();
            break
        case 39:
            position = "Right";
            users.get("myself").right();
            break;
        case 38:
            position = "Up";
            users.get("myself").up();
            break;
        case 37:
            position = "Left";
            users.get("myself").left();
            break;

        // Tirer une fleche
        case 13:
            position = "Fire";
            users.get("myself").fireArrow();
            break;

        default:
            break;
    }


    // On verifie les evenements de la map
    mapEvents.verifyEvents(users.get("myself"));


    /** Envoie la nouvelle position **/
    socket.emit('setPosition', {
        name: position,
        x: users.get("myself").getLeft(),
        y: users.get("myself").getTop()
    });

});



$('#choice-color form').on('submit', function (event) {
    event.preventDefault();
    var color = $(this).children('select').val();

    socket.emit('setColor', color);
    $('#myself').attr('data-color', color);

    $(this).parent().fadeOut();
});