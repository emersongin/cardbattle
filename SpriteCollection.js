function SpriteCollection() {
    this.initialize.apply(this, arguments);
};

SpriteCollection.prototype = Object.create(Sprite.prototype);
SpriteCollection.prototype.constructor = SpriteCollection;

SpriteCollection.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._collection = [];
};

SpriteCollection.prototype.refreshCollection = function(GameCardCollection) {
    this._collection = [];

    GameCardCollection.forEach(GameCard => {
        this._collection.push(GameCard);
    });
};

SpriteCollection.prototype.addCard = function(GameCard) {
    this._collection.push(GameCard);
};

SpriteCollection.prototype.selectChild = function(index) {
    return this.children[index];
};

SpriteCollection.prototype.addChildren = function() {
    this._collection.forEach((GameCard, index) => {
        this.addChildAt(new SpriteCard(GameCard), index);
    });
};

SpriteCollection.prototype.removeChildren = function() {
    this.children.forEach((SpriteCard, index) => {
        this.removeChildAt(index);
    });
};

SpriteCollection.prototype.positionHand = function(index) {
    this.children[index].setActions([
        {type: 'POSITION_HAND'},
        {type: 'REFRESH'},
        {type: 'OPEN'},
        {type: 'LESS', times: 2}
    ]);
};

SpriteCollection.prototype.positionCollection = function(index) {
    this.children[index].setActions([
        {type: 'POSITION_COLLECTION', index, length: this.children.length}
    ]);
};

SpriteCollection.prototype.moveField = function(index) {
    this.children[index].setActions([
        {type: 'MOVE_FIELD', index, frame: 16}
    ]);
};

SpriteCollection.prototype.moveAttack = function(index, target) {
    this.children[index].setActions([
        {type: 'PLUS', times: 2, frame: 20},
        {type: 'CONFIRM'},
        {type: 'LESS', times: 2, frame: 10},
        {type: 'UNCONFIRM'},
        {type: 'MOVE_ATTACK', frame: 3, target}
    ]);
};

SpriteCollection.prototype.open = function(index) {
    this.children[index].setActions([
        {type: 'REFRESH'},
        {type: 'OPEN', index, frame: 10}
    ]);
};

SpriteCollection.prototype.close = function(index) {
    this.children[index].setActions([
        {type: 'CLOSE', index, frame: 10}
    ]);
};

SpriteCollection.prototype.toTurn = function(index) {
    this.children[index].setActions([
        {type: 'CLOSE', frame: 10},
        {type: 'TO_TURN'},
        {type: 'REFRESH'},
        {type: 'OPEN', frame: 10}
    ]);
};

SpriteCollection.prototype.flash = function(index) {
    this.children[index].setActions([
        {type: 'ANIMATION', index: 121, frame: 10}
    ]);
};

SpriteCollection.prototype.enabled = function(index) {
    this.children[index].setActions([
        {type: 'ENABLE'},
        {type: 'REFRESH'}
    ]);
};

SpriteCollection.prototype.disabled = function(index) {
    this.children[index].setActions([
        {type: 'DISABLE'},
        {type: 'REFRESH'}
    ]);
};

SpriteCollection.prototype.isLight = function(index) {
    return this.children[index].isLight();
};

SpriteCollection.prototype.isUnlit = function(index) {
    return this.children[index].isUnlit();
};

SpriteCollection.prototype.isClosed = function(index) {
    return this.children[index].isClose();
};

SpriteCollection.prototype.light = function(index) {
    this.children[index].setActions([
        {type: 'LIGHT'},
        {type: 'MOVE_UP', times: 1, frame: 4}
    ]);
};

SpriteCollection.prototype.unlit = function(index) {
    this.children[index].setActions([
        {type: 'UNLIT'},
        {type: 'MOVE_DOWN', times: 1, frame: 4}
    ]);
};

