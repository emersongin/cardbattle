function SpritesetCardBattle() {
    this.initialize.apply(this, arguments);
}

SpritesetCardBattle.prototype.constructor = SpritesetCardBattle;

SpritesetCardBattle.prototype.initialize = function () {
    this.createSprites();
};

SpritesetCardBattle.prototype.createSprites = function () {
    this._background = new SpriteBackground();
    this._opening = new SpriteOpening();
    this._challenger = new SpriteChallenger();
    this._chooseFolder = new SpriteChooseFolder();
    this._luckyGame = new SpriteLuckyGame();
    this._battlefield = new SpriteBattlefield();
    this.start();
};

SpritesetCardBattle.prototype.start = function () {
    this._background.movePosition('down-right');
};

SpritesetCardBattle.prototype.update = function () {
    this._background.update();
    this._opening.update();
    this._challenger.update();
    this._luckyGame.update();
    this._battlefield.update();
};

SpritesetCardBattle.prototype.layers = function () {
    return [
        this._background,
        this._opening,
        this._challenger,
        this._chooseFolder,
        this._luckyGame,
        this._battlefield
    ]
};

SpritesetCardBattle.prototype.showBackground = function () {
    this._background.show();
};

SpritesetCardBattle.prototype.showOpening = function () {
    this._opening.show();
};

SpritesetCardBattle.prototype.showChallenger = function () {
    this._challenger.show();
    this._challenger.openWindows();
};

SpritesetCardBattle.prototype.showChooseFolder = function () {
    this._chooseFolder.show();
    this._chooseFolder.openWindows();
};

SpritesetCardBattle.prototype.showLuckyGame = function () {
    this._luckyGame.setup();
    this._luckyGame.show();
    this._luckyGame.openCards();
};

SpritesetCardBattle.prototype.showBattlefield = function () {
    this._battlefield.show();
};

SpritesetCardBattle.prototype.openWindowStartPhase = function () {
    this._battlefield.openWindowStartPhase();
};

SpritesetCardBattle.prototype.openWindowDrawPhase = function () {
    this._battlefield.openWindowDrawPhase();
};

SpritesetCardBattle.prototype.isHideBackground = function () {
    return this._background.isHidden();
};

SpritesetCardBattle.prototype.isHideOpening = function () {
    return this._opening.isHidden();
};

SpritesetCardBattle.prototype.isHideChallenger = function () {
    return this._challenger.isHidden();
};

SpritesetCardBattle.prototype.isHideChooseFolder = function () {
    return this._chooseFolder.isHidden();
};

SpritesetCardBattle.prototype.isHideLuckyGame = function () {
    return this._luckyGame.isHidden();
};

SpritesetCardBattle.prototype.isHideBattlefield = function () {
    return this._battlefield.isHidden();
};

SpritesetCardBattle.prototype.isHideWindowStartPhase = function () {
    return this._battlefield.isHideWindowStartPhase();
};

SpritesetCardBattle.prototype.isHideWindowDrawPhase = function () {
    return this._battlefield.isHideWindowDrawPhase();
};

SpritesetCardBattle.prototype.isHideWindowLoadPhase = function () {
    return this._battlefield.isHideWindowLoadPhase();
};

SpritesetCardBattle.prototype.isHideWindowSummonPhase = function () {
    return this._battlefield.isHideWindowSummonPhase();
};

SpritesetCardBattle.prototype.isHideWindowCompilePhase = function () {
    return this._battlefield.isHideWindowCompilePhase();
};

SpritesetCardBattle.prototype.isHideWindowBattlePhase = function () {
    return this._battlefield.isHideWindowBattlePhase();
};

SpritesetCardBattle.prototype.isDisabledBackground = function () {
    return !this._background.isActive();
};

SpritesetCardBattle.prototype.isDisabledOpening = function () {
    return !this._opening.isActive();
};

SpritesetCardBattle.prototype.isDisabledChallenger = function () {
    return !this._challenger.isActive();
};

SpritesetCardBattle.prototype.isDisabledChooseFolder = function () {
    return !this._chooseFolder.isActive();
};

SpritesetCardBattle.prototype.isDisabledLuckyGame = function () {
    return !this._luckyGame.isActive();
};

SpritesetCardBattle.prototype.isDisabledBattlefield = function () {
    return !this._battlefield.isActive();
};

SpritesetCardBattle.prototype.isDisableWindowStartPhase = function () {
    return this._battlefield.isDisableWindowStartPhase();
};

SpritesetCardBattle.prototype.isDisableWindowDrawPhase = function () {
    return this._battlefield.isDisableWindowDrawPhase();
};

SpritesetCardBattle.prototype.isDisableWindowLoadPhase = function () {
    return this._battlefield.isDisableWindowLoadPhase();
};

SpritesetCardBattle.prototype.isDisableWindowSummonPhase = function () {
    return this._battlefield.isDisableWindowSummonPhase();
};

SpritesetCardBattle.prototype.isDisableWindowCompilePhase = function () {
    return this._battlefield.isDisableWindowCompilePhase();
};

SpritesetCardBattle.prototype.isDisableWindowBattlePhase = function () {
    return this._battlefield.isDisableWindowBattlePhase();
};

SpritesetCardBattle.prototype.luckGameResult = function () {
    return this._luckyGame.getGameResult();
};

SpritesetCardBattle.prototype.moveInBattlefield = function () {
    this._battlefield.moveInPlayerBackground();
    this._battlefield.moveInPlayerScore();
    this._battlefield.moveInPlayerTrash();
    this._battlefield.moveInEnemyBackground();
    this._battlefield.moveInEnemyScore();
    this._battlefield.moveInEnemyTrash();
};

SpritesetCardBattle.prototype.moveOutBattlefield = function () {
    this._battlefield.moveOutPlayerBackground();
    this._battlefield.moveOutPlayerScore();
    this._battlefield.moveOutPlayerTrash();
    this._battlefield.moveOutEnemyBackground();
    this._battlefield.moveOutEnemyScore();
    this._battlefield.moveOutEnemyTrash();
};

SpritesetCardBattle.prototype.refreshBattleCards = function () {
    this._battlefield.refreshPlayerSpriteCollection();
    this._battlefield.refreshEnemySpriteCollection();
};

SpritesetCardBattle.prototype.moveHandToField = function () {
    this._battlefield.playerCardsMoveToField();
    this._battlefield.enemyCardsMoveToField();
};

SpritesetCardBattle.prototype.toTurn = function () {
    this._battlefield.playerCardsToTurn();
    this._battlefield.enemyCardsToTurn();
};
