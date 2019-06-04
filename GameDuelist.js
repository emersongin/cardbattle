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

GameDuelist.prototype.setPack = function(cardBattlePack) {
    this._pack = cardBattlePack;
};

GameDuelist.prototype.getWins = function() {
    return this._winPoints;
};