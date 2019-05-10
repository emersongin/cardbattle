function WindowDescription() {
    this.initialize.apply(this, arguments);
}

WindowDescription.prototype = Object.create(Window_Base.prototype);
WindowDescription.prototype.constructor = WindowDescription;

WindowDescription.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this.openness = 0;
    this._textBox = [];
    this.create();
};

WindowDescription.prototype.create = function() {
    this.movePosition(0, Graphics.boxHeight / 2.3);
};

WindowDescription.prototype.movePosition = function(x, y) {
    this.move(x, y, this.width, this.height);
};

WindowDescription.prototype.resize = function(width, height) {
    this.move(this.x, this.y , width, height);
};

WindowDescription.prototype.clearWindow = function() {
    this.contents.clear();
    this._textBox = [];
};

WindowDescription.prototype.changeFontSize = function(size = 24) {
    size > 12 ? this.contents.fontSize = size : this.contents.fontSize = 12;
};

WindowDescription.prototype.changeTextColor = function(color = '#FFF') {
    this.contents.textColor = color;
};

WindowDescription.prototype.addText = function(text) {
    var marginLeft = "     ";

    text.forEach(line => {
        this._textBox.push(marginLeft + line);
    });
};

WindowDescription.prototype.renderText = function(align = 'left') {
    var lineAmount = this._textBox.length;
    var lineLength = 0;
    var lineTarget = 0;
    var fontSize = this.contents.fontSize;
    
    this._textBox.forEach(line => {
        if(lineLength < line.length){
            lineLength = line.length;
        }
    })

    this.resize(Graphics.boxWidth, lineAmount * fontSize + 48);
    //this.resize(lineLength * fontSize / 2 + 40, lineAmount * fontSize + 48);

    this._textBox.forEach(line => {
        this.drawText(line, 0, lineTarget, this.width - 40, align);
        
        lineTarget += fontSize;
    })
};