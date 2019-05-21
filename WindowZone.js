function WindowZone() {
    this.initialize.apply(this, arguments);
}

WindowZone.prototype = Object.create(Window_Base.prototype);
WindowZone.prototype.constructor = WindowZone;

WindowZone.prototype.initialize = function(player) {
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._player = player || false;
    this._background = new Sprite(new Bitmap(816, 184));
    this._spriteAnimation = new Sprite_Base();
    this._delay = 0;
    this._frame = 0;
    this._targetX = 0;
    this._targetY = 0;
    this._display = '';
    this._attackPoint = 0;
    this._healthPoint = 0;
    this._whitePoint = 0;
    this._bluePoint = 0;
    this._greenPoint = 0;
    this._redPoint = 0;
    this._blackPoint = 0;
    this._packPoint = 0;
    this._handPoint = 0;
    this._winPoint = 0;
    this._targetAttackPoint = 0;
    this._targetHealthPoint = 0;
    this._targetWhitePoint = 0;
    this._targetBluePoint = 0;
    this._targetGreenPoint = 0;
    this._targetRedPoint = 0;
    this._targetBlackPoint = 0;
    this._targetPackPoint = 0;
    this._targetHandPoint = 0;
    this._targetWinPoint = 0;
    this.setup();
};

WindowZone.prototype.intervalPoint = function() {
    return 1;
};

WindowZone.prototype.delayPoint = function() {
    return 16;
};

WindowZone.prototype.standardFontSize = function() {
    return 20;
};

WindowZone.prototype.setup = function() {
    this.padding = 0;
    this.opacity = 0;
    this.openness = 255;
    this.initialPosition();
    this.createBackground();
    this.createSpriteAnimation();
    this.refresh();
};

WindowZone.prototype.initialPosition = function() {
    this.moveOut();

    if(this._player) {
        this.move(0, this._targetY, this.width, this.height);
    }else{
        this.move(0, this._targetY, this.width, this.height);
    }
};

WindowZone.prototype.moveIn = function() {
    if(this._player) {
        this._targetY = this.height - this._background.height;
    }else{
        this._targetY = 0;
    }
};

WindowZone.prototype.moveOut = function() {
    if(this._player) {
        this._targetY = this.height;
    }else{
        this._targetY = 0 - this._background.height;
    }
};

WindowZone.prototype.createBackground = function() {
    if(this._player) {
        this._background.bitmap = ImageManager.loadSystem('BackgroundZone1');
    }else{
        this._background.bitmap = ImageManager.loadSystem('BackgroundZone2');
    }
    this.addChildToBack(this._background);
};

WindowZone.prototype.createSpriteAnimation = function() {
    this.addChild(this._spriteAnimation);
};

WindowZone.prototype.refresh = function() {
    this.contents.clear();
    this.drawPoints();
    this.drawWins();
};

WindowZone.prototype.drawPoints = function() {
    let heightPositionItens,
        heightPositionOfficer,
        paddingItens = 80;

    if(this._player) {
        heightPositionItens = 148;
        heightPositionOfficer = 120;
    }else{
        heightPositionItens = 0;
        heightPositionOfficer = 36;
    }

    this.drawTextEx('AP ' + this._attackPoint, paddingItens + 40, heightPositionOfficer);
    this.drawTextEx('HP ' + this._healthPoint, paddingItens * 2 + 60, heightPositionOfficer);

    this.drawTextEx('\\I[160] ' + this._whitePoint.padZero(2), paddingItens, heightPositionItens);
    this.drawTextEx('\\I[165] ' + this._bluePoint.padZero(2), paddingItens * 2, heightPositionItens);
    this.drawTextEx('\\I[164] ' + this._greenPoint.padZero(2), paddingItens * 3, heightPositionItens);
    this.drawTextEx('\\I[162] ' + this._redPoint.padZero(2), paddingItens * 4, heightPositionItens);
    this.drawTextEx('\\I[161] ' + this._blackPoint.padZero(2), paddingItens * 5, heightPositionItens);
    this.drawTextEx('\\I[187] ' + this._packPoint.padZero(2), paddingItens * 6, heightPositionItens);
    this.drawTextEx('\\I[188] ' + this._handPoint.padZero(2), paddingItens * 7, heightPositionItens);
};

