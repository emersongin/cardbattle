function SpriteGameLuck() {
    this.initialize.apply(this, arguments);
}

SpriteGameLuck.prototype = Object.create(Sprite.prototype);
SpriteGameLuck.prototype.constructor = SpriteGameLuck;

SpriteGameLuck.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._SpriteCollection = new SpriteCollection();
    this.setup();
    this.positionSpriteCollection();
};

SpriteGameLuck.prototype.positionSpriteCollection = function() {
    this._SpriteCollection.x = Graphics.boxWidth / 2.7;
    this._SpriteCollection.y = Graphics.boxHeight / 2.5;
    this.addChild(this._SpriteCollection);
};

SpriteGameLuck.prototype.setup = function() {
    this._indexSelector = 0;
    this._lastIndexSelector = 0;
    this._gameActive = true;
    this._gameResult = false;
    this._active = true;
    this.visible = false;
    this.refreshGameCollection();
    this.gameCardReverse();
    this.refreshSpriteCollection();
};

SpriteGameLuck.prototype.refreshGameCollection = function() {
    this._GameCardCollection = [];
    this._GameCardCollection.push(new GameCard(1));
    this._GameCardCollection.push(new GameCard(2));
    this._lastIndexSelector = this.maxCardsCollection();
};

SpriteGameLuck.prototype.gameCardReverse = function() {
    let random = Math.floor(Math.random() * 2);
    for (let index = 0; index < random; index++) {
        this._GameCardCollection.reverse();
    }
};

SpriteGameLuck.prototype.refreshSpriteCollection = function() {
    this._SpriteCollection.removeChildren();
    this._SpriteCollection.refreshCollection(this._GameCardCollection);
    this._SpriteCollection.addChildren();
};

SpriteGameLuck.prototype.isActive = function() {
    return this._active;
};

SpriteGameLuck.prototype.enable = function() {
    this._active = true;
};

SpriteGameLuck.prototype.disable = function() {
    this._active = false;
};

SpriteGameLuck.prototype.isShown = function() {
    return this.visible;
};

SpriteGameLuck.prototype.isHidden = function() {
    return !this.visible;
};

SpriteGameLuck.prototype.show = function() {
    this.visible = true;
};

SpriteGameLuck.prototype.hide = function() {
    this.visible = false;
};

SpriteGameLuck.prototype.getIndexSelector = function() {
    return this._indexSelector;
};

SpriteGameLuck.prototype.setIndexSelector = function(index) {
    this._indexSelector = index;
};

SpriteGameLuck.prototype.getLastIndexSelector = function() {
    return this._lastIndexSelector;
};

SpriteGameLuck.prototype.setLastIndexSelector = function(index) {
    this._lastIndexSelector = index;
};

SpriteGameLuck.prototype.maxCardsCollection = function() {
    return this._GameCardCollection.length;
};

SpriteGameLuck.prototype.isGameOn = function() {
    return this._gameActive;
};

SpriteGameLuck.prototype.isGameOff = function() {
    return !this._gameActive;
};

SpriteGameLuck.prototype.gameOff = function() {
    this._gameActive = false;
};

SpriteGameLuck.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this.isActive() && this.isShown() && this.isGameOn()) {
        this.updateCardCursorMove();
        this.updateCardCursor();
        this.updateGame();
    };
    this.updateEndGame();
};

SpriteGameLuck.prototype.updateIndex = function() {
    return this.getIndexSelector() !== this.getLastIndexSelector();
};

SpriteGameLuck.prototype.updateCardCursorMove = function() {
    if (Input.isRepeated('left') || TouchInput.isTriggered() && this.touchKey('left')) {
        this.cursorLeft();
    }

    if (Input.isRepeated('right') || TouchInput.isTriggered() && this.touchKey('right')) {
        this.cursorRight();
    }

    if (this.updateIndex()) {
        SoundManager.playCursor();
        TouchInput.clear();
    }
};

