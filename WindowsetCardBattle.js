function WindowsetCardBattle() {
    this.initialize.apply(this, arguments);
}

WindowsetCardBattle.prototype.constructor = WindowsetCardBattle;

WindowsetCardBattle.prototype.initialize = function() {
    this._windowDisplayTitle = new WindowTitle();
    this._windowDisplayDescription = new WindowDescription();
};

WindowsetCardBattle.prototype.layers = function() {
    return [
        this._windowDisplayTitle,
        this._windowDisplayDescription
    ]
};

WindowsetCardBattle.prototype.openDisplaySample = function() {
    this._windowDisplayTitle.open();
    this._windowDisplayDescription.open();
};

WindowsetCardBattle.prototype.addTextWindowTitle = function(text) {
    this._windowDisplayTitle.addText(text);
    this._windowDisplayTitle.renderText();
};

WindowsetCardBattle.prototype.addTextWindowDescription = function(textBox) {
    this._windowDisplayDescription.addText(textBox);
    this._windowDisplayDescription.renderText();
};