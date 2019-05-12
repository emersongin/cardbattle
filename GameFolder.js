function GameFolder(){
    this.initialize.apply(this, arguments);
}

GameFolder.prototype.constructor = GameFolder;

GameFolder.prototype.initialize = function(name = 'setName', folder = []){
    this.name = name;
    this.folder = folder;
};