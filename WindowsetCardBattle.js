function WindowsetCardBattle() {
    this.initialize.apply(this, arguments);
}

WindowsetCardBattle.prototype.constructor = WindowsetCardBattle;

WindowsetCardBattle.prototype.initialize = function() {
    this.createWindows();
};

WindowsetCardBattle.prototype.createWindows = function() {
    this._titleDisplay = new WindowTitle();
    this._textDisplay = new WindowText();
};

WindowsetCardBattle.prototype.layers = function() {
    return [
        this._titleDisplay,
        this._textDisplay
    ]
};

WindowsetCardBattle.prototype.changeTextDisplayTitle = function(text) {
    this._titleDisplay.addText(text);
    this._titleDisplay.renderText();
};

WindowsetCardBattle.prototype.changeTextDisplayText = function(text) {
    this._textDisplay.addText(text);
    this._textDisplay.renderText();
};

WindowsetCardBattle.prototype.openTitleDisplay = function(text) {
    this._titleDisplay.open();
};

WindowsetCardBattle.prototype.openTextDisplay = function(text) {
    this._textDisplay.open();
};

WindowsetCardBattle.prototype.closeTitleDisplay = function(text) {
    this._titleDisplay.close();
};

WindowsetCardBattle.prototype.closeTextDisplay = function(text) {
    this._textDisplay.close();
};