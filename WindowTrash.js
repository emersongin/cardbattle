function WindowTrash(){
    this.initialize.apply(this, arguments);
}

WindowTrash.prototype = Object.create(Window_Base.prototype);
WindowTrash.prototype.constructor = WindowTrash;

WindowTrash.prototype.initialize = function(player){
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth / 5, Graphics.boxHeight / 4);
    this._player = player || false;
    this._frameInterval = 0;
    this._frameScale = 0;
    this._trashPoint = 0;
    this.targetTrashPoint = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.setup();
};

WindowTrash.prototype.PointsInterval = function(){
    return 1;
};

WindowTrash.prototype.pointsDelay = function(){
    return 10;
};

WindowTrash.prototype.setup = function(){
    this.contents.fontSize = 20;
    this.opacity = 255;
    this.openness = 0;
    this.createBackground();
    this.refresh();
    this.deactivate();
};

WindowTrash.prototype.createBackground = function() {
    this.background = new Sprite();
    this.background.opacity = 0;
    this.background.move(18, 18);

    if(this._player){
        this.background.bitmap = ImageManager.loadSystem('BackgroundTrash1');
    }else{
        this.background.bitmap = ImageManager.loadSystem('BackgroundTrash2');
    }

    this.addChildToBack(this.background);
};

WindowTrash.prototype.refresh = function() {
    this.contents.clear();
    this.drawPoints();
};

WindowTrash.prototype.drawPoints = function() {
    let heightPosition;
    let widthPosition = 29;

    if(this._player){
        heightPosition = 10;
    }else{
        heightPosition = 62;
    }

    this.drawText(this._trashPoint.padZero(2), widthPosition, heightPosition);
};

WindowTrash.prototype.update = function(){
    Window_Base.prototype.update.call(this);
    this.checkUpdatePoints();
    this.checkUpdateMove();
    this.reduceDelay();
    this.updateBackgroundOpacity();
};

WindowTrash.prototype.checkUpdatePoints = function(){
    if(this._trashPoint != this.targetTrashPoint){
        if(this._frameInterval <= 0){
            this._frameScale = this.setFrameScale();
            this._frameInterval = this.pointsDelay();
            this.updateWindowTrash();
            this._frameScale--;
        }
    }
};

WindowTrash.prototype.checkUpdateMove = function(){
    if(this.x != this.targetX && this.y != this.targetY){
        if(this._frameInterval <= 0){
            this._frameScale = 10;
            this._frameInterval = this.pointsDelay();
            this.updateWindowMove();
            this._frameScale--;
        }
    }
};

WindowTrash.prototype.reduceDelay = function(){
    if(this._frameInterval > 0){
        this._frameInterval--;
    }
};

WindowTrash.prototype.updateBackgroundOpacity = function() {
    if(this.background && !this.isOpen()){
        this.background.opacity = 0;
    }else{
        this.background.opacity = this.openness;
    }
};

WindowTrash.prototype.setFrameScale = function(){
    return parseInt(Math.abs(this.targetTrashPoint - this._trashPoint) / this.PointsInterval());
};

WindowTrash.prototype.updateWindowTrash = function(){
    this._trashPoint = this.updatePoints() || this._trashPoint;
    this.refresh();
};

WindowTrash.prototype.updateWindowMove = function(){
    this.x = this.updateXCoord() || this.x;
    this.y = this.updateYCoord() || this.y;
};

WindowTrash.prototype.updatePoints = function(){
	if(this._trashPoint != this.targetTrashPoint){
        return parseInt((this._trashPoint * (this._frameScale - 1) + this.targetTrashPoint) / this._frameScale);
    }
};

WindowTrash.prototype.updateXCoord = function(){
	if(this.x != this.targetX){
		return (this.x * (this._frameScale - 1) + this.targetX) / this._frameScale;
	}
};

WindowTrash.prototype.updateYCoord = function(){
	if(this.y != this.targetY){
		return (this.y * (this._frameScale - 1) + this.targetY) / this._frameScale;
	}
};

WindowTrash.prototype.setPoints = function(points = this._trashPoint){
    if(points < 0){
        points = 0;
    }
    if(points > 99){
        points = 99;
    }
    this.targetTrashPoint = points;
};

WindowTrash.prototype.changePosition = function(x, y) {
    this.move(x, y, this.width, this.height);
};