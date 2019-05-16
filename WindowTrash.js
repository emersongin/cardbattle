function WindowTrash(){
    this.initialize.apply(this, arguments);
}

WindowTrash.prototype = Object.create(Window_Base.prototype);
WindowTrash.prototype.constructor = WindowTrash;

WindowTrash.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth / 5, Graphics.boxHeight / 4);
    this._side = '';
    this._color = 0;
    this._trashPoint = 0;

    this._frameInterval = 0;
    this._frameScale = 0;
this.contents.fontSize = 20;
    this.targetTrashPoint = 10;
    this.opacity = 0;
    this.openness = 255;
};

WindowTrash.prototype.PointsInterval = function(){
    return 1;
};

WindowTrash.prototype.pointsDelay = function(){
    return 1;
};

WindowTrash.prototype.update = function(){
    Window_Base.prototype.update.call(this);
    this.checkUpdate();
    this.reduceDelay();
};

WindowTrash.prototype.reduceDelay = function(){
    if(this._frameInterval > 0){
        this._frameInterval--;
    }
};

WindowTrash.prototype.checkUpdate = function(){
    if(this._trashPoint != this.targetTrashPoint){
        if(this._frameInterval <= 0){
            this.setFrameScale();
            this.updateWindowTrash();
            this._frameInterval = this.pointsDelay();
            this._frameScale--;
        }
    }
};

WindowTrash.prototype.setFrameScale = function(){
    let scaleDistance = Math.abs(this.targetTrashPoint - this._trashPoint);
    this._frameScale = parseInt(scaleDistance / this.PointsInterval());
};

WindowTrash.prototype.updateWindowTrash = function(){
    this.updatePoints();
    this.refreshWindow();
};

WindowTrash.prototype.updatePoints = function(){
    let frameScale = this._frameScale;
    let trashPoint = this._trashPoint;
    let targetTrashPoint = this.targetTrashPoint;

	if(trashPoint != targetTrashPoint){
        let scaleMult = trashPoint * (frameScale - 1);
        let ScaleSome = scaleMult + targetTrashPoint;
        let scaleDivide = ScaleSome / frameScale;

        this._trashPoint = parseInt(scaleDivide);
    }
};

WindowTrash.prototype.refreshWindow = function() {
    this.contents.clear();
    this.drawBackground();
    this.drawIcons();
    this.drawPoints();
};

WindowTrash.prototype.drawBackground = function() {
    let background = ImageManager.loadSystem('backgrounds1', this._color);
    this.contents.blt(background, 0, 0, 104, 104, 0, 0);
};

WindowTrash.prototype.drawIcons = function() {
    this.drawIcon(29, 16, 14);
    this.drawIcon(28, 16, 60);
};

WindowTrash.prototype.drawPoints = function() {
    this.drawText(this._trashPoint.padZero(2), 22, 12);
};

WindowTrash.prototype.setPoints = function(points){
    this.targetTrashPoint = points;
};

WindowTrash.prototype.changePosition = function(x, y) {
    this.move(x, y, this.width, this.height);
};