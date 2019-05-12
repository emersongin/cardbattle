function WindowsetCardBattle() {
    this.initialize.apply(this, arguments);
}

WindowsetCardBattle.prototype.constructor = WindowsetCardBattle;

WindowsetCardBattle.prototype.initialize = function() {
    this.createWindows();
};

WindowsetCardBattle.prototype.createWindows = function() {
    this._titleIntro = new WindowTitle();
    this._textIntro = new WindowText();
    this._titleFolder = new WindowTitle();
    this._selectFolder = new WindowChoiceFolder();
    this.initialSetup();
};

WindowsetCardBattle.prototype.initialSetup = function() {
    this.setupDisplayIntro();
    this.setupDisplayFolder();
};

WindowsetCardBattle.prototype.setupDisplayIntro = function() {
    this._titleIntro.changeTextColor('#FF7F53');
    this._titleIntro.changePosition(0, Graphics.boxHeight / 3);
    this._textIntro.changePosition(0, Graphics.boxHeight / 2.3);
};

WindowsetCardBattle.prototype.setupDisplayFolder = function() {
    this._titleFolder.changeTextColor('#FF7F53');
    this._titleFolder.changePosition(0, Graphics.boxHeight / 8);
    this._selectFolder.changePosition(Graphics.boxWidth / 16, Graphics.boxHeight / 3.5);
    this._selectFolder.setHandler('folder1', null);
    this._selectFolder.setHandler('folder2', null);
    this._selectFolder.setHandler('folder3', null);
};

WindowsetCardBattle.prototype.layers = function() {
    return [
        this._titleIntro,
        this._textIntro,
        this._titleFolder,
        this._selectFolder
    ]
};

WindowsetCardBattle.prototype.changeTitleIntro = function(text) {
    this._titleIntro.addText(text);
    this._titleIntro.renderText();
};

WindowsetCardBattle.prototype.changeTextIntro = function(text) {
    this._textIntro.addText(text);
    this._textIntro.renderText();
};

WindowsetCardBattle.prototype.changeTitleFolder = function(text) {
    this._titleFolder.addText(text);
    this._titleFolder.renderText();
};

WindowsetCardBattle.prototype.openTitleIntro = function() {
    this._titleIntro.open();
};

WindowsetCardBattle.prototype.closeTitleIntro = function() {
    this._titleIntro.close();
};

WindowsetCardBattle.prototype.openTextIntro = function() {
    this._textIntro.open();
};

WindowsetCardBattle.prototype.closeTextIntro = function() {
    this._textIntro.close();
};

WindowsetCardBattle.prototype.openTitleFolder = function() {
    this._titleFolder.open();
};

WindowsetCardBattle.prototype.closeTitleFolder = function() {
    this._titleFolder.close();
};

WindowsetCardBattle.prototype.openSelectFolder = function() {
    this._selectFolder.open();
};

WindowsetCardBattle.prototype.closeSelectFolder = function() {
    this._selectFolder.close();
};