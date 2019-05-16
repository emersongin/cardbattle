function WindowChoiceFolder() {
    this.initialize.apply(this, arguments);
}

WindowChoiceFolder.prototype = Object.create(Window_Command.prototype);
WindowChoiceFolder.prototype.constructor = WindowChoiceFolder;
    
WindowChoiceFolder.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.apply(this, arguments);
    this._folders = [];
    this.openness = 0;
    this.create();
};

WindowChoiceFolder.prototype.create = function() {
    this.createElementsFolder();
};

WindowChoiceFolder.prototype.createElementsFolder = function() {
    let folders = $gameCardPlayer.getStoredDecks();

    folders.forEach((deck, index) => {
        this.addFolder(deck.folder);
        this.redrawItem(index);
    });
};

WindowChoiceFolder.prototype.addFolder = function(folder) {
    let elementsFolder = new GameColorFolder();

    folder.forEach(card => {
        elementsFolder[$dataCards[card.id].color] += card.amount;
    });

    this._folders.push(elementsFolder);
};

WindowChoiceFolder.prototype.windowWidth = function() {
    return 714;
};

WindowChoiceFolder.prototype.numVisibleRows = function() {
    return 3;
};

WindowChoiceFolder.prototype.windowHeight = function() {
    return Graphics.boxHeight / 2;
};

WindowChoiceFolder.prototype.itemHeight = function() {
    let clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
};

WindowChoiceFolder.prototype.changePosition = function(x, y) {
    this.move(x, y, this.width, this.height);
};

WindowChoiceFolder.prototype.resize = function(width, height) {
    this.move(this.x, this.y , width, height);
};

WindowChoiceFolder.prototype.makeCommandList = function() {
    for (let index = 0; index < $gameCardPlayer.getFoldersLength(); index++) {
        this.addCommand($gameCardPlayer.getNameFolder(index), 'folder' + index);
    }
};

WindowChoiceFolder.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    this.drawTextEx(this.commandName(index), rect.x, rect.y + 10);
    this.drawTextEx(this.createElementString(index), rect.x, rect.y + 50);
};

WindowChoiceFolder.prototype.createElementString = function(index) {
    let elementFolder = new GameColorFolder();
    let elementString = '';

    if(this._folders){
        elementFolder = this._folders[index];
    }

    elementString += " \\I[1] " + elementFolder.white.padZero(2);
    elementString += " \\I[2] " + elementFolder.blue.padZero(2);
    elementString += " \\I[3] " + elementFolder.green.padZero(2);
    elementString += " \\I[4] " + elementFolder.red.padZero(2);
    elementString += " \\I[5] " + elementFolder.black.padZero(2);
    elementString += " \\I[6] " + elementFolder.brown.padZero(2);

    return elementString;
};
