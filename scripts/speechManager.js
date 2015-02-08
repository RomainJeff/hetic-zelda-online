var speechManager = function (speechElement) {
    this.element = speechElement;
    this.speech = [];
    this.slide = 0;
};


speechManager.prototype.add = function (message) {
    this.speech[this.speech.length] = message;
};

speechManager.prototype.play = function () {

    if (!this.exists(this.slide)) {
        this.hide();
        return false;
    }

    this.element.dataset.speech = this.slide;
    this.element.dataset.next = this.isNext(this.slide);

    $(this.element).html(this.speech[this.slide]);

    this.next();
    return true;
};

speechManager.prototype.isNext = function (id) {
    if (this.speech[id + 1]) {
        return true;
    }

    return false;
};

speechManager.prototype.exists = function (id) {
    if (this.speech[id]) {
        return true;
    }

    return false;
};

speechManager.prototype.next = function () {
    this.slide++;
};

speechManager.prototype.hide = function () {
    $(this.element).hide();
};