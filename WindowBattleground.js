function WindowBattleground() {
    this.initialize.apply(this, arguments);
}

WindowBattleground.prototype = Object.create(Window_Base.prototype);
WindowBattleground.prototype.constructor = WindowBattleground;

WindowBattleground.prototype.initialize = function(Setup) {
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._player = Setup.player;
    this._background = new Sprite(new Bitmap(816, 184));
    this._spriteAnimation = new Sprite_Base();
    this._delay = 0;
    this._frame = 0;
    this._targetX = 0;
    this._targetY = 0;
    this._display = '';
    this._attackPoints = 0;
    this._healthPoints = 0;
    this._whitePoints = 0;
    this._bluePoints = 0;
    this._greenPoints = 0;
    this._redPoints = 0;
    this._blackPoints = 0;
    this._packPoints = 0;
    this._handPoints = 0;
    this._targetAttackPoints = 0;
    this._targetHealthPoints = 0;
    this._targetWhitePoints = 0;
    this._targetBluePoints = 0;
    this._targetGreenPoints = 0;
    this._targetRedPoints = 0;
    this._targetBlackPoints = 0;
    this._targetPackPoints = 0;
    this._targetHandPoints = 0;
    this.setup();
};

WindowBattleground.prototype.isPlayer = function() {
    return this._player;
};

WindowBattleground.prototype.intervalPoints = function() {
    return 1;
};

WindowBattleground.prototype.delayPoints = function() {
    return 16;
};

WindowBattleground.prototype.standardFontSize = function() {
    return 20;
};

WindowBattleground.prototype.setup = function() {
    this.padding = 0;
    this.opacity = 0;
    this.openness = 0;
    this.createBackground();
    this.createSpriteAnimation();
    this.refresh();
    this.initialPosition();
    this.open();
};

WindowBattleground.prototype.initialPosition = function() {
    if (this.isPlayer()) {
        this._targetY = 624;
    }else{
        this._targetY = -184;
    }
    this._targetX = 0;
    this.move(this._targetX, this._targetY, this.width, this.height);
};

WindowBattleground.prototype.moveIn = function() {
    if (this._player) {
        this._targetY = 440;
    }else{
        this._targetY = 0;
    }
};

WindowBattleground.prototype.moveOut = function() {
    if (this._player) {
        this._targetY = 624;
    }else{
        this._targetY = -184;
    }
};

WindowBattleground.prototype.createBackground = function() {
    if (this._player) {
        this._background.bitmap = ImageManager.loadSystem('BackgroundZone1');
    }else{
        this._background.bitmap = ImageManager.loadSystem('BackgroundZone2');
    }
    this.addChildToBack(this._background);
};

WindowBattleground.prototype.createSpriteAnimation = function() {
    this.addChild(this._spriteAnimation);
};

WindowBattleground.prototype.refresh = function() {
    this.contents.clear();
    this.drawPoints();
};

WindowBattleground.prototype.drawPoints = function() {
    let heightPositionItens,
        heightPositionOfficer,
        paddingItens = 80;

    if (this._player) {
        heightPositionItens = 148;
        heightPositionOfficer = 120;
    }else{
        heightPositionItens = 0;
        heightPositionOfficer = 36;
    }

    this.drawTextEx('AP ' + this._attackPoints, paddingItens + 40, heightPositionOfficer);
    this.drawTextEx('HP ' + this._healthPoints, paddingItens * 2 + 60, heightPositionOfficer);

    this.drawTextEx('\\I[160] ' + this._whitePoints.padZero(2), paddingItens, heightPositionItens);
    this.drawTextEx('\\I[165] ' + this._bluePoints.padZero(2), paddingItens * 2, heightPositionItens);
    this.drawTextEx('\\I[164] ' + this._greenPoints.padZero(2), paddingItens * 3, heightPositionItens);
    this.drawTextEx('\\I[162] ' + this._redPoints.padZero(2), paddingItens * 4, heightPositionItens);
    this.drawTextEx('\\I[161] ' + this._blackPoints.padZero(2), paddingItens * 5, heightPositionItens);
    this.drawTextEx('\\I[187] ' + this._packPoints.padZero(2), paddingItens * 6, heightPositionItens);
    this.drawTextEx('\\I[188] ' + this._handPoints.padZero(2), paddingItens * 7, heightPositionItens);
};