WindowZone.prototype.drawWins = function() {
    let heightPosition;

    if(this._player) {
        heightPosition = 80;
    }else{
        heightPosition = 60;
    }

    if(this._winPoint >= 1) {
        this.drawTextEx('\\I[310]', 690, heightPosition);
    }
    if(this._winPoint >= 2) {
        this.drawTextEx('\\I[310]', 740, heightPosition);
    }
}

WindowZone.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateMove();
    this.updateZonePoints();
    this.updateBattlePoints();
    this.updateWinPoints();
    this.updateBackgroundOpacity();
    this.reducerDelay();
};

WindowZone.prototype.updateZonePoints = function() {
    if(this.isUpdateZonePoint() && this.isOpen()) {
        if(!this._delay) {
            this._delay = this.delayPoint();
            this.refreshWindowPoints();
            this._frame--;
        }
    }
};

WindowZone.prototype.updateBattlePoints = function() {
    if(this.isUpdateBattlePoints() && this.isOpen()) {
        if(!this._delay) {
            this._delay = 1;
            this.refreshWindowBattlePoints();
            this._frame--;
        }
    }
};

WindowZone.prototype.updateWinPoints = function() {
    if(this.isUpdateWinPoint() && this.isOpen()) {
        if(!this._delay) {
            this._delay = 1;
            this.refreshWindowWinPoints();
            this._frame--;
        }
    }
};

WindowZone.prototype.updateMove = function() {
    if(this.isUpdateMove() && this.isOpen()) {
        if(!this._delay) {
            this._frame = 10;
            this._delay = 1;
            this.refreshWindowMove();
            this._frame--;
        }
    }
};

WindowZone.prototype.reducerDelay = function() {
    if(this._delay) {
        this._delay--;
    }
};

WindowZone.prototype.updateBackgroundOpacity = function() {
    if(this._background && this.isOpen()) {
        this._background.opacity = this.openness;
    }else{
        if(this._background.opacity) {
            this._background.opacity = 0;
        }
    }
};

WindowZone.prototype.isUpdateZonePoint = function() {
    return this.isUpdateWhitePoint() || this.isUpdateBluePoint() || 
    this.isUpdateGreenPoint() || this.isUpdateRedPoint() || 
    this.isUpdateBlackPoint() || this.isUpdatePackPoint() || 
    this.isUpdateHandPoint();
};

WindowZone.prototype.isUpdateWhitePoint = function() {
    return this._whitePoint !== this._targetWhitePoint;
};

WindowZone.prototype.isUpdateBluePoint = function() {
    return this._bluePoint !== this._targetBluePoint;
};

WindowZone.prototype.isUpdateGreenPoint = function() {
    return this._greenPoint !== this._targetGreenPoint;
};

WindowZone.prototype.isUpdateRedPoint = function() {
    return this._redPoint !== this._targetRedPoint;
};

WindowZone.prototype.isUpdateBlackPoint = function() {
    return this._blackPoint !== this._targetBlackPoint;
};

WindowZone.prototype.isUpdatePackPoint = function() {
    return this._packPoint !== this._targetPackPoint;
};

WindowZone.prototype.isUpdateHandPoint = function() {
    return this._handPoint !== this._targetHandPoint;
};

WindowZone.prototype.isUpdateBattlePoints = function() {
    return this.isUpdateAttackPoint() || this.isUpdateHealthPoint();
};

WindowZone.prototype.isUpdateAttackPoint = function() {
    return this._attackPoint !== this._targetAttackPoint;
};

WindowZone.prototype.isUpdateHealthPoint = function() {
    return this._healthPoint !== this._targetHealthPoint;
};

WindowZone.prototype.isUpdateWinPoint = function() {
    return this._winPoint !== this._targetWinPoint;
};

WindowZone.prototype.isUpdateMove = function() {
    return this.isUpdateMoveX() || this.isUpdateMoveY();
};

WindowZone.prototype.isUpdateMoveX = function() {
    return this.x !== this._targetX;
};

WindowZone.prototype.isUpdateMoveY = function() {
    return this.y !== this._targetY;
};

WindowZone.prototype.setFrameScaleWhite = function() {
    return parseInt(Math.abs(this._whitePoint - this._targetWhitePoint) / this.intervalPoint());
};

WindowZone.prototype.setFrameScaleBlue = function() {
    return parseInt(Math.abs(this._bluePoint - this._targetBlackPoint) / this.intervalPoint());
};

