function SpriteCollection() {
    this.initialize.apply(this, arguments);
};

SpriteCollection.prototype = Object.create(Sprite.prototype);
SpriteCollection.prototype.constructor = SpriteCollection;

SpriteCollection.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this._cards = [];
    this._sprites = [];
    this._actions  = [];
    this.createLayers();
};

SpriteCollection.prototype.createLayers = function () {
    this._lowLayer = new Sprite();
    this._highLayer = new Sprite();
    this.addChildAt(this._lowLayer, 0);
    this.addChildAt(this._highLayer, 1);
};

SpriteCollection.prototype.clearCollections = function () {
    this._cards = [];
    this._sprites = [];
};

SpriteCollection.prototype.refreshCollections = function (GameCardCollection) {
    this.clearCollections();

    GameCardCollection.forEach(GameCard => {
        this.addCard(GameCard);
        this.addSprite(GameCard);
    });
};

SpriteCollection.prototype.addCard = function (GameCard) {
    this._cards.push(GameCard);
};

SpriteCollection.prototype.addSprite = function (GameCard) {
    this._sprites.push(new SpriteCard(GameCard));
};

SpriteCollection.prototype.addChildren = function () {
    this._sprites.forEach(SpriteCard => {
        this.addChild(SpriteCard);
    });
};

SpriteCollection.prototype.removeChildren = function () {
    this._sprites.forEach(SpriteCard => {
        this.removeChild(SpriteCard);
    });
};

SpriteCollection.prototype.addChildIndex = function (index) {
    this.addChild(this._sprites[index]);
};

SpriteCollection.prototype.removeChildIndex = function (index) {
    this.removeChild(this._sprites[index]);
};

SpriteCollection.prototype.tallChild = function (index) {
    this.removeChildren();

    this._sprites.forEach(SpriteCard => {
        if (this._sprites[index] === SpriteCard) {
            this.addChildToFront(SpriteCard);
        } else {
            this.addChildToBack(SpriteCard);
        }
    });
};

SpriteCollection.prototype.addChildToFront = function (SpriteCard) {
    let indexHigh = this.children.indexOf(this._highLayer);
    this.addChildAt(SpriteCard, indexHigh + 1);
};

SpriteCollection.prototype.addChildToBack = function (SpriteCard) {
    let indexLow = this.children.indexOf(this._lowLayer);
    this.addChildAt(SpriteCard, indexLow + 1);
};

SpriteCollection.prototype.hasActions = function () {
    return this._actions.length;
}

SpriteCollection.prototype.voidActions = function () {
    return !this._actions.length;
}

SpriteCollection.prototype.busyCollection = function () {
    let busy = false;

    this._sprites.forEach(SpriteCard => {
        let indexChild = this.children.indexOf(SpriteCard);
        let child = this.children[indexChild];

        if (child) {
            if (child.hasSequence() || child.itsMoving()) {
                return busy = true;
            };
        }
    });
    return busy;
};

SpriteCollection.prototype.noWaitingCollection = function () {
    return !this.busyCollection();
};

SpriteCollection.prototype.addActions = function (actions) {
    if (Array.isArray(actions)) {
        this._actions.push(actions);
    } else {
        if (actions) {
            actions = [actions];
        }else{
            actions = [];
        }

        this._actions.push(actions);
    }
};

SpriteCollection.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateActions();
};

SpriteCollection.prototype.updateActions = function () {
    if (this.hasActions() && this.noWaitingCollection()) {
        this.toMove(this._actions.shift());
    }
};

SpriteCollection.prototype.toMove = function (Actions) {
    Actions.forEach(Action => {
        this.selectChild(Action.index).setActions(Action.moves);
    });
};

SpriteCollection.prototype.selectChild = function (index) {
    let indexOfChild = this.children.indexOf(this._sprites[index]);
    return this.children[indexOfChild];
};

SpriteCollection.prototype.isEnabled = function (index) {
    return this.selectChild(index).isEnabled();
};

SpriteCollection.prototype.isDisabled = function (index) {
    return this.selectChild(index).isDisabled();
};

SpriteCollection.prototype.isSelected = function (index) {
    return this.selectChild(index).isSelected();
};

SpriteCollection.prototype.isUnselect = function (index) {
    return this.selectChild(index).isUnselect();
};

SpriteCollection.prototype.isLiked = function (index) {
    return this.selectChild(index).isLiked();
};

SpriteCollection.prototype.isUnlike = function (index) {
    return this.selectChild(index).isUnlike();
};

SpriteCollection.prototype.isClosed = function (index) {
    return this.selectChild(index).isClose();
};

SpriteCollection.prototype.positionHand = function (index) {
    return {
        index,
        moves: [
            {type: 'POSITION_HAND'},
            {type: 'REFRESH'},
            {type: 'OPEN'},
            {type: 'LESS', times: 2}
        ]
    };
};

SpriteCollection.prototype.positionCollection = function (index) {
    return {
        index,
        moves: [
            {type: 'POSITION_COLLECTION', index, length: this.children.length}
        ]
    };
};

SpriteCollection.prototype.moveField = function (index) {
    return {
        index,
        moves: [
            {type: 'MOVE_FIELD', index, frame: 10}
        ]
    };
};

