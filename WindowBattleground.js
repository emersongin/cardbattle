function WindowBattleground() {
    this.initialize.apply(this, arguments);
}

WindowBattleground.prototype = Object.create(Window_Base.prototype);
WindowBattleground.prototype.constructor = WindowBattleground;

WindowBattleground.prototype.initialize = function(Setup) {
    Window_Base.prototype.initialize.call(this, 0, 0, 
        Graphics.boxWidth, Graphics.boxHeight);
    this._player = Setup.player || false;
    this.setup();
    this.create();
    this.init();
};

WindowBattleground.prototype.setup = function() {
    this.setTargets();
    this.setAttributes();
    this.setConfig();
};

WindowBattleground.prototype.setTargets = function() {
    this.x = 0;
    this.y = 0;
    this._targetX = 0;
    this._targetY = 0;
};

WindowBattleground.prototype.setAttributes = function() {
    this._attackPoints = 0;
    this._healthPoints = 0;
    this._targetAttackPoints = 0;
    this._targetHealthPoints = 0;
    this._packPoints = 0;
    this._handPoints = 0;
    this._targetPackPoints = 0;
    this._targetHandPoints = 0;
    this._colorPoints = new GameFolderColor();
    this._targetColorPoints = new GameFolderColor();
    this.definePackPoints();
};

WindowBattleground.prototype.definePackPoints = function() {
    this._packPoints = 40;
    this._targetPackPoints = 40;
};

WindowBattleground.prototype.setConfig = function() {
    this._delay = 0;
    this._frame = 0;
    this.padding = 0;
    this.opacity = 0;
    this.openness = 0;
};

WindowBattleground.prototype.create = function() {
    this.createBackground();
    this.createAnimation();
    this.createDisplay();
};

WindowBattleground.prototype.createBackground = function() {
    this._background = new Sprite(new Bitmap(816, 184));

    if (this.isPlayer()) {
        this._background.bitmap = ImageManager.loadSystem('BackgroundZone1');
    }else{
        this._background.bitmap = ImageManager.loadSystem('BackgroundZone2');
    }

    this.addChildToBack(this._background);
};

WindowBattleground.prototype.createAnimation = function() {
    this._spriteAnimation = new Sprite_Base();
    this.addChild(this._spriteAnimation);
};

WindowBattleground.prototype.createDisplay = function() {
    this._display = new Sprite(new Bitmap(100, 20));
    this._display.bitmap.fontSize = this.standardFontSize();
    this._display.bitmap.drawText('Pass', 0, 0, 100, 20, 'right');
    this._display.show = false;

    if (this.isPlayer()) {
        this._display.x = 350;
        this._display.y = 120;
    }else{
        this._display.x = 350;
        this._display.y = 36;
    }

    this.addChild(this._display);
};

WindowBattleground.prototype.init = function() {
    this.refreshContents();
    this.initialPosition();
    this.open();
};

