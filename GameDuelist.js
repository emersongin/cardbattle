function GameDuelist() {
    this.initialize.apply(this, arguments);
};

GameDuelist.prototype.constructor = GameDuelist;

GameDuelist.prototype.initialize = function() {
    this._enemyInformation = {};
    this._colors = new GameColorFolder();
    this._field = [];
    this._hand = [];
    this._trash = [];
    this._pack = [];
    this._winPoints = 0;
};

GameDuelist.prototype.getEnemyInformation = function() {
    return this._enemyInformation;
};

GameDuelist.prototype.setEnemy = function(ID) {
    this._enemyInformation = $dataCardBattleEnemies[ID];
};

GameDuelist.prototype.getPack = function() {
    return this._pack;
};

GameDuelist.prototype.getHand = function() {
    return this._hand;
};

GameDuelist.prototype.getTrash = function() {
    return this._trash;
};

GameDuelist.prototype.getField = function() {
    return this._field;
};

GameDuelist.prototype.setPack = function(cardBattlePack) {
    this._pack = cardBattlePack;
};

GameDuelist.prototype.pushToFolder = function(source, destination) {
    destination.push(source.shift());
};

GameDuelist.prototype.getWins = function() {
    return this._winPoints;
};
