function SpriteLuckyGame() {
    this.initialize.apply(this, arguments);
}

SpriteLuckyGame.prototype = Object.create(Sprite.prototype);
SpriteLuckyGame.prototype.constructor = SpriteLuckyGame;

SpriteLuckyGame.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._SpriteCollection = new SpriteCollection();
    this.setup();
    this.positionSpriteCollection();
};

SpriteLuckyGame.prototype.positionSpriteCollection = function() {
    this._SpriteCollection.x = Graphics.boxWidth / 2.7;
    this._SpriteCollection.y = Graphics.boxHeight / 2.5;
    this.addChild(this._SpriteCollection);
};

SpriteLuckyGame.prototype.setup = function() {
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

SpriteLuckyGame.prototype.refreshGameCollection = function() {
    this._GameCardCollection = [];
    this._GameCardCollection.push(new GameCard(1));
    this._GameCardCollection.push(new GameCard(2));
    this._lastIndexSelector = this.maxCardsCollection();
};

SpriteLuckyGame.prototype.gameCardReverse = function() {
    let random = Math.floor(Math.random() * 2);
    for (let index = 0; index < random; index++) {
        this._GameCardCollection.reverse();
    }
};

SpriteLuckyGame.prototype.refreshSpriteCollection = function() {
    this._SpriteCollection.removeChildren();
    this._SpriteCollection.refreshCollections(this._GameCardCollection);
    this._SpriteCollection.addChildren();
};

SpriteLuckyGame.prototype.isActive = function() {
    return this._active;
};

SpriteLuckyGame.prototype.enable = function() {
    this._active = true;
};

SpriteLuckyGame.prototype.disable = function() {
    this._active = false;
};

SpriteLuckyGame.prototype.isShown = function() {
    return this.visible;
};

SpriteLuckyGame.prototype.isHidden = function() {
    return !this.visible;
};

SpriteLuckyGame.prototype.show = function() {
    this.visible = true;
};

SpriteLuckyGame.prototype.hide = function() {
    this.visible = false;
};

SpriteLuckyGame.prototype.getIndexSelector = function() {
    return this._indexSelector;
};

SpriteLuckyGame.prototype.setIndexSelector = function(index) {
    this._indexSelector = index;
};

SpriteLuckyGame.prototype.getLastIndexSelector = function() {
    return this._lastIndexSelector;
};

SpriteLuckyGame.prototype.setLastIndexSelector = function(index) {
    this._lastIndexSelector = index;
};

SpriteLuckyGame.prototype.maxCardsCollection = function() {
    return this._GameCardCollection.length;
};

SpriteLuckyGame.prototype.isGameOn = function() {
    return this._gameActive;
};

SpriteLuckyGame.prototype.isGameOff = function() {
    return !this._gameActive;
};

SpriteLuckyGame.prototype.gameOff = function() {
    this._gameActive = false;
};

SpriteLuckyGame.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this.isActive() && this.isShown() && this.isGameOn()) {
        this.updateCardCursorMove();
        this.updateCardCursor();
        this.updateGame();
    };
    this.updateEndGame();
};

SpriteLuckyGame.prototype.updateIndex = function() {
    return this.getIndexSelector() !== this.getLastIndexSelector();
};

SpriteLuckyGame.prototype.updateCardCursorMove = function() {
    if (Input.isRepeated('left') && !TouchInput.isTriggered()) {
        this.cursorMove(this.getIndexSelector() - 1);
    }

    if (Input.isRepeated('right') && !TouchInput.isTriggered()) {
        this.cursorMove(this.getIndexSelector() + 1);
    }

    if (TouchInput.isTriggered()) {
        this.cursorMove(this.touchChild());
    }

    if (this.updateIndex()) {
        SoundManager.playCursor();
        TouchInput.clear();
    }
};

SpriteLuckyGame.prototype.cursorMove = function(index) {
    if (this.maxCardsCollection()) {
        if (index > 0) {
            if (index < this.maxCardsCollection() - 1) {
                this.setIndexSelector(index);
            } else {
                this.setIndexSelector(this.maxCardsCollection() - 1);
            }
        } else {
            if (index !== undefined) {
                this.setIndexSelector(0);
            }
        }
    }
};

SpriteLuckyGame.prototype.touchChild = function() {
    let childTouched;

    this._GameCardCollection.forEach((GameCard, index) => {
        if (this.isTouchSpriteChild(index)) {
            childTouched = index;
        };
    });

    return childTouched;
};

SpriteLuckyGame.prototype.isTouchSpriteChild = function(index) {
    let child = this._SpriteCollection.selectChild(index);
    let childX = this.targetTouchX.call(child, TouchInput.x);
    let childY = this.targetTouchY.call(child, TouchInput.y);
    let delimiterX = 104;
    let delimiterY = 120;

    return (childX >= 0 && childX <= delimiterX) && 
    (childY >= 0 && childY <= delimiterY);
};

SpriteLuckyGame.prototype.targetTouchX = function(touchInputX) {
    let node = this;

    while (node) {
        touchInputX -= node.x;
        node = node.parent;
    }

    return touchInputX;
};

SpriteLuckyGame.prototype.targetTouchY = function(touchInputY) {
    let node = this;

    while (node) {
        touchInputY -= node.y;
        node = node.parent;
    }
    return touchInputY;
};

SpriteLuckyGame.prototype.updateCardCursor = function() {
    if (this.updateIndex()) {
        this.updateCardSelect();
        this.setLastIndexSelector(this.getIndexSelector());
    }
};

SpriteLuckyGame.prototype.updateCardSelect = function() {
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
    this._SpriteCollection.highChild(this.getIndexSelector());
};

SpriteLuckyGame.prototype.updateGame = function() {
    if (Input.isTriggered('ok') || (TouchInput.isTriggered() && this.touchTurnCard())) {
        let index = this.getIndexSelector();

        this.closeMoviment();
        if (this._GameCardCollection[index].getID() === 1) {
            this._gameResult = true;
        }
        this.gameOff();
    }
};

SpriteLuckyGame.prototype.updateEndGame = function() {
    if (this.isGameOff() && this.isActive() && this.collectionEndMove()) {
        this.disable();
    };
};

SpriteLuckyGame.prototype.collectionEndMove = function() {
    return !this._SpriteCollection.hasFramesCollection();
};

SpriteLuckyGame.prototype.touchTurnCard = function() {
    let index = this.getIndexSelector();
    return this._SpriteCollection.isLight(index) && this.isTouchSpriteChild(index);
};

SpriteLuckyGame.prototype.closeMoviment = function() {
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

SpriteLuckyGame.prototype.openCards = function() {
    this._GameCardCollection.forEach((GameCard, index) => {
        this._SpriteCollection.positionCollection(index);
        this._SpriteCollection.waitMoment(index, index * 8);
        this._SpriteCollection.open(index);
    });
};