SpriteGameLuck.prototype.touchKey = function(key) {
    switch (key) {
        case 'left':
            if (this.getIndexSelector()) {
                return this.isTouchSpriteChild(this.getIndexSelector() - 1);
            }
            break;
        case 'right':
            if (this.getIndexSelector() < this.maxCardsCollection() - 1) {
                return this.isTouchSpriteChild(this.getIndexSelector() + 1);
            }
            break;
        default:
            return false;
    }
};

SpriteGameLuck.prototype.isTouchSpriteChild = function(index) {
    let x = this.canvasToLocalX.call(this._SpriteCollection.selectChild(index), TouchInput.x);
    let y = this.canvasToLocalY.call(this._SpriteCollection.selectChild(index), TouchInput.y);

    if (x >= 0 && x <= 104 && y >= 0 && y <= 120) {return true;} else {return false;};
};

SpriteGameLuck.prototype.canvasToLocalX = function(x) {
    let node = this;

    while (node) {
        x -= node.x;
        node = node.parent;
    }
    return x;
};

SpriteGameLuck.prototype.canvasToLocalY = function(y) {
    let node = this;

    while (node) {
        y -= node.y;
        node = node.parent;
    }
    return y;
};

SpriteGameLuck.prototype.cursorRight = function() {
    if (this.maxCardsCollection() && this.getIndexSelector() < this.maxCardsCollection() - 1) {
        this.setIndexSelector(this.getIndexSelector() + 1);
    }
};

SpriteGameLuck.prototype.cursorLeft = function() {
    if (this.maxCardsCollection() && this.getIndexSelector()) {
        this.setIndexSelector(this.getIndexSelector() - 1);
    }
};

SpriteGameLuck.prototype.updateCardCursor = function() {
    if (this.updateIndex()) {
        this.updateCardSelect();
        this.setLastIndexSelector(this.getIndexSelector());
    }
};

SpriteGameLuck.prototype.updateCardSelect = function() {
    this._GameCardCollection.forEach((GameCard, index) => {
        if (index === this.getIndexSelector()) {
            if (this._SpriteCollection.isUnlit(index)) {
                this._SpriteCollection.light(index);
            }
        } else {
            if (this._SpriteCollection.isLight(index)) {
                this._SpriteCollection.unlit(index);
            }
        }
    });
};

SpriteGameLuck.prototype.updateGame = function() {
    if (Input.isTriggered('ok') || TouchInput.isTriggered() && this.touchTurnCard()) {
        let index = this.getIndexSelector();

        this.closeMoviment();
        if (this._GameCardCollection[index].getID() === 1) {
            this._gameResult = true;
        }
        this.gameOff();
    }
};

SpriteGameLuck.prototype.updateEndGame = function() {
    if (this.isGameOff() && this.isActive() && this.collectionEndMove()) {
        this.disable();
    };
};

SpriteGameLuck.prototype.collectionEndMove = function() {
    return !this._SpriteCollection.hasFramesCollection();
};

SpriteGameLuck.prototype.touchTurnCard = function() {
    let index = this.getIndexSelector();
    return this._SpriteCollection.isLight(index) && this.isTouchSpriteChild(index);
};

SpriteGameLuck.prototype.closeMoviment = function() {
    this._GameCardCollection.forEach((GameCard, index) => {
        if (index === this.getIndexSelector()) {
            this._SpriteCollection.react(index);
            this._SpriteCollection.toTurn(index);
        }
        if (index !== this.getIndexSelector()) {
            this._SpriteCollection.waitMoment(index, 60);
            this._SpriteCollection.toTurn(index);
        }
        this._SpriteCollection.waitMoment(index, 60);
        this._SpriteCollection.close(index);
    });
};

SpriteGameLuck.prototype.openCards = function() {
    this._GameCardCollection.forEach((GameCard, index) => {
        this._SpriteCollection.positionCollection(index);
        this._SpriteCollection.open(index);
    });
};