WindowBattleground.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateMove();
    this.updatePoints();
    this.updateBattlePoints();
    this.updateBackgroundOpacity();
    this.reducerDelay();
};

WindowBattleground.prototype.updatePoints = function() {
    if (this.isUpdateZonePoints() && this.isOpen()) {
        if (!this._delay) {
            this._delay = this.delayPoints();
            this.refreshPoints();
            this._frame--;
        }
    }
};

WindowBattleground.prototype.updateBattlePoints = function() {
    if (this.isUpdateBattlePoints() && this.isOpen()) {
        if (!this._delay) {
            this._delay = 1;
            this.refreshBattlePoints();
            this._frame--;
        }
    }
};

WindowBattleground.prototype.updateMove = function() {
    if (this.isUpdateMove() && this.isOpen()) {
        if (!this._delay) {
            this._delay = 1;
            this.refreshMove();
            this._frame--;
        }
    }
};

WindowBattleground.prototype.reducerDelay = function() {
    if (this._delay) {
        this._delay--;
    }
};

WindowBattleground.prototype.updateBackgroundOpacity = function() {
    if (this._background && this.isOpen()) {
        this._background.opacity = this.openness;
    }else{
        if (this._background.opacity) {
            this._background.opacity = 0;
        }
    }
};

WindowBattleground.prototype.isUpdateZonePoints = function() {
    return this.iisUpdateWhitePoints() || this.isUpdateBluePoints() || 
    this.isUpdateGreenPoints() || this.isUpdateRedPoints() || 
    this.isUpdateBlackPoints() || this.isUpdatePackPoints() || 
    this.isUpdateHandPoints();
};

WindowBattleground.prototype.iisUpdateWhitePoints = function() {
    return this._whitePoints !== this._targetWhitePoints;
};

WindowBattleground.prototype.isUpdateBluePoints = function() {
    return this._bluePoints !== this._targetBluePoints;
};

WindowBattleground.prototype.isUpdateGreenPoints = function() {
    return this._greenPoints !== this._targetGreenPoints;
};

WindowBattleground.prototype.isUpdateRedPoints = function() {
    return this._redPoints !== this._targetRedPoints;
};

WindowBattleground.prototype.isUpdateBlackPoints = function() {
    return this._blackPoints !== this._targetBlackPoints;
};

WindowBattleground.prototype.isUpdatePackPoints = function() {
    return this._packPoints !== this._targetPackPoints;
};

WindowBattleground.prototype.isUpdateHandPoints = function() {
    return this._handPoints !== this._targetHandPoints;
};

WindowBattleground.prototype.isUpdateBattlePoints = function() {
    return this.isUpdateAttackPoints() || this.isUpdateHealthPoints();
};

WindowBattleground.prototype.isUpdateAttackPoints = function() {
    return this._attackPoints !== this._targetAttackPoints;
};

WindowBattleground.prototype.isUpdateHealthPoints = function() {
    return this._healthPoints !== this._targetHealthPoints;
};

WindowBattleground.prototype.isUpdateMove = function() {
    return this.isUpdateMoveX() || this.isUpdateMoveY();
};

WindowBattleground.prototype.isUpdateMoveX = function() {
    return this.x !== this._targetX;
};

WindowBattleground.prototype.isUpdateMoveY = function() {
    return this.y !== this._targetY;
};

WindowBattleground.prototype.setFrameWhitePoints = function() {
    return parseInt(Math.abs(this._whitePoints - this._targetWhitePoints) / this.intervalPoints());
};

WindowBattleground.prototype.setFrameBluePoints = function() {
    return parseInt(Math.abs(this._bluePoints - this._targetBlackPoints) / this.intervalPoints());
};

WindowBattleground.prototype.setFrameGreenPoints = function() {
    return parseInt(Math.abs(this._greenPoints - this._targetGreenPoints) / this.intervalPoints());
};

WindowBattleground.prototype.setFrameRedPoints = function() {
    return parseInt(Math.abs(this._redPoints - this._targetRedPoints) / this.intervalPoints());
};

WindowBattleground.prototype.setFrameBlackPoints = function() {
    return parseInt(Math.abs(this._blackPoints - this._targetBlackPoints) / this.intervalPoints());
};

