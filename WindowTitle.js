/*
// Janela para exibir apenas uma linha de texto
*/

function WindowTitle() {
    this.initialize.apply(this, arguments);
}

WindowTitle.prototype = Object.create(Window_Base.prototype);
WindowTitle.prototype.constructor = WindowTitle;

WindowTitle.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._displayTitle = '';
    this.openness = 0;
    this.padding = 6;
    this.initialSetup();
};

WindowTitle.prototype.addText = function(text = '') {
    this._displayTitle = text;
};

WindowTitle.prototype.initialSetup = function() {
    this.changeTextColor('#FF7F53');
    this.changePosition(0, Graphics.boxHeight / 3);
};

WindowTitle.prototype.changeTextColor = function(color = '#FFF') {
    this.contents.textColor = color;
};

WindowTitle.prototype.changePosition = function(x, y) {
    this.move(x, y, this.width, this.height);
};

WindowTitle.prototype.renderText = function() {
    this.resize(Graphics.boxWidth, 1 * this.contents.fontSize + 24);
    this.drawText(this._displayTitle, 0, 0, this.width - 10, 'center');
};

WindowTitle.prototype.cleanContent = function() {
    this._displayTitle = '';
    this.contents.clear();
};

WindowTitle.prototype.resize = function(width, height) {
    this.move(this.x, this.y , width, height);
};

WindowTitle.prototype.changeFontSize = function(size = 24) {
    if(size > 12){
        this.contents.fontSize = size;
    }else{
        this.contents.fontSize = 12;
    }
};

