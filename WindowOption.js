function WindowOption() {
    this.initialize.apply(this, arguments);
}

WindowOption.prototype = Object.create(Window_Command.prototype);
WindowOption.prototype.constructor = WindowOption;
    
WindowOption.prototype.initialize = function (x, y, width, Options) {
    this._options = Options;
    this._width = width || 816;
    this._rows = Options.length;
    Window_Command.prototype.initialize.apply(this, arguments);
    this.openness = 0;
    this.refresh();
};

WindowOption.prototype.windowWidth = function () {
    return this._width;
};

WindowOption.prototype.numVisibleRows = function () {
    return this._rows;
};

WindowOption.prototype.windowHeight = function () {
    return (60 * this._rows) + 24;
};

WindowOption.prototype.itemHeight = function () {
    let contentHeight = this.height - this.padding * 2;
    return Math.floor(contentHeight / this.numVisibleRows());
};

WindowOption.prototype.makeCommandList = function () {
    this._options.forEach(option => {
        this.addCommand(option.label, option.tag);
    });
};

WindowOption.prototype.drawItem = function (index) {
    var rect = this.itemRectForText(index);
    this.drawTextEx(this.commandName(index), rect.x, rect.y + 10);
};

WindowOption.prototype.changePosition = function (x, y) {
    this.move(x, y, this.width, this.height);
};

WindowOption.prototype.resize = function (width, height) {
    this.move(this.x, this.y, width, height);
};
