function WindowsetCardBattle() {
    this.initialize.apply(this, arguments);
}

WindowsetCardBattle.prototype.constructor = WindowsetCardBattle;

WindowsetCardBattle.prototype.initialize = function() {
    this.createWindows();
};

WindowsetCardBattle.prototype.createWindows = function() {
    this._titleDisplayIntro = new WindowTitle();
    this._textDisplayIntro = new WindowText();
    this._titleDisplayFolder = new WindowTitle();
    this._selectFolder = new WindowChoiceFolder();
    this.initialSetup();
};

WindowsetCardBattle.prototype.initialSetup = function() {
    this.setupDisplayIntro();
    this.setupDisplayFolder();
};

WindowsetCardBattle.prototype.setupDisplayIntro = function() {
    this._titleDisplayIntro.changeTextColor('#FF7F53');
    this._titleDisplayIntro.changePosition(0, Graphics.boxHeight / 3);
    this._textDisplayIntro.changePosition(0, Graphics.boxHeight / 2.3);
};

WindowsetCardBattle.prototype.setupDisplayFolder = function() {
    this._titleDisplayFolder.changeTextColor('#FF7F53');
    this._titleDisplayFolder.changePosition(0, Graphics.boxHeight / 8);
    this._selectFolder.setHandler('folder1', null);
    this._selectFolder.setHandler('folder2', null);
    this._selectFolder.setHandler('folder3', null);
};

WindowsetCardBattle.prototype.layers = function() {
    return [
        this._titleDisplayIntro,
        this._textDisplayIntro,
        this._titleDisplayFolder,
        this._selectFolder
    ]
};

WindowsetCardBattle.prototype.changeTextDisplayTitleIntro = function(text) {
    this._titleDisplayIntro.addText(text);
    this._titleDisplayIntro.renderText();
};

WindowsetCardBattle.prototype.changeTextDisplayTextIntro = function(text) {
    this._textDisplayIntro.addText(text);
    this._textDisplayIntro.renderText();
};

WindowsetCardBattle.prototype.changeTextDisplayTitleFolder = function(text) {
    this._titleDisplayFolder.addText(text);
    this._titleDisplayFolder.renderText();
};

WindowsetCardBattle.prototype.openTitleDisplayIntro = function() {
    this._titleDisplayIntro.open();
};

WindowsetCardBattle.prototype.closeTitleDisplayIntro = function() {
    this._titleDisplayIntro.close();
};

WindowsetCardBattle.prototype.openTextDisplayIntro = function() {
    this._textDisplayIntro.open();
};

WindowsetCardBattle.prototype.closeTextDisplayIntro = function() {
    this._textDisplayIntro.close();
};

WindowsetCardBattle.prototype.openTitleDisplayFolder = function() {
    this._titleDisplayFolder.open();
};

WindowsetCardBattle.prototype.closeTitleDisplayFolder = function() {
    this._titleDisplayFolder.close();
};

WindowsetCardBattle.prototype.openSelectFolder = function() {
    this._selectFolder.open();
};

WindowsetCardBattle.prototype.closeSelectFolder = function() {
    this._selectFolder.close();
};