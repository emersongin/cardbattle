function GameElementFolder(){
    this.initialize.apply(this, arguments);
}

GameElementFolder.prototype.constructor = GameElementFolder;

GameElementFolder.prototype.initialize = function(){
    this.white = 0; 
    this.blue = 0; 
    this.green = 0; 
    this.red = 0;
    this.black = 0;
    this.brown = 0;
};