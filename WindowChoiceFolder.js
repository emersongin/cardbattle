function WindowChoiceFolder() {
    this.initialize.apply(this, arguments);
}

WindowChoiceFolder.prototype = Object.create(Window_Command.prototype);
WindowChoiceFolder.prototype.constructor = WindowChoiceFolder;
    
WindowChoiceFolder.prototype.initialize = function (x, y) {
    Window_Command.prototype.initialize.apply(this, arguments);
    this._folders = [];
    this.openness = 0;
    this.createFolders();
    this.refresh();
};

WindowChoiceFolder.prototype.getFolderColor = function (index) {
    return this._folders[index];
};

WindowChoiceFolder.prototype.windowWidth = function () {
    return 714;
};

WindowChoiceFolder.prototype.numVisibleRows = function () {
    return 3;
};

WindowChoiceFolder.prototype.windowHeight = function () {
    return Graphics.boxHeight / 2;
};

WindowChoiceFolder.prototype.itemHeight = function () {
    let contentHeight = this.height - this.padding * 2;
    return Math.floor(contentHeight / this.numVisibleRows());
};

WindowChoiceFolder.prototype.createFolders = function () {
    let playerFolders = $gameCardPlayer.getFolders();

    playerFolders.forEach(folder => {
        this.createColorFolder(folder.getCollection());
    });
};

WindowChoiceFolder.prototype.createColorFolder = function (collection) {
    let colorFolder = new GameFolderColor();

    collection.forEach(GameCardStore => {
        let cardColor = $dataCards[GameCardStore.id].color;
        colorFolder[cardColor] += GameCardStore.amount;
    });

    this._folders.push(colorFolder);
};

WindowChoiceFolder.prototype.changePosition = function (x, y) {
    this.move(x, y, this.width, this.height);
};

WindowChoiceFolder.prototype.makeCommandList = function () {
    let playerFolders = $gameCardPlayer.getFolders();
    let tag = 'OPTION_FOLDER_';

    playerFolders.forEach((folder, index) => {
        this.addCommand(folder.getName(), tag + index);
    });
};

WindowChoiceFolder.prototype.drawItem = function (index) {
    var rect = this.itemRectForText(index);
    this.drawTextEx(this.commandName(index), rect.x, rect.y + 10);
    this.drawTextEx(this.drawStringColors(index), rect.x, rect.y + 50);
};

WindowChoiceFolder.prototype.drawStringColors = function (index) {
    let gameFolderColor = new GameFolderColor();
    let label = '';
    let indexIcon = 20;

    if (this._folders) {
        gameFolderColor = this.getFolderColor(index);
    }

    for (let key in gameFolderColor) {        
        if (gameFolderColor.hasOwnProperty(key)) {
            label += " \\I[" + indexIcon + "] " + gameFolderColor[key];
            indexIcon++;
        }
    }

    return label;
};
