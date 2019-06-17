function GameCardStored() {
    this.initialize.apply(this, arguments);
}

GameCardStored.prototype.constructor = GameCardStored;

GameCardStored.prototype.initialize = function (id, amount) {
    this.id = id;
    this.amount = amount;
};