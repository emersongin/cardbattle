function WindowChoiceFolder() {
    this.initialize.apply(this, arguments);
}

WindowChoiceFolder.prototype = Object.create(Window_Command.prototype);
WindowChoiceFolder.prototype.constructor = WindowChoiceFolder;
    
WindowChoiceFolder.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.apply(this, arguments);
    this._folders = [];
    this.openness = 0;
    this.initialSetup();
};

WindowChoiceFolder.prototype.initialSetup = function() {
    this.move(Graphics.boxWidth / 16, Graphics.boxHeight / 3.5, this.width, this.height);
    this.createElementsFolder();
};

WindowChoiceFolder.prototype.windowWidth = function() {
    return 714;
};

WindowChoiceFolder.prototype.numVisibleRows = function() {
    return 3;
};

WindowChoiceFolder.prototype.itemTextAlign = function() {
    return 'left';
};

WindowChoiceFolder.prototype.windowHeight = function() {
    return Graphics.boxHeight / 2;
};

WindowChoiceFolder.prototype.itemHeight = function() {
    let clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
};

WindowChoiceFolder.prototype.makeCommandList = function() {
    for (let index = 0; index < 3; index++) {
        this.addCommand($gameCardPlayer.getNameFolder(index), 'folder' + index);
    }
};

WindowChoiceFolder.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    this.drawTextEx(this.commandName(index), rect.x, rect.y + 10);
    this.drawTextEx(this.createElementsString(index), rect.x, rect.y + 50);
};

WindowChoiceFolder.prototype.createElementsString = function(index) {
    let elementsFolder = {};
    let string = '';

    elementsFolder.white = 0;
    elementsFolder.blue = 0;
    elementsFolder.green = 0;
    elementsFolder.red = 0;
    elementsFolder.black = 0;
    elementsFolder.brown = 0;

    if(this._folders){
        elementsFolder = this._folders[index];
    }

    string += " \\I[1] " + elementsFolder.white.padZero(2);
    string += " \\I[2] " + elementsFolder.blue.padZero(2);
    string += " \\I[3] " + elementsFolder.green.padZero(2);
    string += " \\I[4] " + elementsFolder.red.padZero(2);
    string += " \\I[5] " + elementsFolder.black.padZero(2);
    string += " \\I[6] " + elementsFolder.brown.padZero(2);

    return string;
};

WindowChoiceFolder.prototype.createElementsFolder = function() {
    let folders = $gameCardPlayer.getStoredDecks();

    folders.forEach((deck, index) => {
        this.addFolder(deck.folder);
        this.redrawItem(index);
    });
};

WindowChoiceFolder.prototype.addFolder = function(folder) {
    let elementsFolder = {};
    elementsFolder.white = 0; 
    elementsFolder.blue = 0; 
    elementsFolder.green = 0; 
    elementsFolder.red = 0;
    elementsFolder.black = 0;
    elementsFolder.brown = 0;

    folder.forEach(card => {
        elementsFolder[$dataCards[card.id].color] += card.amount;
    });

    this._folders.push(elementsFolder);
};