SpriteCollection.prototype.moveAttack = function (index, target) {
    return {
        index,
        moves: [
            {type: 'PLUS', times: 2, frame: 20},
            {type: 'TAKE'},
            {type: 'LESS', times: 2, frame: 10},
            {type: 'UNTAKE'},
            {type: 'MOVE_ATTACK', frame: 3, target}
        ]
    };
};

SpriteCollection.prototype.open = function (index) {
    return {
        index,
        moves: [
            {type: 'REFRESH'},
            {type: 'OPEN', index, frame: 6}
        ]
    };
};

SpriteCollection.prototype.close = function (index) {
    return {
        index,
        moves: [
            {type: 'CLOSE', index, frame: 6}
        ]
    };
};

SpriteCollection.prototype.toTurn = function (index) {
    return {
        index,
        moves: [
            {type: 'CLOSE', frame: 4},
            {type: 'TO_TURN'},
            {type: 'REFRESH'},
            {type: 'OPEN', frame: 4}
        ]
    };
};

SpriteCollection.prototype.flash = function (index) {
    return {
        index,
        moves: [
            {type: 'ANIMATION', index: 121, frame: 6}
        ]
    };
};

SpriteCollection.prototype.enabled = function (index) {
    return {
        index,
        moves: [
            {type: 'ENABLE'},
            {type: 'REFRESH'}
        ]
    };
};

SpriteCollection.prototype.disabled = function (index) {
    return {
        index,
        moves: [
            {type: 'DISABLE'},
            {type: 'REFRESH'}
        ]
    };
};

SpriteCollection.prototype.select = function (index) {
    return {
        index,
        moves: [
            {type: 'SELECT'}
        ]
    };
};

SpriteCollection.prototype.up = function (index) {
    return {
        index,
        moves: [
            {type: 'MOVE_UP', times: 1, frame: 4}
        ]
    };
};

SpriteCollection.prototype.unselect = function (index) {
    return {
        index,
        moves: [
            {type: 'UNSELECT'}
        ]
    };
};

SpriteCollection.prototype.down = function (index) {
    return {
        index,
        moves: [
            {type: 'MOVE_DOWN', times: 1, frame: 4}
        ]
    };
};

SpriteCollection.prototype.like = function (index) {
    return {
        index,
        moves: [
            {type: 'ANIMATION', index: 121, frame: 4},
            {type: 'LIKE'},
            {type: 'REFRESH'}
        ]
    };
};

SpriteCollection.prototype.unlike = function (index) {
    return {
        index,
        moves: [
            {type: 'ANIMATION', index: 121, frame: 4},
            {type: 'UNLIKE'},
            {type: 'REFRESH'}
        ]
    };
};

SpriteCollection.prototype.take = function (index) {
    return {
        index,
        moves: [
            {type: 'UNSELECT'},
            {type: 'UNLIKE'},
            {type: 'TAKE'}
        ]
    };
};

SpriteCollection.prototype.react = function (index) {
    return {
        index,
        moves: [
            {type: 'PLUS', times: 1, frame: 10},
            {type: 'LESS', times: 1, frame: 10}
        ]
    };
};

SpriteCollection.prototype.triggered = function (index) {
    return {
        index,
        moves: [
            {type: 'CLOSE', index, frame: 10},
            {type: 'TRIGGERED'},
            {type: 'REFRESH'},
            {type: 'OPEN', index, frame: 10}
        ]
    };
};

SpriteCollection.prototype.block = function (index) {
    return {
        index,
        moves: [
            {type: 'BLOCK'},
            {type: 'REFRESH'},
        ] 
    };
};

SpriteCollection.prototype.activeEffect = function (index) {
    return {
        index,
        moves: [
            {type: 'PLUS', times: 1, frame: 10},
            {type: 'ANIMATION', index: 121, frame: 20},
            {type: 'LESS', times: 6, frame: 20}
        ]
    };
};

SpriteCollection.prototype.damager = function (index) {
    return {
        index,
        moves: [
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
        ] 
    };
};

SpriteCollection.prototype.toDestroy = function (index) {
    return {
        index,
        moves: [
            {type: 'ANIMATION', index: 123},
            {type: 'MOVE_LEFT', times: 1, frame: 4},
            {type: 'MOVE_RIGHT', times: 2, frame: 4},
            {type: 'MOVE_LEFT', times: 2, frame: 4},
            {type: 'MOVE_RIGHT', times: 2, frame: 4},
            {type: 'MOVE_LEFT', times: 2, frame: 4},
            {type: 'MOVE_RIGHT', times: 1, frame: 4},
            {type: 'CLOSE', frame: 10}
        ]
    };
};

SpriteCollection.prototype.powerUp = function (index) {
    return {
        index,
        moves: [
            {type: 'ANIMATION', index: 124, frame: 20},
        ]
    };
};

SpriteCollection.prototype.powerDown = function (index) {
    return {
        index,
        moves: [
            {type: 'ANIMATION', index: 125, frame: 20},
        ]
    };
};

SpriteCollection.prototype.setAttack = function (index, points) {
    return {
        index,
        moves: [
            {type: 'ATTACK', points}
        ]
    };
};

SpriteCollection.prototype.setHealth = function (index, points) {
    return {
        index,
        moves: [
            {type: 'HEALTH', points}
        ]
    };
};

SpriteCollection.prototype.waitMoment = function (index, wait) {
    return {
        index,
        moves: [
            {type: 'WAIT', frame: wait}
        ] 
    };
};