WindowBattleground.prototype.refreshContents = function() {
    this.contents.clear();
    this.drawPoints();
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

WindowBattleground.prototype.isPlayer = function() {
    return this._player;
};

WindowBattleground.prototype.hasDelay = function() {
    return this._delay;
};

WindowBattleground.prototype.voidDelay = function() {
    return !this._delay;
};

WindowBattleground.prototype.intervalMove = function() {
    return 8;
};

WindowBattleground.prototype.intervalPoints = function() {
    return 1;
};

WindowBattleground.prototype.moveDelay = function() {
    return 1;
};

WindowBattleground.prototype.battlePointsDelay = function() {
    return 1;
};

WindowBattleground.prototype.pointsDelay = function() {
    return 10;
};

WindowBattleground.prototype.standardFontSize = function() {
    return 20;
};

WindowBattleground.prototype.showDisplay = function() {
    this._display.show = true;
};

WindowBattleground.prototype.hideDisplay = function() {
    this._display.show = false;
};

WindowBattleground.prototype.moveIn = function() {
    if (this.isPlayer()) {
        this._targetY = 440;
    }else{
        this._targetY = 0;
    }
};

WindowBattleground.prototype.moveOut = function() {
    if (this.isPlayer()) {
        this._targetY = 624;
    }else{
        this._targetY = -184;
    }
};

WindowBattleground.prototype.IsMoveIn = function() {
    if (this.isPlayer()) {
        return this.y === 440;
    }else{
        return this.y === 0;
    }
};

WindowBattleground.prototype.IsMoveOut = function() {
    if (this.isPlayer()) {
        return this.y === 624;
    }else{
        return this.y === -184;
    }
};

WindowBattleground.prototype.drawPoints = function() {
    this.drawStringBattlePoints();
    this.drawStringColorPoints();
    this.drawStringOtherPoints();
};

WindowBattleground.prototype.drawStringBattlePoints = function() {
    let padding = 120;

    if (this.isPlayer()) {
        itemHeight = 120;
    }else{
        itemHeight = 36;
    }

    this.drawTextEx('AP' + ' ' + this._attackPoints, padding, itemHeight);
    this.drawTextEx('HP' + ' ' + this._healthPoints, padding + 100, itemHeight);
};

WindowBattleground.prototype.drawStringColorPoints = function() {
    let padding = 80;
    let index = 1;
    let gameFolderColor = this._colorPoints;
    let indexIcon = 160;

    if (this.isPlayer()) {
        itemHeight = 148;
    }else{
        itemHeight = 0;
    }

    for (let key in gameFolderColor) {     
        if (gameFolderColor.hasOwnProperty(key) && key !== 'brown') {
            let stringIcon = this.createStringIcon(indexIcon);
            let paddingItem = padding * index;
            let colorValue = gameFolderColor[key].padZero(2);

            this.drawTextEx(stringIcon + ' ' + colorValue, paddingItem, itemHeight);

            indexIcon++;
            index++;
        }
    }
};

WindowBattleground.prototype.drawStringOtherPoints = function() {
    let padding = 80;
    let packIcon = this.createStringIcon(187);
    let handIcon = this.createStringIcon(188);
    let packPoints = this._packPoints.padZero(2);
    let handPoints = this._handPoints.padZero(2);

    if (this.isPlayer()) {
        itemHeight = 148;
    }else{
        itemHeight = 0;
    }

    this.drawTextEx(packIcon + ' ' + packPoints, padding * 6, itemHeight);
    this.drawTextEx(handIcon + ' ' + handPoints, padding * 7, itemHeight);
};

WindowBattleground.prototype.createStringIcon = function(indexIcon) {
    return '\\I[' + indexIcon + ']';
};

WindowBattleground.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateMove();
    this.updatePoints();
    this.updateBattlePoints();
    this.updateBackgroundOpacity();
    this.updateDisplay();
    this.reducerDelay();
};

WindowBattleground.prototype.updateMove = function() {
    if (this.isUpdateMove() && this.isOpen()) {
        if (this.voidDelay()) {
            this._delay = this.moveDelay();
            this.refreshMove();
        }
    }
};

WindowBattleground.prototype.isUpdateMove = function() {
    return this.noEquals(this.x, this._targetX) || 
        this.noEquals(this.y, this._targetY);
};

WindowBattleground.prototype.noEquals = function(attr, target) {
    return attr !== target;
};

WindowBattleground.prototype.refreshMove = function() {
    this.x = this.rateMove(this.x, this._targetX);
    this.y = this.rateMove(this.y, this._targetY);
};

WindowBattleground.prototype.rateMove = function(coord, target) {
	if (this.noEquals(coord, target)) {
        let frame = this._frame;

        frame = this.setFrameMove(coord, target);
		return parseInt((coord * (frame - 1) + target) / frame, 10);
    }
    return coord;
};

WindowBattleground.prototype.setFrameMove = function(attr, target) {
    return parseInt(Math.abs(attr - target) / this.intervalMove());
};

WindowBattleground.prototype.updatePoints = function() {
    if (this.isUpdatePoints() && this.isOpen()) {
        if (this.voidDelay()) {
            this._delay = this.pointsDelay();
            this.refreshPoints();
        }
    }
};

WindowBattleground.prototype.isUpdatePoints = function() {
    let color = this._colorPoints;
    let target = this._targetColorPoints;

    return this.noEquals(color.white, target.white) || 
        this.noEquals(color.blue, target.blue) || 
        this.noEquals(color.green, target.green) || 
        this.noEquals(color.red, target.red) || 
        this.noEquals(color.black, target.black) || 
        this.noEquals(this._packPoints, this._targetPackPoints) || 
        this.noEquals(this._handPoints, this._targetHandPoints);
};

WindowBattleground.prototype.refreshPoints = function() {
    let color = this._colorPoints;
    let target = this._targetColorPoints;

    color.white = this.ratePoints(color.white, target.white);
    color.blue = this.ratePoints(color.blue, target.blue);
    color.green = this.ratePoints(color.green, target.green);
    color.red = this.ratePoints(color.red, target.red);
    color.black = this.ratePoints(color.black, target.black);
    this._packPoints = this.ratePoints(this._packPoints, this._targetPackPoints);
    this._handPoints = this.ratePoints(this._handPoints, this._targetHandPoints);
    this.refreshContents();
};

