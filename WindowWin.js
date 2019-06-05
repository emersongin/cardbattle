function WindowWin() {
    this.initialize.apply(this, arguments);
};

WindowWin.prototype = Object.create(Window_Base.prototype);
WindowWin.prototype.constructor = WindowWin;

WindowWin.prototype.initialize = function(player) {
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._player = player || false;
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

WindowWin.prototype.setup = function() {
    this.padding = 0;
    this.opacity = 0;
    this.openness = 0;
    this.createBackground();
    this.createVictoryIcons();
};

WindowWin.prototype.createBackground = function() {
    this._background.bitmap = ImageManager.loadSystem('BackgroundWin');
    this.addChildToBack(this._background);
};

WindowWin.prototype.createVictoryIcons = function() {
    if (this._player) {
        this._icon = ImageManager.loadSystem('BackgroundWin1');
    } else {
        this._icon = ImageManager.loadSystem('BackgroundWin2');
    }
};

WindowWin.prototype.initialPosition = function() {
    this.moveOut();

    if (this._player) {
        this._targetY = this.height - (64 + this._background.height);
        this.move(this._targetX, this._targetY, this.width, this.height);
    }else{
        this._targetY = 65;
        this.move(this._targetX, this._targetY, this.width, this.height);   
    }
};

WindowWin.prototype.refresh = function() {
    this.contents.clear();
    if (this._winPoints >= 1) {
        this.contents.blt(this._icon, 0, 0, 32, 32, 30, 12);
    }
    if (this._winPoints >= 2) {
        this.contents.blt(this._icon, 0, 0, 32, 32, 82, 12);
    }
}

WindowWin.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateMove();
    this.updateBackgroundOpacity();
    this.updateFirstVictory();
    this.updateSecondVictory();
    this.reducerDelay();
};

WindowWin.prototype.updateMove = function() {
    if (this.isUpdateMove() && this.isOpen()) {
        if (!this._frameInterval) {
            this._frameInterval = 1;
            this.refreshMove();
            this._frameScale--;
        }
    }
};

WindowWin.prototype.updateBackgroundOpacity = function() {
    if (this._background && this.isOpen()) {
        this._background.opacity = this.openness;
    }else if (this._background.opacity) {
        this._background.opacity = 0;
    }
};

WindowWin.prototype.updateFirstVictory = function() {
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

WindowWin.prototype.updateSecondVictory = function() {
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

WindowWin.prototype.reducerDelay = function() {
    if (this._frameInterval) {
        this._frameInterval--;
    }
};

WindowWin.prototype.isFirstVictory = function() {
    return this._firstVictory;
};

WindowWin.prototype.firstVictory = function() {
    this._firstVictory = true;
};

WindowWin.prototype.isSecondVictory = function() {
    return this._secondVictory;
};

WindowWin.prototype.secondVictory = function() {
    this._secondVictory = true;
};

WindowWin.prototype.winner = function() {
    this._winPoints++;
};

WindowWin.prototype.moveIn = function() {
    this._targetX = this.width - this._background.width;
};

WindowWin.prototype.moveOut = function() {
    this._targetX = this.width;
};

WindowWin.prototype.isUpdateMove = function() {
    return this.isUpdateMoveX() || this.isUpdateMoveY();
};

WindowWin.prototype.isUpdateMoveX = function() {
    return this.x !== this._targetX;
};

WindowWin.prototype.isUpdateMoveY = function() {
    return this.y !== this._targetY;
};

WindowWin.prototype.refreshMove = function() {
    this.x = this.rateX();
    this.y = this.rateY();
};

WindowWin.prototype.setFrameX = function() {
    return parseInt(Math.abs(this.x - this._targetX) / 10);
};

WindowWin.prototype.setFrameY = function() {
    return parseInt(Math.abs(this.y - this._targetY) / 10);
};

WindowWin.prototype.rateX = function() {
	if (this.isUpdateMoveX()) {
        this._frameScale = this.setFrameX();
		return parseInt((this.x * (this._frameScale - 1) + this._targetX) / this._frameScale, 10);
    }
    return this.x;
};

WindowWin.prototype.rateY = function() {
	if (this.isUpdateMoveY()) {
        this._frameScale = this.setFrameY();
		return parseInt((this.y * (this._frameScale - 1) + this._targetY) / this._frameScale, 10);
    }
    return this.y;
};
