function WindowText() {
    this.initialize.apply(this, arguments);
}

WindowText.prototype = Object.create(Window_Base.prototype);
WindowText.prototype.constructor = WindowText;

WindowText.prototype.initialize = function () {
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._textBox = [];
    this.openness = 0;
};

WindowText.prototype.changePosition = function (x, y) {
    this.move(x, y, this.width, this.height);
};

WindowText.prototype.resize = function (width, height) {
    this.move(this.x, this.y , width, height);
};

WindowText.prototype.cleanContent = function () {
    this._textBox = [];
};

WindowText.prototype.changeFontSize = function (size = 24) {
    if (size > 12) {
        this.contents.fontSize = size;
    }else{
        this.contents.fontSize = 12;
    }
};

WindowText.prototype.changeTextColor = function (color = '#FFF') {
    this.contents.textColor = color;
};

WindowText.prototype.addText = function (text) {
    let marginLeftText = '     ';

    if (Array.isArray(text) === false) {
        if (!text) {
            text = [''];
        }else{
            text = [text];
        }
    }

    text.forEach(line => {
        this._textBox.push(marginLeftText + line);
    });
};

WindowText.prototype.renderText = function () {
    let lineLength = 0;
    let lineTarget = 0;
    let lineAmount = this._textBox.length;
    let fontSize = this.contents.fontSize;
    
    this._textBox.forEach(line => {
        if (lineLength < line.length) {
            lineLength = line.length;
        }
    })

    this.contents.clear();
    this.resize(Graphics.boxWidth, lineAmount * fontSize + 48);
    this._textBox.forEach(line => {
        this.drawText(line, 0, lineTarget, this.width - 40, 'left');
        
        lineTarget += fontSize;
    })

    //Renderizar no tamanho do texto
    //this.resize(lineLength * fontSize / 2 + 40, lineAmount * fontSize + 48);
};