WindowZone.prototype.setFrameScaleGreen = function() {
    return parseInt(Math.abs(this._greenPoint - this._targetGreenPoint) / this.intervalPoint());
};

WindowZone.prototype.setFrameScaleRed = function() {
    return parseInt(Math.abs(this._redPoint - this._targetRedPoint) / this.intervalPoint());
};

WindowZone.prototype.setFrameScaleBlack = function() {
    return parseInt(Math.abs(this._blackPoint - this._targetBlackPoint) / this.intervalPoint());
};

WindowZone.prototype.setFrameScalePack = function() {
    return parseInt(Math.abs(this._packPoint - this._targetPackPoint) / this.intervalPoint());
};

WindowZone.prototype.setFrameScaleHand = function() {
    return parseInt(Math.abs(this._handPoint - this._targetHandPoint) / this.intervalPoint());
};

WindowZone.prototype.setFrameScaleAttack = function() {
    let absolute = Math.abs(this._attackPoint - this._targetAttackPoint);
    let intervalPoint = this.setIntervalPoint(absolute);

    return parseInt(absolute / intervalPoint);
};

WindowZone.prototype.setFrameScaleHealth = function() {
    let absolute = Math.abs(this._healthPoint - this._targetHealthPoint);
    let intervalPoint = this.setIntervalPoint(absolute);

    return parseInt(absolute / intervalPoint);
};

WindowZone.prototype.setFrameScaleWin = function() {
    return parseInt(Math.abs(this._winPoint - this._targetWinPoint) / this.intervalPoint());
};

WindowZone.prototype.setIntervalPoint = function(Absolute) {
    if(Absolute > 100){
        return 16;
    }else if(Absolute > 50){
        return 8;
    }else{
        return 1;
    }
};

WindowZone.prototype.refreshWindowPoints = function() {
    this._whitePoint = this.rateWhitePoints();
    this._bluePoint = this.rateBluePoints();
    this._greenPoint = this.rateGreenPoints();
    this._redPoint = this.rateRedPoints();
    this._blackPoint = this.rateBlackPoints();
    this._packPoint = this.ratePackPoints();
    this._handPoint = this.rateHandPoints();
    this.refresh();
};

WindowZone.prototype.refreshWindowBattlePoints = function() {
    this._attackPoint = this.rateAttackPoints();
    this._healthPoint = this.rateHealthPoints();
    this.refresh();
};

WindowZone.prototype.refreshWindowWinPoints = function() {
    this._winPoint = this.rateWinPoints();
    this.refresh();
};

WindowZone.prototype.refreshWindowMove = function() {
    this.x = this.rateXcoord();
    this.y = this.rateYCoord();
};

WindowZone.prototype.rateWhitePoints = function() {
	if(this.isUpdateWhitePoint()) {
        this._frame = this.setFrameScaleWhite();
        return parseInt((this._whitePoint * (this._frame - 1) + this._targetWhitePoint) / this._frame, 10);
    }
    return this._whitePoint;
};

WindowZone.prototype.rateBluePoints = function() {
	if(this.isUpdateBluePoint()) {
        this._frame = this.setFrameScaleBlue();
        return parseInt((this._bluePoint * (this._frame - 1) + this._targetBluePoint) / this._frame, 10);
    }
    return this._bluePoint;
};

WindowZone.prototype.rateGreenPoints = function() {
	if(this.isUpdateGreenPoint()) {
        this._frame = this.setFrameScaleGreen();
        return parseInt((this._greenPoint * (this._frame - 1) + this._targetGreenPoint) / this._frame, 10);
    }
    return this._greenPoint;
};

WindowZone.prototype.rateRedPoints = function() {
	if(this.isUpdateRedPoint()) {
        this._frame = this.setFrameScaleRed();
        return parseInt((this._redPoint * (this._frame - 1) + this._targetRedPoint) / this._frame, 10);
    }
    return this._redPoint;
};

WindowZone.prototype.rateBlackPoints = function() {
	if(this.isUpdateBlackPoint()) {
        this._frame = this.setFrameScaleBlack();
        return parseInt((this._blackPoint * (this._frame - 1) + this._targetBlackPoint) / this._frame, 10);
    }
    return this._blackPoint;
};

WindowZone.prototype.ratePackPoints = function() {
	if(this.isUpdatePackPoint()) {
        this._frame = this.setFrameScalePack();
        return parseInt((this._packPoint * (this._frame - 1) + this._targetPackPoint) / this._frame, 10);
    }
    return this._packPoint;
};

