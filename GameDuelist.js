function GameDuelist() {
    this.initialize.apply(this, arguments);
};

GameDuelist.prototype.constructor = GameDuelist;

GameDuelist.prototype.initialize = function (Duelist) {
    let {id, name, level, folders} = Duelist;
    
    this._id = id || false;
    this._level = level || false;
    this._name = name;
    this._folder = new GameFolder(folders);
    this._colors = new GameFolderColor();
    this._field = [];
    this._hand = [];
    this._trash = [];
    this._pack = [];
    this._pass  = false;
    this._wins = 0;
};

GameDuelist.prototype.getID = function () {
    return this._id;
};

GameDuelist.prototype.getLevel = function () {
    return this._level;
};

GameDuelist.prototype.getName = function () {
    return this._name;
};

GameDuelist.prototype.getFolderName = function () {
    return this._folder.getName();
};

GameDuelist.prototype.getFolderCollection = function () {
    return this._folder.getCollection();
};

GameDuelist.prototype.getPack = function () {
    return this._pack;
};

GameDuelist.prototype.getHand = function () {
    return this._hand;
};

GameDuelist.prototype.getTrash = function () {
    return this._trash;
};

GameDuelist.prototype.getField = function () {
    return this._field;
};

GameDuelist.prototype.getColors = function () {
    return this._colors;
};

GameDuelist.prototype.getPass = function () {
    return this._pass;
};

GameDuelist.prototype.setPass = function (pass) {
    this._pass = pass;
};

GameDuelist.prototype.createPackCollection = function () {
    this._pack = this.createGameCardCollection();
};

GameDuelist.prototype.randomPackCollection = function () {
    this._pack = this.randomCollection(this._pack);
};

GameDuelist.prototype.createGameCardCollection = function () {
    let gameFolderCollection = this._folder.getCollection();
    let gameCardCollection = [];

    gameFolderCollection.forEach(CardStored => {
        for (let index = 0; index < CardStored.amount; index++) {
            gameCardCollection.push(new GameCard(CardStored.id));
        }
    });

    return gameCardCollection;
};

GameDuelist.prototype.randomCollection = function (GameCardCollection) {
    let standCollection = GameCardCollection;
    let randomCollection = [];

    while (standCollection.length) {
        let random = Math.floor(Math.random() * standCollection.length);
        randomCollection.push(standCollection.splice(random, 1).shift());
    }

    return randomCollection; 
};

GameDuelist.prototype.pushToCollection = function (collectionOrigin, collectionDestiny) {
    collectionDestiny.push(collectionOrigin.shift());
};

GameDuelist.prototype.getWins = function () {
    return this._wins;
};

GameDuelist.prototype.setColor = function (Color) {
    this._colors[Color.name] = ( this._colors[Color.name] + Color.value );
};
