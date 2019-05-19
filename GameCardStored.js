function GameCardStored() {
    this.initialize.apply(this, arguments);
}

GameCardStored.prototype.constructor = GameCardStored;

GameCardStored.prototype.initialize = function(id = 0, amount = 0) {
    this.id = id;
    this.amount = amount;
};