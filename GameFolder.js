function GameFolder() {
    this.initialize.apply(this, arguments);
}

GameFolder.prototype.constructor = GameFolder;

GameFolder.prototype.initialize = function (Folder) {
    this._name = Folder.name;
    this._collection = Folder.collection;
};

GameFolder.prototype.getName = function () {
    return this._name;
};

GameFolder.prototype.getCollection = function () {
    return this._collection;
};

GameFolder.prototype.setName = function (name) {
    this._name = name;
};
