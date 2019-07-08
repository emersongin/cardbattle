function SpriteHandlerCollection() {
    this.initialize.apply(this, arguments);
};

SpriteHandlerCollection.prototype = Object.create(SpriteCollection.prototype);
SpriteHandlerCollection.prototype.constructor = SpriteHandlerCollection;

SpriteHandlerCollection.prototype.initialize = function () {
    SpriteCollection.prototype.initialize.call(this);
    this._index = 0;
    this._lastIndex = 0;
    this._activeSelect = false;
    this._settings = {};
    this._definedList = [];
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

SpriteHandlerCollection.prototype.isActiveSelect = function () {
    return this._activeSelect;
};

SpriteHandlerCollection.prototype.selectActivate = function () {
    this._lastIndex = this.getMaxIndex();
    this._activeSelect = true;
    this.allowTypeChildren();
};

SpriteHandlerCollection.prototype.getSettings = function () {
    return this._settings;
};

SpriteHandlerCollection.prototype.setSettings = function (settings) {
    this._settings = settings;
};

SpriteHandlerCollection.prototype.isRange = function (index, Range) {
    return index + 1 >= Range.min && index + 1 <= Range.max;
};

SpriteHandlerCollection.prototype.stopMovements = function () {
    return this.voidActions() && this.noWaitingCollection();
};

SpriteHandlerCollection.prototype.update = function () {
    SpriteCollection.prototype.update.call(this);
    this.updateSetSelection();
};

SpriteHandlerCollection.prototype.updateSetSelection = function () {
    if (this.isActiveSelect() && this.stopMovements()) {
        this.updateAction();
        this.updateSet();
        this.updateChoice();
        this.updateEndSelect();
    }
};

SpriteHandlerCollection.prototype.updateEndSelect = function () {
    if (this._definedList.length >= this._settings.amount) {
        this._activeSelect = false;
    }
};

SpriteHandlerCollection.prototype.updateAction = function () {
    this.pressLeft();
    this.pressRight();
    this.touching();
};

SpriteHandlerCollection.prototype.pressLeft = function () {
    if (Input.isRepeated('left') && !TouchInput.isTriggered()) {
        this.cursorMove(this.getIndex() - 1);
    }
};

SpriteHandlerCollection.prototype.pressRight = function () {
    if (Input.isRepeated('right') && !TouchInput.isTriggered()) {
        this.cursorMove(this.getIndex() + 1);
    }
};

SpriteHandlerCollection.prototype.touching = function () {
    if (TouchInput.isTriggered()) {
        this.cursorMove(this.touchChild());
    }
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

SpriteHandlerCollection.prototype.updateSet = function () {
    if (this.distinctIndex()) {
        this.setLastIndex(this.getIndex());
        this.updateSetSelect();
        TouchInput.clear();
    }
};

SpriteHandlerCollection.prototype.updateSetSelect = function () {
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

SpriteHandlerCollection.prototype.allowTypeChildren = function () {
    let actions = [];

    this._cards.forEach((GameCard, index) => {
        switch (this._settings.type) {
            case 'POWER_CARD':
                if (GameCard.getType() === 'POWER_CARD') {
                    actions.push(this.enabled(index));
                } else {
                    actions.push(this.disabled(index));
                }
            break;
            default:
            break;
        }
    });

    this.addActions(actions);
};

SpriteHandlerCollection.prototype.updateChoice = function () {

    if (Input.isTriggered('ok') || (TouchInput.isTriggered() && this.touchChildSelected())) {
        switch (this._settings.selectType) {
            case 'SELECT_REACT':
                this.selectPowerCard();
            break;
            default:
                // if (this.isUnlike(index)) {
                //     this._definedList.push(index);
                //     this.addActions(this.like(index));
                // } else {
                //     let indexOf = this._definedList.indexOf(index);
                //     this._definedList.splice(indexOf, 1);
                //     this.addActions(this.unlike(index));
                // }
            break;
        }
    }
};

SpriteHandlerCollection.prototype.touchChildSelected = function () {
    let index = this.getIndex();
    return this.isSelected(index) && this.isTouchSpriteChild(index);
};

SpriteHandlerCollection.prototype.selectPowerCard = function () {
    let index = this.getIndex();

    if (this.isEnabled(index)) {
        this.addActions(this.react(index));
        this._definedList.push(index);
    } else {
        //SOM DE REJEIÇÃO
    }
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

SpriteHandlerCollection.prototype.closeCollection = function (Range) {
    let actions = [];

    this._cards.forEach((GameCard, index) => {
        if (this._sprites[index] && this.isRange(index, Range)) {
            actions.push(this.close(index));
        }
    });

    this.addActions(actions);
};

SpriteHandlerCollection.prototype.flashCollection = function (Range) {
    let actions = [];

    this._cards.forEach((GameCard, index) => {
        if (this._sprites[index] && this.isRange(index, Range)) {
            actions.push(this.waitMoment(index, index * 8));
            actions.push(this.flash(index));
        }
    });

    this.addActions(actions);
};

SpriteHandlerCollection.prototype.toTurnCollection = function (Range) {
    let actions = [];

    this._cards.forEach((GameCard, index) => {
        if (this._sprites[index] && this.isRange(index, Range)) {
            actions.push(this.waitMoment(index, index * 16));
            actions.push(this.toTurn(index));
        }
    });

    this.addActions(actions);
};
