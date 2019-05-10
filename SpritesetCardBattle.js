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
    this.start();
};

SpritesetCardBattle.prototype.start = function() {
    this._background.movePosition('down-right');
};

SpritesetCardBattle.prototype.update = function() {
    this._background.moveBackground();
    this._transition.moveTransition();
};

SpritesetCardBattle.prototype.layers = function() {
    return [
        this._background,
        this._transition
    ]
};

SpritesetCardBattle.prototype.enableBackground = function() {
    this._background.activate();
};

SpritesetCardBattle.prototype.enableTransition = function() {
    this._transition.activate();
};

SpritesetCardBattle.prototype.transitionIsFinished = function() {
    return this._transition.isFinished();
};