function SpriteBattlefield() {
    this.initialize.apply(this, arguments);
}

SpriteBattlefield.prototype = Object.create(Sprite.prototype);
SpriteBattlefield.prototype.constructor = SpriteBattlefield;

SpriteBattlefield.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._active = true;
    this.visible = false;
    this.setup();
};

SpriteBattlefield.prototype.setup = function() {
    this.createPlayerZone();
    this.createEnemyZone();
    this.createWindowPhases();
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

SpriteBattlefield.prototype.createWindowPhases = function() {
    this._windowStartPhase = new SpritePhase();
    this._windowDrawPhase = new SpritePhase();
    this._windowLoadPhase = new SpritePhase();
    this._windowSummonPhase = new SpritePhase();
    this._windowCompilePhase = new SpritePhase();
    this._windowBattlePhase = new SpritePhase();
    this.refreshWindows();
};

SpriteBattlefield.prototype.refreshWindows = function() {
    this.refreshTitles();
    this.refreshTexts();
};

SpriteBattlefield.prototype.refreshTitles = function() {
    this._windowStartPhase.refreshTitle('Start Phase');
    this._windowDrawPhase.refreshTitle('Draw Phase');
    this._windowLoadPhase.refreshTitle('Load Phase');
    this._windowSummonPhase.refreshTitle('Summon Phase');
    this._windowCompilePhase.refreshTitle('Compile Phase');
    this._windowBattlePhase.refreshTitle('Battle Phase');
};

SpriteBattlefield.prototype.refreshTexts = function() {
    this._windowStartPhase.refreshText('Draw Holy Sword to go first.');
    this._windowDrawPhase.refreshText('6 cards will be drawn.');
    this._windowLoadPhase.refreshText('Select and use a Power Card.');
    this._windowSummonPhase.refreshText('Select your Battler');
    this._windowCompilePhase.refreshText('Select and use a Power Card.');
    this._windowBattlePhase.refreshText('Start Battle!');
};

SpriteBattlefield.prototype.addChildren = function() {
    this.addBattleChildren();
    this.addWindowChildren();
};

SpriteBattlefield.prototype.addBattleChildren = function() {
    this.addChild(this._playerBattleground);
    this.addChild(this._playerTrash);
    this.addChild(this._playerScore);
    this.addChild(this._enemyBattleground);
    this.addChild(this._enemyTrash);
    this.addChild(this._enemyScore);
};

SpriteBattlefield.prototype.addWindowChildren = function() {
    this.addChild(this._windowStartPhase);
    this.addChild(this._windowDrawPhase);
    this.addChild(this._windowLoadPhase);
    this.addChild(this._windowSummonPhase);
    this.addChild(this._windowCompilePhase);
    this.addChild(this._windowBattlePhase);
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

SpriteBattlefield.prototype.openWindowStartPhase = function() {
    this._windowStartPhase.show();
    this._windowStartPhase.openWindows();
};

SpriteBattlefield.prototype.openWindowDrawPhase = function() {
    this._windowDrawPhase.show();
    this._windowDrawPhase.openWindows();
};

SpriteBattlefield.prototype.openWindowLoadPhase = function() {
    this._windowLoadPhase.show();
    this._windowLoadPhase.openWindows();
};

SpriteBattlefield.prototype.openWindowSummonPhase = function() {
    this._windowSummonPhase.show();
    this._windowSummonPhase.openWindows();
};

SpriteBattlefield.prototype.openWindowCompilePhase = function() {
    this._windowCompilePhase.show();
    this._windowCompilePhase.openWindows();
};

SpriteBattlefield.prototype.openWindowBattlePhase = function() {
    this._windowBattlePhase.show();
    this._windowBattlePhase.openWindows();
};

SpriteBattlefield.prototype.isDisableWindowStartPhase = function() {
    return !this._windowStartPhase.isActive();
};