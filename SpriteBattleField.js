function SpriteBattlefield() {
    this.initialize.apply(this, arguments);
}

SpriteBattlefield.prototype = Object.create(Sprite.prototype);
SpriteBattlefield.prototype.constructor = SpriteBattlefield;

SpriteBattlefield.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._active = true;
    this.setup();
};

SpriteBattlefield.prototype.setup = function() {
    this.createPlayerZone();
    this.createEnemyZone();
    this.addChildren();
};

SpriteBattlefield.prototype.createPlayerZone = function() {
    this._playerBattleground = new WindowBattleground({ player: true });
    this._playerTrash = new WindowTrash({ player: true });
    this._playerScore = new WindowScore({ player: true });
};

SpriteBattlefield.prototype.createEnemyZone = function() {
    this._enemyBattleground = new WindowBattleground({ player: false });
    this._enemyTrash = new WindowTrash({ player: false });
    this._enemyScore = new WindowScore({ player: false });
};

SpriteBattlefield.prototype.addChildren = function() {
    this.addChild(this._playerBattleground);
    this.addChild(this._playerTrash);
    this.addChild(this._playerScore);
    this.addChild(this._enemyBattleground);
    this.addChild(this._enemyTrash);
    this.addChild(this._enemyScore);
};

SpriteBattlefield.prototype.isActive = function() {
    return this._active;
};

SpriteBattlefield.prototype.enable = function() {
    this._active = true;
};

SpriteBattlefield.prototype.disable = function() {
    this._active = false;
};

SpriteBattlefield.prototype.isShown = function() {
    return this.visible;
};

SpriteBattlefield.prototype.isHidden = function() {
    return !this.visible;
};

SpriteBattlefield.prototype.show = function() {
    this.visible = true;
};

SpriteBattlefield.prototype.hide = function() {
    this.visible = false;
};

SpriteBattlefield.prototype.update = function() {
    Sprite.prototype.update.call(this);
};

SpriteBattlefield.prototype.moveInPlayerBackground = function() {
    this._playerBattleground.moveIn();
};

SpriteBattlefield.prototype.moveOutPlayerBackground = function() {
    this._playerBattleground.moveOut();
};

SpriteBattlefield.prototype.moveInEnemyBackground = function() {
    this._enemyBattleground.moveIn();
};

SpriteBattlefield.prototype.moveOutEnemyBackground = function() {
    this._enemyBattleground.moveOut();
};

SpriteBattlefield.prototype.moveInPlayerTrash = function() {
    this._playerTrash.moveIn();
};

SpriteBattlefield.prototype.moveOutPlayerTrash = function() {
    this._playerTrash.moveOut();
};

SpriteBattlefield.prototype.moveInEnemyTrash = function() {
    this._enemyTrash.moveIn();
};

SpriteBattlefield.prototype.moveOutEnemyTrash = function() {
    this._enemyTrash.moveOut();
};

SpriteBattlefield.prototype.moveInPlayerScore = function() {
    this._playerScore.moveIn();
};

SpriteBattlefield.prototype.moveOutPlayerScore = function() {
    this._playerScore.moveOut();
};

SpriteBattlefield.prototype.moveInEnemyScore = function() {
    this._enemyScore.moveIn();
};

SpriteBattlefield.prototype.moveOutEnemyScore = function() {
    this._enemyScore.moveOut();
};
