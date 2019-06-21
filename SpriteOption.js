function SpriteOption() {
    this.initialize.apply(this, arguments);
}

SpriteOption.prototype = Object.create(Sprite.prototype);
SpriteOption.prototype.constructor = SpriteOption;

SpriteOption.prototype.initialize = function (x, y, width, Options) {
    Sprite.prototype.initialize.call(this);
    this._title = new WindowTitle();
    this._options = new WindowOption(x, y, width, Options);
    this._active = true;
    this.visible = false;
    this.create();
};

SpriteOption.prototype.isActive = function () {
    return this._active;
};

SpriteOption.prototype.enable = function () {
    this._active = true;
};

SpriteOption.prototype.disable = function () {
    this._active = false;
};

SpriteOption.prototype.isShown = function () {
    return this.visible;
};

SpriteOption.prototype.isHidden = function () {
    return !this.visible;
};

SpriteOption.prototype.show = function () {
    this.visible = true;
};

SpriteOption.prototype.hide = function () {
    this.visible = false;
};

SpriteOption.prototype.create = function () {
    this.createTitle();
    this.createOptions();
    this.addChildren();
};

SpriteOption.prototype.createTitle = function () {
    this._title.changePosition(0, 0);
    this._title.setTitleAlign('left');
};

SpriteOption.prototype.createOptions = function () {
    this._options.changePosition(0, 0);
};

SpriteOption.prototype.refreshTitle = function (title) {
    this._title.addText(title);
    this._title.renderText();
};

SpriteOption.prototype.addChildren = function () {
    this.addChild(this._title);
    this.addChild(this._options);
};

SpriteOption.prototype.openWindows = function () {
    this.openTitleWindow();
    this.openOptionsWindow();
};

SpriteOption.prototype.openTitleWindow = function () {
    this._title.open();
};

SpriteOption.prototype.openOptionsWindow = function () {
    this._options.open();
};

SpriteOption.prototype.closeWindows = function () {
    this._title.close();
    this._options.close();
};

SpriteOption.prototype.resizeWidthWindows = function (width) {
    this._title.resize(width, this._title.height);
    this._options.resize(width, this._options.height);
};

SpriteOption.prototype.changePositionTitle = function (x, y) {
    this._title.changePosition(x || this._title.x, y || this._title.y);
};

SpriteOption.prototype.changePositionOptions = function (x, y) {
    this._options.changePosition(x || this._title.x, y || this._options.y);
};

SpriteOption.prototype.isWindowsOpen = function () {
    return this._options.openness === 255 && this._title.openness === 255;
};

SpriteOption.prototype.setHandler = function (tag, link) {
    this._options.setHandler(tag, link);
};