SpriteCollection.prototype.select = function(index) {
    this.children[index].setActions([
        {type: 'ANIMATION', index: 121, frame: 4},
        {type: 'SELECT'},
        {type: 'REFRESH'}
    ]);
};

SpriteCollection.prototype.unselect = function(index) {
    this.children[index].setActions([
        {type: 'ANIMATION', index: 121, frame: 4},
        {type: 'UNSELECT'},
        {type: 'REFRESH'}
    ]);
};

SpriteCollection.prototype.confirm = function(index) {
    this.children[index].setActions([
        {type: 'UNLIT'},
        {type: 'UNSELECT'},
        {type: 'CONFIRM'}
    ]);
};

SpriteCollection.prototype.react = function(index) {
    this.children[index].setActions([
        {type: 'PLUS', times: 1, frame: 10},
        {type: 'LESS', times: 1, frame: 10}
    ]);
};

SpriteCollection.prototype.effect = function(index) {
    this.children[index].setActions([
        {type: 'CLOSE', index, frame: 10},
        {type: 'EFFECT'},
        {type: 'REFRESH'},
        {type: 'OPEN', index, frame: 10}
    ]);
};

SpriteCollection.prototype.block = function(index) {
    this.children[index].setActions([
        {type: 'BLOCK'},
        {type: 'REFRESH'},
    ]);
};

SpriteCollection.prototype.activeEffect = function(index) {
    this.children[index].setActions([
        {type: 'PLUS', times: 1, frame: 10},
        {type: 'ANIMATION', index: 121, frame: 20},
        {type: 'LESS', times: 6, frame: 20}
    ]);
};

SpriteCollection.prototype.damager = function(index) {
    this.children[index].setActions([
        {type: 'ANIMATION', index: 123},
        {type: 'MOVE_UP', times: 1, frame: 2},
        {type: 'MOVE_DOWN', times: 2, frame: 2},
        {type: 'MOVE_UP', times: 1, frame: 2},
        {type: 'MOVE_LEFT', times: 1, frame: 2},
        {type: 'MOVE_RIGHT', times: 2, frame: 2},
        {type: 'MOVE_LEFT', times: 2, frame: 2},
        {type: 'MOVE_RIGHT', times: 2, frame: 2},
        {type: 'MOVE_LEFT', times: 2, frame: 2},
        {type: 'MOVE_RIGHT', times: 1, frame: 2},
    ]);
};

SpriteCollection.prototype.toDestroy = function(index) {
    this.children[index].setActions([
        {type: 'ANIMATION', index: 123},
        {type: 'MOVE_LEFT', times: 1, frame: 4},
        {type: 'MOVE_RIGHT', times: 2, frame: 4},
        {type: 'MOVE_LEFT', times: 2, frame: 4},
        {type: 'MOVE_RIGHT', times: 2, frame: 4},
        {type: 'MOVE_LEFT', times: 2, frame: 4},
        {type: 'MOVE_RIGHT', times: 1, frame: 4},
        {type: 'CLOSE', frame: 10}
    ]);
};

SpriteCollection.prototype.powerUp = function(index) {
    this.children[index].setActions([
        {type: 'ANIMATION', index: 124, frame: 20},
    ]);
};

SpriteCollection.prototype.powerDown = function(index) {
    this.children[index].setActions([
        {type: 'ANIMATION', index: 125, frame: 20},
    ]);
};

SpriteCollection.prototype.setAttack = function(index, points) {
    this.children[index].setActions([
        {type: 'ATTACK', points}
    ]);
};

SpriteCollection.prototype.setHealth = function(index, points) {
    this.children[index].setActions([
        {type: 'HEALTH', points}
    ]);
};

SpriteCollection.prototype.waitMoment = function(index, wait) {
    this.children[index].setActions([
        {type: 'WAIT', frame: wait}
    ]);
};

SpriteCollection.prototype.update = function() {
    Sprite.prototype.update.call(this);
};