WindowZone.prototype.rateHandPoints = function() {
	if(this.isUpdateHandPoint()) {
        this._frame = this.setFrameScaleHand();
        return parseInt((this._handPoint * (this._frame - 1) + this._targetHandPoint) / this._frame, 10);
    }
    return this._handPoint;
};

WindowZone.prototype.rateAttackPoints = function() {
	if(this.isUpdateAttackPoint()) {
        this._frame = this.setFrameScaleAttack();
        return parseInt((this._attackPoint * (this._frame - 1) + this._targetAttackPoint) / this._frame, 10);
    }
    return this._attackPoint;
};

WindowZone.prototype.rateHealthPoints = function() {
	if(this.isUpdateHealthPoint()) {
        this._frame = this.setFrameScaleHealth();
        return parseInt((this._healthPoint * (this._frame - 1) + this._targetHealthPoint) / this._frame, 10);
    }
    return this._healthPoint;
};

WindowZone.prototype.rateWinPoints = function() {
	if(this.isUpdateWinPoint()) {
        this._frame = this.setFrameScaleWin();
        return parseInt((this._winPoint * (this._frame - 1) + this._targetWinPoint) / this._frame, 10);
    }
    return this._winPoint;
};

WindowZone.prototype.rateXcoord = function() {
	if(this.isUpdateMoveX()) {
		return parseInt((this.x * (this._frame - 1) + this._targetX) / this._frame, 10);
    }
    return this.x;
};

WindowZone.prototype.rateYCoord = function() {
	if(this.isUpdateMoveY()) {
		return parseInt((this.y * (this._frame - 1) + this._targetY) / this._frame, 10);
    }
    return this.y;
};

WindowZone.prototype.setWhitePoints = function(points = this._whitePoint) {
    if(points < 0) points = 0;
    if(points > 99) points = 99;
    this._targetWhitePoint = points;
};

WindowZone.prototype.setBluePoints = function(points = this._bluePoint) {
    if(points < 0) points = 0;
    if(points > 99) points = 99;
    this._targetBluePoint = points;
};

WindowZone.prototype.setGreenPoints = function(points = this._greenPoint) {
    if(points < 0) points = 0;
    if(points > 99) points = 99;
    this._targetGreenPoint = points;
};

WindowZone.prototype.setRedPoints = function(points = this._redPoint) {
    if(points < 0) points = 0;
    if(points > 99) points = 99;
    this._targetRedPoint = points;
};

WindowZone.prototype.setBlackPoints = function(points = this._blackPoint) {
    if(points < 0) points = 0;
    if(points > 99) points = 99;
    this._targetBlackPoint = points;
};

WindowZone.prototype.setPackPoints = function(points = this._packPoint) {
    if(points < 0) points = 0;
    if(points > 99) points = 99;
    this._targetPackPoint = points;
};

WindowZone.prototype.setHandPoints = function(points = this._handPoint) {
    if(points < 0) points = 0;
    if(points > 99) points = 99;
    this._targetHandPoint = points;
};

WindowZone.prototype.setAttackPoints = function(points = this._attackPoint) {
    if(points < 0) points = 0;
    if(points > 999) points = 999;
    this._targetAttackPoint = points;
};

WindowZone.prototype.setHealthPoints = function(points = this._healthPoint) {
    if(points < 0) points = 0;
    if(points > 999) points = 999;
    this._targetHealthPoint = points;
};

WindowZone.prototype.setWinPoints = function(points = this._winPoint) {
    if(this._targetWinPoint > 1){
        this._targetWinPoint = 2;
    }else{
        this._targetWinPoint = points;
    }
};

WindowZone.prototype.positionAnimation = function(position) {
    switch (position.target) {
        case 'Colors':
                this._spriteAnimation.x = 16 + (80 * position.index); 
            if(this._player) {
                this._spriteAnimation.y = 180;
            }else{
                this._spriteAnimation.y = 30;
            }
            break;
        case 'Wins':
                this._spriteAnimation.x = 656 + (50 * position.index);
            if(this._player) {
                this._spriteAnimation.y = 110;
            }else{
                this._spriteAnimation.y = 90;
            }
            break;
        default:
            throw new Error('The Zone does not have this position');
    }
}

WindowZone.prototype.showWinAnimation = function() {
    this._spriteAnimation.startAnimation($dataAnimations[101], true, 1);
}