WindowBattleground.prototype.setFramePackPoints = function() {
    return parseInt(Math.abs(this._packPoints - this._targetPackPoints) / this.intervalPoints());
};

WindowBattleground.prototype.setFrameHandPoints = function() {
    return parseInt(Math.abs(this._handPoints - this._targetHandPoints) / this.intervalPoints());
};

WindowBattleground.prototype.setFrameX = function() {
    return parseInt(Math.abs(this.x - this._targetX) / 10);
};

WindowBattleground.prototype.setFrameY = function() {
    return parseInt(Math.abs(this.y - this._targetY) / 10);
};

WindowBattleground.prototype.setFrameAttackPoints = function() {
    let absolute = Math.abs(this._attackPoints - this._targetAttackPoints);
    let intervalPoint = this.setintervalPoints(absolute);

    return parseInt(absolute / intervalPoint);
};

WindowBattleground.prototype.setFrameHealthPoints = function() {
    let absolute = Math.abs(this._healthPoints - this._targetHealthPoints);
    let intervalPoint = this.setintervalPoints(absolute);

    return parseInt(absolute / intervalPoint);
};

WindowBattleground.prototype.setintervalPoints = function(Absolute) {
    if (Absolute > 100) {
        return 16;
    }else if (Absolute > 50) {
        return 8;
    }else{
        return 1;
    }
};

WindowBattleground.prototype.refreshPoints = function() {
    this._whitePoints = this.rateWhitePoints();
    this._bluePoints = this.rateBluePoints();
    this._greenPoints = this.rateGreenPoints();
    this._redPoints = this.rateRedPoints();
    this._blackPoints = this.rateBlackPoints();
    this._packPoints = this.ratePackPoints();
    this._handPoints = this.rateHandPoints();
    this.refresh();
};

WindowBattleground.prototype.refreshBattlePoints = function() {
    this._attackPoints = this.rateAttackPoints();
    this._healthPoints = this.rateHealthPoints();
    this.refresh();
};

WindowBattleground.prototype.refreshMove = function() {
    this.x = this.rateXcoord();
    this.y = this.rateYCoord();
};

WindowBattleground.prototype.rateWhitePoints = function() {
	if (this.iisUpdateWhitePoints()) {
        this._frame = this.setFrameWhitePoints();
        return parseInt((this._whitePoints * (this._frame - 1) + this._targetWhitePoints) / this._frame, 10);
    }
    return this._whitePoints;
};

WindowBattleground.prototype.rateBluePoints = function() {
	if (this.isUpdateBluePoints()) {
        this._frame = this.setFrameBluePoints();
        return parseInt((this._bluePoints * (this._frame - 1) + this._targetBluePoints) / this._frame, 10);
    }
    return this._bluePoints;
};

WindowBattleground.prototype.rateGreenPoints = function() {
	if (this.isUpdateGreenPoints()) {
        this._frame = this.setFrameGreenPoints();
        return parseInt((this._greenPoints * (this._frame - 1) + this._targetGreenPoints) / this._frame, 10);
    }
    return this._greenPoints;
};

WindowBattleground.prototype.rateRedPoints = function() {
	if (this.isUpdateRedPoints()) {
        this._frame = this.setFrameRedPoints();
        return parseInt((this._redPoints * (this._frame - 1) + this._targetRedPoints) / this._frame, 10);
    }
    return this._redPoints;
};

WindowBattleground.prototype.rateBlackPoints = function() {
	if (this.isUpdateBlackPoints()) {
        this._frame = this.setFrameBlackPoints();
        return parseInt((this._blackPoints * (this._frame - 1) + this._targetBlackPoints) / this._frame, 10);
    }
    return this._blackPoints;
};

WindowBattleground.prototype.ratePackPoints = function() {
	if (this.isUpdatePackPoints()) {
        this._frame = this.setFramePackPoints();
        return parseInt((this._packPoints * (this._frame - 1) + this._targetPackPoints) / this._frame, 10);
    }
    return this._packPoints;
};

WindowBattleground.prototype.rateHandPoints = function() {
	if (this.isUpdateHandPoints()) {
        this._frame = this.setFrameHandPoints();
        return parseInt((this._handPoints * (this._frame - 1) + this._targetHandPoints) / this._frame, 10);
    }
    return this._handPoints;
};

