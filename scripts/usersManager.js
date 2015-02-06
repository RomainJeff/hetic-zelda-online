var usersManager = function () {
    this.users = [];
};

usersManager.prototype.add = function(id, instance) {
    this.users[id] = instance;
};

usersManager.prototype.get = function(id) {
    return this.users[id];
};

usersManager.prototype.delete = function(id) {
    delete this.users[id];
};