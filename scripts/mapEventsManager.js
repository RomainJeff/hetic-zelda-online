var mapEventsManager = function () {
    this.events = [];
};


/**
 * Methode pour ajouter un evenement
 * @param string name
 * @param function callback
 */
mapEventsManager.prototype.add = function (name, callback) {
    this.events[name] = callback;
};


/**
 * Methode pour declancher les evenements de la map
 * @param object zeldaElement
 */
mapEventsManager.prototype.verifyEvents = function (zeldaElement) {
    var eventsElement = $('[data-event]');

    for (var i = 0; i < eventsElement.length; i++) {
        var eventPoint = eventsElement[i];
        var eventName = eventPoint.dataset.event;

        if (this.isOnEventPoint(eventPoint, zeldaElement)) {
            // On execute la fonction de l'evenement et on y passe
            // l'objet Zelda correspondant
            this.events[eventName](zeldaElement);
        }
    }
};


/**
 * Methode pour verifie sur l'utilisateur est sur une zone d'evenement
 * @param object eventPoint
 * @param object zeldaElement
 * @return boolean
 */
mapEventsManager.prototype.isOnEventPoint = function (eventPoint, zeldaElement) {
    var eventPointLeft = parseInt(eventPoint.style.left) - (zeldaElement.size / 2);
    var eventPointRight = eventPointLeft +  parseInt(eventPoint.style.width);
    
    var eventPointTop = parseInt(eventPoint.style.top) - (zeldaElement.size / 2) - 10;
    var eventPointBottom = eventPointTop + parseInt(eventPoint.style.height);

    if (
        (zeldaElement.posLeft >= eventPointLeft && zeldaElement.posLeft <= eventPointRight) &&
        (zeldaElement.posTop >= eventPointTop && zeldaElement.posTop <= eventPointBottom)
    ) {
        return true;
    } 

    return false;
};