WindowBattleground.prototype.rateAttackPoints = function() {
	if (this.isUpdateAttackPoints()) {
        this._frame = this.setFrameAttackPoints();
        return parseInt((this._attackPoints * (this._frame - 1) + this._targetAttackPoints) / this._frame, 10);
    }
    return this._attackPoints;
};

WindowBattleground.prototype.rateHealthPoints = function() {
	if (this.isUpdateHealthPoints()) {
        this._frame = this.setFrameHealthPoints();
        return parseInt((this._healthPoints * (this._frame - 1) + this._targetHealthPoints) / this._frame, 10);
    }
    return this._healthPoints;
};

WindowBattleground.prototype.rateXcoord = function() {
	if (this.isUpdateMoveX()) {
        this._frame = this.setFrameX();
		return parseInt((this.x * (this._frame - 1) + this._targetX) / this._frame, 10);
    }
    return this.x;
};

WindowBattleground.prototype.rateYCoord = function() {
	if (this.isUpdateMoveY()) {
        this._frame = this.setFrameY();
		return parseInt((this.y * (this._frame - 1) + this._targetY) / this._frame, 10);
    }
    return this.y;
};

WindowBattleground.prototype.setWhitePoints = function(points = this._whitePoints) {
    if (points < 0) points = 0;
    if (points > 99) points = 99;
    this._targetWhitePoints = points;
};

WindowBattleground.prototype.setBluePoints = function(points = this._bluePoints) {
    if (points < 0) points = 0;
    if (points > 99) points = 99;
    this._targetBluePoints = points;
};

WindowBattleground.prototype.setGreenPoints = function(points = this._greenPoints) {
    if (points < 0) points = 0;
    if (points > 99) points = 99;
    this._targetGreenPoints = points;
};

WindowBattleground.prototype.setRedPoints = function(points = this._redPoints) {
    if (points < 0) points = 0;
    if (points > 99) points = 99;
    this._targetRedPoints = points;
};

WindowBattleground.prototype.setBlackPoints = function(points = this._blackPoints) {
    if (points < 0) points = 0;
    if (points > 99) points = 99;
    this._targetBlackPoints = points;
};

WindowBattleground.prototype.setPackPoints = function(points = this._packPoints) {
    if (points < 0) points = 0;
    if (points > 99) points = 99;
    this._targetPackPoints = points;
};

WindowBattleground.prototype.setHandPoints = function(points = this._handPoints) {
    if (points < 0) points = 0;
    if (points > 99) points = 99;
    this._targetHandPoints = points;
};

WindowBattleground.prototype.setAttackPoints = function(points = this._attackPoints) {
    if (points < 0) points = 0;
    if (points > 999) points = 999;
    this._targetAttackPoints = points;
};

WindowBattleground.prototype.setHealthPoints = function(points = this._healthPoints) {
    if (points < 0) points = 0;
    if (points > 999) points = 999;
    this._targetHealthPoints = points;
};

WindowBattleground.prototype.positionAnimation = function(position) {
    switch (position) {
        case 'WHITE_POINTS':
            this._spriteAnimation.x = 16 + 80;
            break;
        case 'BLUE_POINTS':
            this._spriteAnimation.x = 16 + (80 * 2);
            break;
        case 'GREEN_POINTS':
            this._spriteAnimation.x = 16 + (80 * 3);
            break;
        case 'RED_POINTS':
            this._spriteAnimation.x = 16 + (80 * 4);
            break;
        case 'BLACK_POINTS':
            this._spriteAnimation.x = 16 + (80 * 5);
            break;
        case 'PACK_POINTS':
            this._spriteAnimation.x = 16 + (80 * 6);
            break;
        case 'HAND_POINTS':
            this._spriteAnimation.x = 16 + (80 * 7);
            break;
        default:
            throw new Error('The Zone does not have this position');
    }
    if (this._player) {
        this._spriteAnimation.y = 180;
    }else{
        this._spriteAnimation.y = 30;
    }
}

WindowBattleground.prototype.showWinAnimation = function(index) {
    this._spriteAnimation.startAnimation($dataAnimations[index], true, 1);
}
