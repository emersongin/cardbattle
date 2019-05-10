function GameCardPlayer() {
    this.initialize.apply(this, arguments);
}

GameCardPlayer.prototype.initialize = function() {
    this._storedCards = [];
    this._storedDecks = [];
};

GameCardPlayer.prototype.getStoredCards = function() {
    return this._storedCards;
};

GameCardPlayer.prototype.getStoredDecks = function() {
    return this._storedDecks;
};

GameCardPlayer.prototype.setStoredCards = function(storageToChange) {
    this._storedCards = storageToChange;
};

GameCardPlayer.prototype.setStoredDecks = function(decksToChange) {
    this._storedDecks = decksToChange;
};

// toStore Object {id: amount: } or [{},{}]
GameCardPlayer.prototype.addCards = function(toStore, storage) {
    if(Array.isArray(toStore) === false){
        if(!toStore){
            toStore = [];
        }else{
            toStore = [toStore];
        }
    }
    
    NextCard:
    for (let index = 0; index < toStore.length; index++) {
        if(!toStore[index].id && !toStore[index].amount){
            continue;
        }
        
        for (let indexStorage = 0; indexStorage < storage.length; indexStorage++) {
            if(toStore[index].id === storage[indexStorage].id){
                storage[indexStorage].amount += toStore[index].amount;
                continue NextCard;
            };
        }
        storage.push(toStore[index]);
    }
};

// toRemove Object {id: amount: } or [{},{}]
GameCardPlayer.prototype.removeCards = function(toRemove, storage) {
    if(Array.isArray(toRemove) === false){
        if(!toRemove){
            toRemove = [];
        }else{
            toRemove = [toRemove];
        }
    }

    for (let index = 0; index < toRemove.length; index++) {
        if(!toRemove[index].id && !toRemove[index].amount){
            continue;
        }

        for (let indexStorage = 0; indexStorage < storage.length; indexStorage++) {
            if(toRemove[index].id === storage[indexStorage].id){
                storage[indexStorage].amount -= toRemove[index].amount;

                if(storage[indexStorage].amount <= 0){
                    storage.splice(indexStorage, 1);
                }
            };
        }
    }
};

GameCardPlayer.prototype.addCardsToStorage = function(toStored) {
    this.addCards(toStored, this._storedCards);
};

GameCardPlayer.prototype.addCardsToDeck = function(toStored, indexDeck) {
    if(this._storedDecks[indexDeck] === undefined){
        this._storedDecks[indexDeck] = new Array();
    }

    this.addCards(toStored, this._storedDecks[indexDeck]);
};

GameCardPlayer.prototype.removeCardsToStorage = function(toRemove) {
    this.addCards(toRemove, this._storedCards);
};

GameCardPlayer.prototype.removeCardsToDeck = function(toRemove, indexDeck) {
    if(this._storedDecks[indexDeck] === undefined){
        return false;
    }

    this.removeCards(toRemove, this._storedDecks[indexDeck]);
};

GameCardPlayer.prototype.addDeck = function(newDeck) {
    this._storedDecks.push(newDeck);
};

GameCardPlayer.prototype.removeDeck = function(index) {
    this._storedDecks.splice(index, 1);
};

