function GameColorFolder() {
    this.initialize.apply(this, arguments);
}

GameColorFolder.prototype.constructor = GameColorFolder;

GameColorFolder.prototype.initialize = function() {
    this.white = 0; 
    this.blue = 0; 
    this.green = 0; 
    this.red = 0;
    this.black = 0;
    this.brown = 0;
};