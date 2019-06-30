function SpriteHandlerCollection() {
    this.initialize.apply(this, arguments);
};

SpriteHandlerCollection.prototype = Object.create(SpriteCollection.prototype);
SpriteHandlerCollection.prototype.constructor = SpriteHandlerCollection;

SpriteHandlerCollection.prototype.initialize = function () {
    SpriteCollection.prototype.initialize.call(this);
    this._index = 0;
    this._lastIndex = this.getMaxIndex();


    this._selectionActive = false;
    this._selection = {};
};

SpriteHandlerCollection.prototype.getIndex = function () {
    return this._index;
};

SpriteHandlerCollection.prototype.getLastIndex = function () {
    return this._lastIndex;
};

SpriteHandlerCollection.prototype.setIndex = function (index) {
    this._index = index;
};

SpriteHandlerCollection.prototype.setLastIndex = function (index) {
    this._lastIndex = index;
};

SpriteHandlerCollection.prototype.getMaxIndex = function () {
    return this._cards.length;
};

SpriteHandlerCollection.prototype.distinctIndex = function () {
    return this.getIndex() !== this.getLastIndex();
};

SpriteHandlerCollection.prototype.isActiveSelection = function () {
    return this._selectionActive;
};

SpriteHandlerCollection.prototype.activeSelection = function () {
    this._lastIndex = this.getMaxIndex();
    this._selectionActive = true;
};

SpriteHandlerCollection.prototype.getSelection = function () {
    return this._selection;
};

SpriteHandlerCollection.prototype.setSelection = function (Params) {
    this._selection = Params;
};

SpriteHandlerCollection.prototype.isRange = function (index, Range) {
    return index + 1 >= Range.min && index + 1 <= Range.max;
};

SpriteHandlerCollection.prototype.showCollection = function (Range) {
    let actions = [];

    this._cards.forEach((GameCard, index) => {
        if (this._sprites[index] && this.isRange(index, Range)) {
            actions.push(this.positionHand(index));
            actions.push(this.waitMoment(index, index * 6));
            actions.push(this.moveField(index));
            
        }
    });

    this.addActions(actions);
};

SpriteHandlerCollection.prototype.update = function () {
    SpriteCollection.prototype.update.call(this);
    this.updateSelection();
};

SpriteHandlerCollection.prototype.stopMove = function () {
    return this.voidActions() && this.noWaitingCollection();
};

SpriteHandlerCollection.prototype.updateSelection = function () {
    if (this.isActiveSelection() && this.stopMove()) {
        this.updateCursor();
        this.updateIndex();
    }
};

SpriteHandlerCollection.prototype.updateCursor = function () {
    if (Input.isRepeated('left') && !TouchInput.isTriggered()) {
        this.cursorMove(this.getIndex() - 1);
    }

    if (Input.isRepeated('right') && !TouchInput.isTriggered()) {
        this.cursorMove(this.getIndex() + 1);
    }

    if (TouchInput.isTriggered()) {
        this.cursorMove(this.touchChild());
        console.log(this.touchChild())
    }

    if (this.distinctIndex()) {
        SoundManager.playCursor();
        TouchInput.clear();
    }
};

SpriteHandlerCollection.prototype.touchChild = function () {
    let childTouched = this.getIndex();

    this._cards.forEach((GameCard, index) => {
        if (this.isTouchSpriteChild(index)) {
            return childTouched = index;
        };
    });

    return childTouched;
};

SpriteHandlerCollection.prototype.isTouchSpriteChild = function (index) {
    let child = this.selectChild(index);
    let childX = this.targetTouch.call(child, TouchInput.x, 'x');
    let childY = this.targetTouch.call(child, TouchInput.y, 'y');
    let delimiterX = 104;
    let delimiterY = 120;

    return (childX >= 0 && childX <= delimiterX) && 
    (childY >= 0 && childY <= delimiterY);
};

SpriteHandlerCollection.prototype.targetTouch = function (touchInput, prop) {
    let node = this;
    while (node) {
        touchInput -= node[prop];
        node = node.parent;
    }
    return touchInput;
};

SpriteHandlerCollection.prototype.cursorMove = function (index) {
    if (this.getMaxIndex()) {
        if (this.isRange(index, {min: 1, max: this.getMaxIndex()})) {
            this.setIndex(index);
        } else {
            if (index > 0) {
                this.setIndex(0);
            } else {
                this.setIndex(this.getMaxIndex() - 1);
            }
        }
    }
};

SpriteHandlerCollection.prototype.updateIndex = function () {
    if (this.distinctIndex()) {
        this.updateSelect();
        this.setLastIndex(this.getIndex());
    }
};

SpriteHandlerCollection.prototype.updateSelect = function () {
    let actions = [];

    this._cards.forEach((GameCard, index) => {
        if (this._sprites[index]) {
            if (this.getIndex() === index) {
                if (this.isUnselect(index)) {
                    actions.push(this.select(index));
                }
            } else {
                if (this.isSelected(index)) {
                    actions.push(this.unselect(index));
                }
            }
        }
    });
    this.addActions(actions);
    this.tallChild(this.getIndex());    
};