/**
 * Constructeur de la classe Personnage
 * @param object element Element contenant Zelda
 * @param object lava Element de la lave
 */
var Personnage = function (element, lava) {
    this.posTop = parseInt(element.style.top);
    this.posLeft = parseInt(element.style.left);
    this.size = 32;

    this.zelda = element;
    this.lava = lava;

    this.browserHeight = parseInt(document.getElementById('playground').style.height);
    this.browserWidth = parseInt(document.getElementById('playground').style.width);

    this.direction = "Bas";
};


/** 
 * Methode pour recuperer la position Top
 */
Personnage.prototype.getTop = function () {
    return this.posTop;
};

/** 
 * Methode pour recuperer la position Left
 */
Personnage.prototype.getLeft = function () {
    return this.posLeft;
};

/**
 * Methode pour definir la position Top
 */
Personnage.prototype.setTop = function (top) {
    this.posTop = top;
    this.zelda.style.top = top +"px";
}

/**
 * Methode pour definir la position Left
 */
Personnage.prototype.setLeft = function (left) {
    this.posLeft = left;
    this.zelda.style.left = left +"px";
}

/**
 * Methode pour descendre
 */
Personnage.prototype.down = function () {
    this.direction = "Bas";

    if (this.posTop < this.browserHeight - 52 && !this.isHitboxed()) {
        this.posTop += this.size / 2;
        this.zelda.style.top = this.posTop +"px";

        this.move();
    } else {
        this.setPosition(this.direction, 5);
    }
};

/**
 * Methode pour monter
 */
Personnage.prototype.up = function () {
    this.direction = "Haut";

    if (this.posTop > 10 && !this.isHitboxed()) {
        this.posTop -= this.size / 2;
        this.zelda.style.top = this.posTop +"px";

        this.move();
    } else {
        this.setPosition(this.direction, 5);
    }
};

/**
 * Methode pour aller a gauche
 */
Personnage.prototype.left = function () {
    this.direction = "Gauche";

    if (this.posLeft > 10 && !this.isHitboxed()) {
        this.posLeft -= this.size / 2;
        this.zelda.style.left = this.posLeft +"px";

        this.move();
    } else {
        this.setPosition(this.direction, 5);
    }
};

/**
 * Methode pour aller a droite
 */
Personnage.prototype.right = function () {
    this.direction = "Droite";

    if (this.posLeft < this.browserWidth - 52  && !this.isHitboxed()) {
        this.posLeft += this.size / 2;
        this.zelda.style.left = this.posLeft +"px";

        this.move();
    } else {
        this.setPosition(this.direction, 5);
    }
};

/**
 * Methode pour definir une position
 * @param string direction La direction de personnage
 * @param int number Le pas du personnage
 */
Personnage.prototype.setPosition = function (direction, number) {
    var className = "dir"+ direction + number;
    this.zelda.className = className;
    this.zelda.dataset.foot = number;
};

/**
 * Methode pour definir la position des pieds
 * @param string direction La direction du personnage
 */
Personnage.prototype.move = function () {
    var pos = parseInt(this.zelda.dataset.pos);
    var foot = parseInt(this.zelda.dataset.foot);

    if (pos == 0 && foot == 5) {
        this.zelda.dataset.pos = 1;
        this.setPosition(this.direction, 4);
    } else if (foot == 4) {
        this.zelda.dataset.pos = 1;
        this.setPosition(this.direction, 5);
    } else if (pos == 1 && foot == 5) {
        this.zelda.dataset.pos = 0;
        this.setPosition(this.direction, 6);
    } else if (foot == 6) {
        this.zelda.dataset.pos = 0;
        this.setPosition(this.direction, 5);
    }
};

/**
 * Determine si le personnage est actuellement bloque par une hitbox
 * @param return boolean
 *
 */
Personnage.prototype.isHitboxed = function () {
    var hitbox = $('[data-hitbox=true]');

    for (var i = 0; i < hitbox.length; i++) {
        var hitboxElement = hitbox[i];

        if (hitboxElement.id == this.zelda.id) {
            continue;
        }

        var hitBoxLeft = parseInt(hitboxElement.style.left) - 20;
        var hitBoxRight = hitBoxLeft + parseInt(hitboxElement.style.width) - 20;
        
        var hitBoxTop = parseInt(hitboxElement.style.top) - 10;
        var hitBoxBottom = hitBoxTop + parseInt(hitboxElement.style.height) - 10;


        // HitBox LeftSide Direction Right
        if (this.direction == "Droite") {
            if (
                (this.posLeft + 20 >= hitBoxLeft && this.posLeft < hitBoxRight) &&
                (this.posTop + this.size / 2 >= hitBoxTop && this.posTop <= hitBoxBottom)
            ) {
                return true;
            }
        }

        // HitBox RightSide Direction Left
        if (this.direction == "Gauche") {
            if (
                (this.posLeft - this.size - 10 <= hitBoxRight && this.posLeft > hitBoxLeft) &&
                (this.posTop + this.size / 2 >= hitBoxTop && this.posTop <= hitBoxBottom)
            ) {
                return true;
            }
        }

        // HitBox TopSide Direction Top
        if (this.direction == "Haut") {
            if (
                (this.posLeft - this.size < hitBoxRight && this.posLeft > hitBoxLeft) &&
                (this.posTop > hitBoxTop && this.posTop <= hitBoxBottom + this.size / 2)
            ) {
                return true;
            }
        }

        // HitBox BottomSide Direction Bottom
        if (this.direction == "Bas") {
            if (
                (this.posLeft - this.size < hitBoxRight && this.posLeft > hitBoxLeft) &&
                (this.posTop + this.size >= hitBoxTop && this.posTop < hitBoxBottom)
            ) {
                return true;
            }
        }
    }

    return false;
};

/**
 * Methode pour lancer une fleche
 */
Personnage.prototype.fireArrow = function () {
    var arrows = $('#arrows');
    var arrowElement = $('<div class="arrow" data-arrow="'+ this.direction +'" style="top: '+ (this.posTop + this.size / 2) +'px; left: '+ (this.posLeft + this.size / 2) +'px"></div>');
    arrows.append(arrowElement);

    // Detection de l'animation selon la position de Link
    if (this.direction == "Bas") {
        var options = {top: this.browserHeight * 2};
    } else if (this.direction == "Haut") {
        var options = {top: this.browserHeight * -2};
    } else if (this.direction == "Gauche") {
        var options = {left: this.browserWidth * -2};
    } else if (this.direction == "Droite") {
        var options = {left: this.browserWidth * 2};
    }

    // Lancement de la fleche
    arrowElement.animate(options, 10, "linear");
};