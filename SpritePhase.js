function SpritePhase() {
    this.initialize.apply(this, arguments);
}

SpritePhase.prototype = Object.create(Sprite.prototype);
SpritePhase.prototype.constructor = SpritePhase;

SpritePhase.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this._title = new WindowTitle();
    this._text = new WindowText();
    this._active = true;
    this.visible = false;
    this.create();
};

SpritePhase.prototype.isActive = function () {
    return this._active;
};

SpritePhase.prototype.enable = function () {
    this._active = true;
};

SpritePhase.prototype.disable = function () {
    this._active = false;
};

SpritePhase.prototype.isShown = function () {
    return this.visible;
};

SpritePhase.prototype.isHidden = function () {
    return !this.visible;
};

SpritePhase.prototype.show = function () {
    this.visible = true;
};

SpritePhase.prototype.hide = function () {
    this.visible = false;
};

SpritePhase.prototype.create = function () {
    this.createTitle();
    this.createText();
    this.addChildren();
};

SpritePhase.prototype.createTitle = function () {
    this._title.changePosition(0, Graphics.boxHeight / 3);
    this._title.changeTextColor('#ed9100');
};

SpritePhase.prototype.createText = function () {
    this._text.changePosition(0, Graphics.boxHeight / 2.3);
    this._text.changeTextColor('#FFF');
};

SpritePhase.prototype.refreshTitle = function (title) {
    this._title.addText(title);
    this._title.renderText();
};

SpritePhase.prototype.refreshText = function (text) {
    this._text.addText(text);
    this._text.renderText();
};

SpritePhase.prototype.addChildren = function () {
    this.addChild(this._title);
    this.addChild(this._text);
};

SpritePhase.prototype.openWindows = function () {
    this._title.open();
    this._text.open();
};

SpritePhase.prototype.closeWindows = function () {
    this._title.close();
    this._text.close();
};

SpritePhase.prototype.isWindowsOpen = function () {
    return this._text.openness === 255 && this._title.openness === 255;
};

SpritePhase.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (this.isWindowsOpen()) {
        if ((Input.isTriggered('ok') || TouchInput.isTriggered())) {
            this.closeWindows();
            this.disable();
        }
    }
};
