function SpriteChooseFolder() {
    this.initialize.apply(this, arguments);
}

SpriteChooseFolder.prototype = Object.create(Sprite.prototype);
SpriteChooseFolder.prototype.constructor = SpriteChooseFolder;

SpriteChooseFolder.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this._title = new WindowTitle();
    this._choiceFolder = new WindowChoiceFolder();
    this._active = true;
    this.visible = false;
    this.create();
};

SpriteChooseFolder.prototype.isActive = function () {
    return this._active;
};

SpriteChooseFolder.prototype.enable = function () {
    this._active = true;
};

SpriteChooseFolder.prototype.disable = function () {
    this._active = false;
};

SpriteChooseFolder.prototype.isShown = function () {
    return this.visible;
};

SpriteChooseFolder.prototype.isHidden = function () {
    return !this.visible;
};

SpriteChooseFolder.prototype.show = function () {
    this.visible = true;
};

SpriteChooseFolder.prototype.hide = function () {
    this.visible = false;
};

SpriteChooseFolder.prototype.create = function () {
    this.createTitle();
    this.createFolders();
    this.addChildren();
};

SpriteChooseFolder.prototype.createTitle = function () {
    this._title.changePosition(0, Graphics.boxHeight / 8);
    this._title.changeTextColor('#ed9100');
    this._title.addText('Choose a folder');
    this._title.renderText();
};

SpriteChooseFolder.prototype.createFolders = function () {
    this._choiceFolder.changePosition(Graphics.boxWidth / 16, Graphics.boxHeight / 3.5);
    this._choiceFolder.setHandler('folder0', this.selectFolder.bind(this, 0));
    this._choiceFolder.setHandler('folder1', this.selectFolder.bind(this, 1));
    this._choiceFolder.setHandler('folder2', this.selectFolder.bind(this, 2));
};

SpriteChooseFolder.prototype.selectFolder = function (index) {
    CardBattleManager.createPlayerDuelist(index);
    this.closeWindows();
    this.disable();
};

SpriteChooseFolder.prototype.addChildren = function () {
    this.addChildAt(this._title, 0);
    this.addChildAt(this._choiceFolder, 1);
};

SpriteChooseFolder.prototype.openWindows = function () {
    this._title.open();
    this._choiceFolder.open();
};

SpriteChooseFolder.prototype.closeWindows = function () {
    this._title.close();
    this._choiceFolder.close();
};

SpriteChooseFolder.prototype.update = function () {
    Sprite.prototype.update.call(this);
};
