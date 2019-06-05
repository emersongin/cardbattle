function WindowTrash() {
    this.initialize.apply(this, arguments);
};

WindowTrash.prototype = Object.create(Window_Base.prototype);
WindowTrash.prototype.constructor = WindowTrash;

WindowTrash.prototype.initialize = function(player) {
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._player = player || false;
    this._background = new Sprite(new Bitmap(104, 107));
    this._frameInterval = 0;
    this._frameScale = 0;
    this._trashPoint = 0;
    this._targetTrashPoint = 0;
    this._targetX = 0;
    this._targetY = 0;
    this.setup();
};

WindowTrash.prototype.PointsInterval = function() {
    return 1;
};

WindowTrash.prototype.pointsDelay = function() {
    return 10;
};

WindowTrash.prototype.standardFontSize = function() {
    return 20;
};

WindowTrash.prototype.setup = function() {
    this.padding = 0;
    this.opacity = 0;
    this.openness = 0;
    this.createBackground();
    this.refresh();
};

WindowTrash.prototype.initialPosition = function() {
    this.moveOut();

    if (this._player) {
        this._targetY = this.height / 2;
        this.move(this._targetX, this._targetY, this.width, this.height);
    }else{
        this._targetY = this.height / 2 - this._background.height;
        this.move(this._targetX, this._targetY, this.width, this.height);   
    }
};

WindowTrash.prototype.moveIn = function() {
    this._targetX = this.width - this._background.width + 10;
};

WindowTrash.prototype.moveOut = function() {
    this._targetX = this.width;
};

WindowTrash.prototype.createBackground = function() {
    if (this._player) {
        this._background.bitmap = ImageManager.loadSystem('BackgroundTrash1');
    }else{
        this._background.bitmap = ImageManager.loadSystem('BackgroundTrash2');
    }
    
    this.addChildToBack(this._background);
};

WindowTrash.prototype.refresh = function() {
    this.contents.clear();
    this.drawPoints();
};

WindowTrash.prototype.drawPoints = function() {
    let heightPosition;

    if (this._player) {
        heightPosition = 10;
    }else{
        heightPosition = 62;
    }

    this.drawText(this._trashPoint.padZero(2), 28, heightPosition);
};

WindowTrash.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateMove();
    this.updatePoints();
    this.updateBackgroundOpacity();
    this.reducerDelay();
};

WindowTrash.prototype.updatePoints = function() {
    if (this.isUpdateTrashPoint() && this.isOpen()) {
        if (!this._frameInterval) {
            this._frameScale = this.setFrameTrashPoints();
            this._frameInterval = this.pointsDelay();
            this.refreshWindowPoints();
            this._frameScale--;
        }
    }
};

WindowTrash.prototype.updateMove = function() {
    if (this.isUpdateMove() && this.isOpen()) {
        if (!this._frameInterval) {
            this._frameScale = 10;
            this._frameInterval = 1;
            this.refreshWindowMove();
            this._frameScale--;
        }
    }
};

WindowTrash.prototype.reducerDelay = function() {
    if (this._frameInterval) {
        this._frameInterval--;
    }
};

WindowTrash.prototype.updateBackgroundOpacity = function() {
    if (this._background && this.isOpen()) {
        this._background.opacity = this.openness;
    }else if (this._background.opacity) {
        this._background.opacity = 0;
    }
};

WindowTrash.prototype.isUpdateTrashPoint = function() {
    return this._trashPoint !== this._targetTrashPoint;
};

WindowTrash.prototype.isUpdateMove = function() {
    return this.isUpdateMoveX() || this.isUpdateMoveY();
};

WindowTrash.prototype.isUpdateMoveX = function() {
    return this.x !== this._targetX;
};

WindowTrash.prototype.isUpdateMoveY = function() {
    return this.y !== this._targetY;
};

WindowTrash.prototype.setFrameTrashPoints = function() {
    return parseInt(Math.abs(this._targetTrashPoint - this._trashPoint) / this.PointsInterval());
};

WindowTrash.prototype.setFrameX = function() {
    return parseInt(Math.abs(this.x - this._targetX) / 10);
};

WindowTrash.prototype.setFrameY = function() {
    return parseInt(Math.abs(this.y - this._targetY) / 10);
};

WindowTrash.prototype.refreshWindowPoints = function() {
    this._trashPoint = this.rateTrashPoints();
    this.refresh();
};

WindowTrash.prototype.refreshWindowMove = function() {
    this.x = this.rateXcoord();
    this.y = this.rateYCoord();
};

WindowTrash.prototype.rateTrashPoints = function() {
	if (this.isUpdateTrashPoint()) {
        return parseInt((this._trashPoint * (this._frameScale - 1) + this._targetTrashPoint) / this._frameScale, 10);
    }
    return this._trashPoint;
};

WindowTrash.prototype.rateXcoord = function() {
	if (this.isUpdateMoveX()) {
        this._frameScale = this.setFrameX();
		return parseInt((this.x * (this._frameScale - 1) + this._targetX) / this._frameScale, 10);
    }
    return this.x;
};

WindowTrash.prototype.rateYCoord = function() {
	if (this.isUpdateMoveY()) {
        this._frameScale = this.setFrameY();
		return parseInt((this.y * (this._frameScale - 1) + this._targetY) / this._frameScale, 10);
    }
    return this.y;
};

WindowTrash.prototype.setPoints = function(points = this._trashPoint) {
    if (points < 0) points = 0;
    if (points > 99) points = 99;
    this._targetTrashPoint = points;
};