function GameCardPlayer() {
    this.initialize.apply(this, arguments);
}

GameCardPlayer.prototype.initialize = function () {
    this._name = '';
    this._folders = [];
    this._storedCards = [];
};

GameCardPlayer.prototype.getName = function () {
    return this._name;
};

GameCardPlayer.prototype.getFolders = function () {
    return this._folders;
};

GameCardPlayer.prototype.getStoredCards = function () {
    return this._storedCards;
};

// toStore Object {id: amount: } or [{},{}]
GameCardPlayer.prototype.addCards = function (toStore, storage) {
    if (toStore) {
        if (Array.isArray(toStore) === false) {
            toStore = [toStore];
        }
    }else{
        toStore = [];
    }

    NextCard:
    for (let index = 0; index < toStore.length; index++) {
        if (!toStore[index].id && !toStore[index].amount) {
            continue;
        }
        
        for (let indexStorage = 0; indexStorage < storage.length; indexStorage++) {
            if (toStore[index].id === storage[indexStorage].id) {
                storage[indexStorage].amount += toStore[index].amount;
                continue NextCard;
            };
        }
        storage.push(toStore[index]);
    }
};

// toRemove Object {id: amount: } or [{},{}]
GameCardPlayer.prototype.removeCards = function (toRemove, storage) {
    if (toRemove) {
        if (Array.isArray(toRemove) === false) {
            toRemove = [toRemove];
        }
    }else{
        toRemove = [];
    }

    for (let index = 0; index < toRemove.length; index++) {
        if (!toRemove[index].id && !toRemove[index].amount) {
            continue;
        }

        for (let indexStorage = 0; indexStorage < storage.length; indexStorage++) {
            if (toRemove[index].id === storage[indexStorage].id) {
                storage[indexStorage].amount -= toRemove[index].amount;

                if (storage[indexStorage].amount <= 0) {
                    storage.splice(indexStorage, 1);
                }
            };
        }
    }
};

GameCardPlayer.prototype.storageCards = function (cards) {
    this.addCards(cards, this._storedCards);
};

GameCardPlayer.prototype.withdrawCards = function (cards) {
    this.removeCards(cards, this._storedCards);
};

GameCardPlayer.prototype.storageCardsFolder = function (cards, index) {
    if (this._folders[index] === undefined) {
        this._folders[index] = this.createFolder();
    }

    this.addCards(cards, this.getFolderCollection(index));
};

GameCardPlayer.prototype.withdrawCardsFolder = function (cards, index) {
    if (this._folders[index]) {
        this.removeCards(cards, this.getFolderCollection(index));
    }
};

GameCardPlayer.prototype.createFolder = function () {
    return new GameFolder({ name: 'setName', collection: [] });
};

GameCardPlayer.prototype.addFolder = function () {
    this._folders.push(this.createFolder());
};

GameCardPlayer.prototype.removeFolder = function (index) {
    this._folders.splice(index, 1);
};

GameCardPlayer.prototype.getFolder = function (index) {
    return this._folders[index];
};

GameCardPlayer.prototype.getFolderName = function (index) {
    return this._folders[index].getName();
};

GameCardPlayer.prototype.getFolderCollection = function (index) {
    return this._folders[index].getCollection();
};

GameCardPlayer.prototype.setNameFolder = function (name, index) {
    this._folders[index].setName(name);
};

GameCardPlayer.prototype.getFoldersLength = function () {
    return this._folders.length;
};

GameCardPlayer.prototype.createDuelist = function (index) {
    return {
        name: this.getName(),
        folders: {
            name: this.getFolderName(index),
            collection: this.getFolderCollection(index)
        }
    }
};
