var lava = document.getElementById("lave");
var zelda = document.getElementById("myself");
var users = new usersManager();


// Ajout de l'utilisateur courant a la liste
users.add("myself", new Personnage(zelda, lava));


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
    $(this).parent().fadeOut();
    $('#myself').attr('data-color', color);
});