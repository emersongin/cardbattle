function WindowScore() {
    this.initialize.apply(this, arguments);
};

WindowScore.prototype = Object.create(Window_Base.prototype);
WindowScore.prototype.constructor = WindowScore;

WindowScore.prototype.initialize = function(Setup) {
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._player = Setup.player;
    this._background = new Sprite(new Bitmap(144, 56));
    this._winPoints = 0;
    this._firstVictory = false;
    this._secondVictory = false;
    this._firstVictoryDelay = 0;
    this._secondVictoryDelay = 0;
    this._frameInterval = 0;
    this._frameScale = 0;
    this._targetX = 0;
    this._targetY = 0;
    this.setup();
};

WindowScore.prototype.isPlayer = function() {
    return this._player;
};

WindowScore.prototype.setup = function() {
    this.padding = 0;
    this.opacity = 0;
    this.openness = 0;
    this.createBackground();
    this.createVictoryIcons();
    this.initialPosition();
    this.open();
};

WindowScore.prototype.createBackground = function() {
    this._background.bitmap = ImageManager.loadSystem('BackgroundWin');
    this.addChildToBack(this._background);
};

WindowScore.prototype.createVictoryIcons = function() {
    if (this._player) {
        this._icon = ImageManager.loadSystem('BackgroundWin1');
    } else {
        this._icon = ImageManager.loadSystem('BackgroundWin2');
    }
};

WindowScore.prototype.initialPosition = function() {
    if (this.isPlayer()) {
        this._targetY = this.height - (64 + this._background.height);
    }else{
        this._targetY = 65;
    }
    this._targetX = this.width;
    this.move(this._targetX, this._targetY, this.width, this.height);
};

WindowScore.prototype.moveIn = function() {
    this._targetX = this.width - this._background.width;
};

WindowScore.prototype.moveOut = function() {
    this._targetX = this.width;
};

WindowScore.prototype.refresh = function() {
    this.contents.clear();
    if (this._winPoints >= 1) {
        this.contents.blt(this._icon, 0, 0, 32, 32, 30, 12);
    }
    if (this._winPoints >= 2) {
        this.contents.blt(this._icon, 0, 0, 32, 32, 82, 12);
    }
}

WindowScore.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateMove();
    this.updateBackgroundOpacity();
    this.updateFirstVictory();
    this.updateSecondVictory();
    this.reducerDelay();
};

WindowScore.prototype.updateMove = function() {
    if (this.isUpdateMove() && this.isOpen()) {
        if (!this._frameInterval) {
            this._frameInterval = 1;
            this.refreshMove();
            this._frameScale--;
        }
    }
};

WindowScore.prototype.updateBackgroundOpacity = function() {
    if (this._background && this.isOpen()) {
        this._background.opacity = this.openness;
    }else if (this._background.opacity) {
        this._background.opacity = 0;
    }
};

WindowScore.prototype.updateFirstVictory = function() {
    if (this.isFirstVictory() && this.isOpen()) {
        this._firstVictoryDelay++
        if (this._firstVictoryDelay === 6) {
            this.refresh();
            this.contents.blt(this._icon, 0, 0, 32, 32, 30, 12);
        }
        if (this._firstVictoryDelay > 10) {
            this.refresh();
            this._firstVictoryDelay = 0;
        }
    }
};

WindowScore.prototype.updateSecondVictory = function() {
    if (this.isSecondVictory() && this.isOpen()) {
        this._secondVictoryDelay++
        if (this._secondVictoryDelay === 6) {
            this.refresh();
            this.contents.blt(this._icon, 0, 0, 32, 32, 82, 12);
        }
        if (this._secondVictoryDelay > 10) {
            this.refresh();
            this._secondVictoryDelay = 0;
        }
    }
};

WindowScore.prototype.reducerDelay = function() {
    if (this._frameInterval) {
        this._frameInterval--;
    }
};

WindowScore.prototype.isFirstVictory = function() {
    return this._firstVictory;
};

WindowScore.prototype.firstVictory = function() {
    this._firstVictory = true;
};

WindowScore.prototype.isSecondVictory = function() {
    return this._secondVictory;
};

WindowScore.prototype.secondVictory = function() {
    this._secondVictory = true;
};

WindowScore.prototype.winner = function() {
    this._winPoints++;
};

WindowScore.prototype.isUpdateMove = function() {
    return this.isUpdateMoveX() || this.isUpdateMoveY();
};

WindowScore.prototype.isUpdateMoveX = function() {
    return this.x !== this._targetX;
};

WindowScore.prototype.isUpdateMoveY = function() {
    return this.y !== this._targetY;
};

WindowScore.prototype.refreshMove = function() {
    this.x = this.rateX();
    this.y = this.rateY();
};

WindowScore.prototype.setFrameX = function() {
    return parseInt(Math.abs(this.x - this._targetX) / 10);
};

WindowScore.prototype.setFrameY = function() {
    return parseInt(Math.abs(this.y - this._targetY) / 10);
};

WindowScore.prototype.rateX = function() {
	if (this.isUpdateMoveX()) {
        this._frameScale = this.setFrameX();
		return parseInt((this.x * (this._frameScale - 1) + this._targetX) / this._frameScale, 10);
    }
    return this.x;
};

WindowScore.prototype.rateY = function() {
	if (this.isUpdateMoveY()) {
        this._frameScale = this.setFrameY();
		return parseInt((this.y * (this._frameScale - 1) + this._targetY) / this._frameScale, 10);
    }
    return this.y;
};
