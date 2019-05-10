function WindowTitle() {
    this.initialize.apply(this, arguments);
}

WindowTitle.prototype = Object.create(Window_Base.prototype);
WindowTitle.prototype.constructor = WindowTitle;

WindowTitle.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this.openness = 0;
    this.padding = 6;
    this._text = 'null';
    this.create();
};

WindowTitle.prototype.create = function() {
    this.changeTextColor('#FF7F50');
    this.movePosition(0, Graphics.boxHeight / 3);
};

WindowTitle.prototype.movePosition = function(x, y) {
    this.move(x, y, this.width, this.height);
};

WindowTitle.prototype.resize = function(width, height) {
    this.move(this.x, this.y , width, height);
};

WindowTitle.prototype.clearWindow = function() {
    this.contents.clear();
    this._text = 'null';
};

WindowTitle.prototype.changeFontSize = function(size = 24) {
    size > 12 ? this.contents.fontSize = size : this.contents.fontSize = 12;
};

WindowTitle.prototype.changeTextColor = function(color = '#FFF') {
    this.contents.textColor = color;
};

WindowTitle.prototype.addText = function(text = 'null') {
    this._text = text;
};

WindowTitle.prototype.renderText = function() {
    this.resize(Graphics.boxWidth, 1 * this.contents.fontSize + 24);
    this.drawText(this._text, 0, 0, this.width - 10, 'center');
};