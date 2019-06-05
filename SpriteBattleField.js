function SpriteBattlefield() {
    this.initialize.apply(this, arguments);
}

SpriteBattlefield.prototype = Object.create(Sprite.prototype);
SpriteBattlefield.prototype.constructor = SpriteBattlefield;

SpriteBattlefield.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._active = true;
    this.visible = false;
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
    if (this.isActive() && this.isShown()) {

    };
};
