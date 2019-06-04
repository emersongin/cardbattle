function WindowsetCardBattle() {
    this.initialize.apply(this, arguments);
}

WindowsetCardBattle.prototype.constructor = WindowsetCardBattle;

WindowsetCardBattle.prototype.initialize = function() {
    this.createWindows();
};

WindowsetCardBattle.prototype.createWindows = function() {
    this._zonePlayer = new WindowZone(true);
    this._zoneEnemy = new WindowZone();
    this._trashPlayer = new WindowTrash(true);
    this._trashEnemy = new WindowTrash();
    this._winPlayer = new WindowWin(true);
    this._winEnemy = new WindowWin();
    this.initialSetup();
};

WindowsetCardBattle.prototype.initialSetup = function() {
    this.setupDisplayCardBattle();
};

WindowsetCardBattle.prototype.setupDisplayCardBattle = function() {
    this._zonePlayer.initialPosition();
    this._zoneEnemy.initialPosition();
    this._trashPlayer.initialPosition();
    this._trashEnemy.initialPosition();
    this._winPlayer.initialPosition();
    this._winEnemy.initialPosition();
    this._winPlayer.open();
    this._winEnemy.open();
    this._zonePlayer.open();
    this._zoneEnemy.open();
    this._trashPlayer.open();
    this._trashEnemy.open();
};
