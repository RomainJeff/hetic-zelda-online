var socket = io('localhost:8080');


/** 
 * Un joueur se connecte
 */
socket.on('newUser', function (infos) {
    console.log(infos);

    $('#characters').append('<div id="'+ infos.id +'" data-zelda="true" data-color="'+ infos.color +'" class="dirBas5" data-pos="0" data-lava="false" data-foot="5" style="left:'+ infos.x +'px;top:'+ infos.y +'px;"></div>');
    var zelda = document.getElementById(infos.id);

    users.add(infos.id, new Personnage(zelda, lava)); 
});


/**
 * Un joueur interagie
 */
socket.on('interact', function (infos) {
    var player = infos.id;

    switch (infos.event) {
        case "Down":
            users.get(player).down();
            break;
        case "Up":
            users.get(player).up();
            break;
        case "Left":
            users.get(player).left();
            break;
        case "Right":
            users.get(player).right();
            break;
        case "Fire":
            users.get(player).fireArrow();
        default:
            break;
    }
});


/**
 * Un joueur se deconnecte
 */
socket.on('logOut', function (id) {
    $('#'+ id).remove();
    users.delete(id);
});