WindowBattleground.prototype.ratePoints = function(attr, target) {
	if (this.noEquals(attr, target)) {
        let frame = this._frame;

        frame = this.setFramePoints(attr, target);
        return parseInt((attr * (frame - 1) + target) / frame, 10);
    }
    return attr;
};

WindowBattleground.prototype.setFramePoints = function(attr, target) {
    return parseInt(Math.abs(attr - target) / this.intervalPoints());
};

WindowBattleground.prototype.updateBattlePoints = function() {
    if (this.isUpdateBattlePoints() && this.isOpen()) {
        if (this.voidDelay()) {
            this._delay = this.battlePointsDelay();
            this.refreshBattlePoints();
        }
    }
};

WindowBattleground.prototype.isUpdateBattlePoints = function() {
    return this.noEquals(this._attackPoints, this._targetAttackPoints) || 
        this.noEquals(this._healthPoints, this._targetHealthPoints);
};

WindowBattleground.prototype.refreshBattlePoints = function() {
    this._attackPoints = this.rateBattlePoints(this._attackPoints, this._targetAttackPoints);
    this._healthPoints = this.rateBattlePoints(this._healthPoints, this._targetHealthPoints);
    this.refreshContents();
};

WindowBattleground.prototype.rateBattlePoints = function(attr, target) {
	if (this.noEquals(attr, target)) {
        let frame = this._frame;

        frame = this.setFrameBattlePoints(attr, target);
        return parseInt((attr * (frame - 1) + target) / frame, 10);
    }
    return attr;
};

WindowBattleground.prototype.setFrameBattlePoints = function(attr, target) {
    let absolute = Math.abs(attr - target);
    let intervalPoint = this.setIntervalBattlePoints(absolute);
    return parseInt(absolute / intervalPoint);
};

WindowBattleground.prototype.setIntervalBattlePoints = function(absolute) {
    if (absolute > 100) {
        return 16;
    } else if (absolute > 50) {
        return 8;
    }
    return 1;
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

WindowBattleground.prototype.updateDisplay = function() {
    if (this._display.show) {
        if (this._display.scale.x < 1) {
            this._display.scale.x += 0.1;
        }
    } else {
        if (this._display.scale.x > 0.1) {
            this._display.scale.x -= 0.1;
        }
    }
};

WindowBattleground.prototype.reducerDelay = function() {
    if (this.hasDelay()) {
        this._delay--;
    }
};

WindowBattleground.prototype.setPoints = function(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
};

WindowBattleground.prototype.setWhitePoints = function(points = this._colorPoints.white) {
    this._targetColorPoints.white = this.setPoints(points, 0, 99);
};

WindowBattleground.prototype.setBluePoints = function(points = this._colorPoints.blue) {
    this._targetColorPoints.blue = this.setPoints(points, 0, 99);
};

WindowBattleground.prototype.setGreenPoints = function(points = this._colorPoints.green) {
    this._targetColorPoints.green = this.setPoints(points, 0, 99);
};

WindowBattleground.prototype.setRedPoints = function(points = this._colorPoints.red) {
    this._targetColorPoints.red = this.setPoints(points, 0, 99);
};

WindowBattleground.prototype.setBlackPoints = function(points = this._colorPoints.black) {
    this._targetColorPoints.black = this.setPoints(points, 0, 99);
};

WindowBattleground.prototype.setPackPoints = function(points = this._packPoints) {
    this._targetPackPoints = this.setPoints(points, 0, 99);
};

WindowBattleground.prototype.setHandPoints = function(points = this._handPoints) {
    this._targetHandPoints = this.setPoints(points, 0, 99);
};

WindowBattleground.prototype.setAttackPoints = function(points = this._attackPoints) {
    this._targetAttackPoints = this.setPoints(points, 0, 999);
};

WindowBattleground.prototype.setHealthPoints = function(points = this._healthPoints) {
    this._targetHealthPoints = this.setPoints(points, 0, 999);
};

WindowBattleground.prototype.setPositionAnimate = function(position) {
    if (this.isPlayer()) {
        this._spriteAnimation.y = 180;
    }else{
        this._spriteAnimation.y = 30;
    }
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
            throw new Error('The Field does not have this position');
    }
};

WindowBattleground.prototype.startAnimation = function(index) {
    this._spriteAnimation.startAnimation($dataAnimations[index], true, 1);
};
