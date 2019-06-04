function SpritesetCardBattle() {
    this.initialize.apply(this, arguments);
}

SpritesetCardBattle.prototype.constructor = SpritesetCardBattle;

SpritesetCardBattle.prototype.initialize = function() {
    this.createSprites();
};

SpritesetCardBattle.prototype.createSprites = function() {
    this._background = new SpriteBackground();
    this._transition = new SpriteTransition();
    this._challenger = new SpriteChallenger();
    this._chooseFolder = new SpriteChooseFolder();
    this._gameLuck = new SpriteGameLuck();
    this.start();
};

SpritesetCardBattle.prototype.start = function() {
    this._background.movePosition('down-right');
};

SpritesetCardBattle.prototype.update = function() {
    this._background.update();
    this._transition.update();
    this._challenger.update();
    this._gameLuck.update();
};

SpritesetCardBattle.prototype.layers = function() {
    return [
        this._background,
        this._transition,
        this._challenger,
        this._chooseFolder,
        this._gameLuck
    ]
};

SpritesetCardBattle.prototype.showBackground = function() {
    this._background.show();
};

SpritesetCardBattle.prototype.showTransition = function() {
    this._transition.show();
};

SpritesetCardBattle.prototype.showChallenger = function() {
    this._challenger.show();
    this._challenger.openWindows();
};

SpritesetCardBattle.prototype.showChooseFolder = function() {
    this._chooseFolder.show();
    this._chooseFolder.openWindows();
};

SpritesetCardBattle.prototype.showGameLuck = function() {
    this._gameLuck.setup();
    this._gameLuck.show();
    this._gameLuck.openCards();
};

SpritesetCardBattle.prototype.isHideBackground = function() {
    return this._background.isHidden();
};

SpritesetCardBattle.prototype.isHideTransition = function() {
    return this._transition.isHidden();
};

SpritesetCardBattle.prototype.isHideChallenger = function() {
    return this._challenger.isHidden();
};

SpritesetCardBattle.prototype.isHideChooseFolder = function() {
    return this._chooseFolder.isHidden();
};

SpritesetCardBattle.prototype.isHideGameLuck = function() {
    return this._gameLuck.isHidden();
};

SpritesetCardBattle.prototype.isDisabledBackground = function() {
    return !this._background.isActive();
};

SpritesetCardBattle.prototype.isDisabledTransition = function() {
    return !this._transition.isActive();
};

SpritesetCardBattle.prototype.isDisabledChallenger = function() {
    return !this._challenger.isActive();
};

SpritesetCardBattle.prototype.isDisabledChooseFolder = function() {
    return !this._chooseFolder.isActive();
};

SpritesetCardBattle.prototype.isDisabledGameLuck = function() {
    return !this._gameLuck.isActive();
};
