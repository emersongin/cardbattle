function SpriteCard() {
    this.initialize.apply(this, arguments);
};

SpriteCard.prototype = Object.create(Sprite.prototype);
SpriteCard.prototype.constructor = SpriteCard;

SpriteCard.prototype.initialize = function (GameCard) {
    Sprite.prototype.initialize.call(this);
    this._player = GameCard.isPlayer();
    this._types = GameCard.getTypes();
    this._color = GameCard.getColor();
    this._filename = GameCard.getFilename();
    this._attackPoints = GameCard.getAttackPoints();
    this._healthPoints = GameCard.getHealthPoints();
    this.setup();
    this.create();
};

SpriteCard.prototype.setup = function () {
    this.setTargets();
    this.setAttributes();
    this.setConfig();
};

SpriteCard.prototype.setTargets = function () {
    this._targetAttackPoints = this._attackPoints;
    this._targetHealthPoints = this._healthPoints;
    this._targetX = 0;
    this._targetY = 0;
    this._targetScaleX = 0;
    this._targetScaleY = 1;
};

SpriteCard.prototype.setAttributes = function () {
    this._show = false;
    this._select = false;
    this._like = false;
    this._take = false;
    this._triggered = false;
    this._block = false;
    this._active = true;
};

SpriteCard.prototype.setConfig = function () {
    this._sequence = [];
    this._framePoints = 0;
    this._frameMovement = 0;
    this._count = 0;
    this._openness = false;
    this.scale.x = 0;
};

SpriteCard.prototype.create = function (GameCard) {
    this.createBackground();
    this.createBackgroundImage();
    this.createBackgroundVerse();
    this.createBackgroundColor();
    this.createBorder();
    this.createSelect();
    this.createChoice();
    this.createConfirm();
    this.createEffect();
    this.createCancel();
};

SpriteCard.prototype.createBackground = function () {
    this._background = new Sprite_Base();
    this._background.bitmap = new Bitmap(104, 120);
    this._background.bitmap.fontSize = 18;
    this.addChild(this._background);
};

SpriteCard.prototype.createBackgroundImage = function () {
    this._backgroundImage = ImageManager.loadCard(this._filename);
};

SpriteCard.prototype.createBackgroundVerse = function () {
    this._backgroundVerse = ImageManager.loadCard('CardVerse');
};

SpriteCard.prototype.createBackgroundColor = function () {
    switch (this._color.toUpperCase()) {
        case 'WHITE':
            color  = 'rgba(255, 255, 255, 0.7)';
            break;
        case 'RED':
            color  = 'rgba(255, 0, 0, 0.7)';
            break;
        case 'GREEN':
            color  = 'rgba(0, 255, 0, 0.7)';
            break;
        case 'BLUE':
            color  = 'rgba(0, 0, 255, 0.7)';
            break;
        case 'BLACK':
            color  = 'rgba(0, 0, 0, 0.7)';
            break;
        case 'BROWN':
            color  = 'rgba(139, 69, 19, 0.7)';
            break;
        default:
            throw new Error('The Color does not have');
    }

    this._backgroundColor = new Bitmap(100, 30);
    this._backgroundColor.fillAll(color);
};

SpriteCard.prototype.createBorder = function () {
    this._borderStand = ImageManager.loadCard('CardStand');
};

SpriteCard.prototype.createSelect = function () {
    this._likeBorder = ImageManager.loadCard('CardSelect');
};

SpriteCard.prototype.createChoice = function () {
    this._selectBorder = new Sprite_Base();
    this._selectBorder.bitmap = ImageManager.loadCard('CardChoice');
    this.addChild(this._selectBorder);
};

SpriteCard.prototype.createConfirm = function () {
    this._takeBorder = new Sprite_Base();
    this._takeBorder.bitmap = ImageManager.loadCard('CardConfirm');
    this.addChild(this._takeBorder);
};

SpriteCard.prototype.createEffect = function () {
    if (this.isPlayer()) {
        this._triggeredIcon = ImageManager.loadCard('CardEffect1');
    } else{
        this._triggeredIcon = ImageManager.loadCard('CardEffect3');
    }
};

SpriteCard.prototype.createCancel = function () {
    if (this.isPlayer()) {
        this._blockIcon = ImageManager.loadCard('CardEffect2');
    } else{
        this._blockIcon = ImageManager.loadCard('CardEffect4');
    }
};

SpriteCard.prototype.isPlayer = function () {
    return this._player;
};

SpriteCard.prototype.displaySwitch = function () {
    if (this.isShow()) {
        this._show = false;
    } else {
        this._show = true;
    }
};

SpriteCard.prototype.isEnabled = function () {
    return this._active;
};

SpriteCard.prototype.isDisabled = function () {
    return !this.isEnabled();
};

SpriteCard.prototype.isOpen = function () {
    return this._openness;
};

SpriteCard.prototype.isClose = function () {
    return !this._openness;
};

SpriteCard.prototype.itsMoving = function () {
    return this._frameMovement;
};

SpriteCard.prototype.voidMovement = function () {
    return !this.itsMoving();
};

SpriteCard.prototype.hasPointUpdate = function () {
    return this._framePoints;
};

SpriteCard.prototype.voidPointUpdate = function () {
    return !this.hasPointUpdate();
};

SpriteCard.prototype.isShow = function () {
    return this._show;
};

SpriteCard.prototype.isHide = function () {
    return !this.isShow();
};

SpriteCard.prototype.isSelected = function () {
    return this._select;
};

SpriteCard.prototype.isUnselect = function () {
    return !this.isSelected();
};

SpriteCard.prototype.isLiked = function () {
    return this._like;
};

SpriteCard.prototype.isUnlike = function () {
    return !this.isLiked();
};

SpriteCard.prototype.isTaked = function () {
    return this._take;
};

SpriteCard.prototype.isUntake = function () {
    return !this.isTaked();
};

SpriteCard.prototype.isTriggered = function () {
    return this._triggered;
};

SpriteCard.prototype.isNotTriggered = function () {
    return !this.isTriggered();
};

SpriteCard.prototype.isBlock = function () {
    return this._block;
};

SpriteCard.prototype.isUnblock = function () {
    return !this.isBlock();
};

SpriteCard.prototype.select = function () {
    this._select = true;
};

SpriteCard.prototype.unselect = function () {
    this._select = false;
};

SpriteCard.prototype.like = function () {
    this._like = true;
};

SpriteCard.prototype.unlike = function () {
    this._like = false;
};

SpriteCard.prototype.take = function () {
    this._take = true;
};

SpriteCard.prototype.untake = function () {
    this._take = false;
};

SpriteCard.prototype.enable = function () {
    this._active = true;
};

SpriteCard.prototype.disable = function () {
    this._active = false;
};

SpriteCard.prototype.triggered = function () {
    this._triggered = true;
};

SpriteCard.prototype.notTriggered = function () {
    this._triggered = false;
};

SpriteCard.prototype.block = function () {
    this._block = true;
};

SpriteCard.prototype.unblock = function () {
    this._block = false;
};

SpriteCard.prototype.hasSequence = function () {
    return this._sequence.length;
};

SpriteCard.prototype.isExistType = function (type) {
    return this._types.indexOf(type) > -1;
};

SpriteCard.prototype.refresh = function () {
    this._background.bitmap.clear();
    this.drawBackground();
    this.drawDisplay();
    this.drawLike();
    this.drawTriggered();
    this.drawBlock();
    this.drawEnable();
};

SpriteCard.prototype.drawBackground = function () {
    if (this.isShow()) {
        this._background.bitmap.blt(this._backgroundImage, 0, 0, 100, 116, 2, 2);
        this._background.bitmap.blt(this._backgroundColor, 0, 0, 100, 30, 2, 88);
    } else {
        this._background.bitmap.blt(this._backgroundVerse, 0, 0, 104, 120, 0, 0);
    }
};

SpriteCard.prototype.drawDisplay = function () {
    let attack = this._attackPoints.padZero(2);
    let health = this._healthPoints.padZero(2);
    
    if (this.isShow()) {
        if (this.isExistType('BATTLE_CARD')) {
            this._background.bitmap.textColor = 'white';
            this._background.bitmap.drawText(attack + "/" + health, 2, 88, 100, 30, 'center');
        } else if (this.isExistType('PROGRAM_CARD') || 
                    this.isExistType('LOAD_CARD') || 
                    this.isExistType('COMPILE_CARD')) {
            this._background.bitmap.textColor = 'yellow';
            this._background.bitmap.drawText('《 P 》', 2, 88, 100, 30, 'center');
        } else {
            throw new Error('This Card not type');
        }
    }
};

SpriteCard.prototype.drawLike = function () {
    if (this.isLiked()) {
        this._background.bitmap.blt(this._likeBorder, 0, 0, 104, 120, 0, 0);
    } else {
        this._background.bitmap.blt(this._borderStand, 0, 0, 104, 120, 0, 0);
    }
};

SpriteCard.prototype.drawTriggered = function () {
    if (this.isTriggered()) {
        this._background.bitmap.blt(this._triggeredIcon, 0, 0, 13, 22, 10, 10);
    }
};

SpriteCard.prototype.drawBlock = function () {
    if (this.isBlock()) {
        this._background.bitmap.blt(this._blockIcon, 0, 0, 13, 22, 10, 60);
    }
};

SpriteCard.prototype.drawEnable = function () {
    if (this.isEnabled()) {
        this._background.setColorTone([0, 0, 0, 0]);
    } else {
        this._background.setColorTone([-100, -100, -100, 0]);
    }
};

SpriteCard.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateSequece();
    this.updateOpening();
    this.updateMovement();
    this.updatePoints();
    this.updateChoice();
    this.updateConfirm();
};

SpriteCard.prototype.updateSequece = function () {
    if (this.hasSequence() && this.voidMovement()) {
        this.toMove(this._sequence.shift());
    }
};

SpriteCard.prototype.updateOpening = function () {
    if (this.scale.x === 1 && this.isClose()) {
        this._openness = true;
    } else if (this.scale.x === 0 && this.isOpen()) {
        this._openness = false;
    }
};

SpriteCard.prototype.updateMovement = function () {
    if (this.itsMoving()) {
        this.x = this.updateMove(this.x, this._targetX);
        this.y = this.updateMove(this.y, this._targetY);
        this.scale.x = this.updateMove(this.scale.x, this._targetScaleX);
        this.scale.y = this.updateMove(this.scale.y, this._targetScaleY);
        this._frameMovement--;
    }
};

SpriteCard.prototype.updatePoints = function () {
    if (this.isUpdatePoints() && this.isOpen()) {
        if (this.voidMovement()) {
            this._attackPoints = this.refreshPoints(this._attackPoints, this._targetAttackPoints);
            this._healthPoints = this.refreshPoints(this._healthPoints, this._targetHealthPoints);
            this.refresh();
            this._framePoints--;
        }
    }
};

SpriteCard.prototype.updateChoice = function () {
    if (this.isSelected() && this.isOpen()) {
        let par = this._count;

        this._selectBorder.opacity = 255;
        this._selectBorder.setColorTone([par, par, par, 0]);

        if (this._count > 100) {
            this._count = -200;
        }

        this._count += 32;
    } else {
        if (this._selectBorder.opacity || this.isUntake()) {
            this._selectBorder.opacity = 0;
            this._count = 0;
        }
    }
};

SpriteCard.prototype.updateConfirm = function () {
    if (this.isTaked() && this.isOpen()) {
        let par = this._count;

        this._takeBorder.opacity = 255;
        this._takeBorder.setColorTone([par, par, par, 0]);

        if (this._count > 100) {
            this._count = -200;
        }

        this._count += 32;
    } else {
        if (this._takeBorder.opacity || this.isUnselect()) {
            this._takeBorder.opacity = 0;
            this._count = 0;
        }
    }
};

SpriteCard.prototype.noEquals = function(attr, target) {
    return attr !== target;
};

SpriteCard.prototype.isUpdatePoints = function () {
    return this.noEquals(this._attackPoints, this._targetAttackPoints) || 
        this.noEquals(this._healthPoints, this._targetHealthPoints);
};

SpriteCard.prototype.updateMove = function (attr, target) {
	if (this.noEquals(attr, target)) {
        let frame = this._frameMovement;
		return (attr * (frame - 1) + target) / frame;
    }
    return attr;
};

SpriteCard.prototype.refreshPoints = function (attr, target) {
	if (this.noEquals(attr, target)) {
        let frame = this.setFramePoints(attr, target);
        return parseInt((attr * (frame - 1) + target) / frame, 10);
    }
    return attr;
};

SpriteCard.prototype.setFramePoints = function (attr, target) {
    return parseInt(Math.abs(attr - target) / 1);
};

SpriteCard.prototype.setActions = function (actions) {
    if (Array.isArray(actions)) {
    } else {
        if (actions) {
            actions = [actions];
        } else{
            actions = [];
        }
    }
    
    for (let index = 0; index < actions.length; index++) {
        this._sequence.push(actions[index]);
    }
};

SpriteCard.prototype.toMove = function (action) {
    switch (action.type) {
        case 'POSITION_BATTLEFIELD':
            this.setPositionBattlefield(action.index);
            break;
        case 'POSITION_HAND':
            this.setPositionHand();
            break;
        case 'POSITION_PROGRAM_FIELD':
            this.setPositionProgramField();
            break;
        case 'POSITION_COLLECTION':
            this.setPositionCollection(action.index, action.length);
            break;
        case 'MOVE_FIELD':
            this.moveField(action.index);
            break;
        case 'MOVE_HAND':
            this.moveHand();
            break;
        case 'MOVE_ATTACK':
            this.moveAttack(action.target);
            break;
        case 'OPEN':
            this.open();
            break;
        case 'CLOSE':
            this.close();
            break;
        case 'TO_TURN':
            this.displaySwitch();
            break;
        case 'REFRESH':
            this.refresh();
            break;
        case 'PLUS':
            this.plus(action.times);
            break;
        case 'LESS':
            this.less(action.times);
            break;
        case 'MOVE_UP':
            this.up(action.times);
            break;
        case 'MOVE_DOWN':
            this.down(action.times);
            break;
        case 'MOVE_LEFT':
            this.left(action.times);
            break;
        case 'MOVE_RIGHT':
            this.right(action.times);
            break;
        case 'ANIMATION':
            this._background.startAnimation($dataAnimations[action.index]);
            break;
        case 'SELECT':
            this.select();
            break;
        case 'UNSELECT':
            this.unselect();
            break;
        case 'LIKE':
            this.like();
            break;
        case 'UNLIKE':
            this.unlike();
            break;
        case 'TAKE':
            this.take();
            break;
        case 'UNTAKE':
            this.untake();
            break;
        case 'ENABLE':
            this.enable();
            break;
        case 'DISABLE':
            this.disable();
            break;
        case 'TRIGGERED':
            this.triggered();
            break;
        case 'NOT_TRIGGERED':
            this.notTriggered();
            break;
        case 'BLOCK':
            this.block();
            break;
        case 'UNBLOCK':
            this.unblock();
            break;
        case 'ATTACK':
            this.setAttack(action.points);
            break;
        case 'HEALTH':
            this.setHealth(action.points);
            break;
        case 'WAIT':
            break;
    }
    this._frameMovement = action.frame || 1;
};

SpriteCard.prototype.setPositionBattlefield = function (index) {
    this._targetX = 50 + (104 * index);
    this._targetY = 0;
};

SpriteCard.prototype.setPositionHand = function () {
    this._targetX = 850;
    this._targetY = 0;
};

SpriteCard.prototype.setPositionProgramField = function () {
    this._targetX = 658;
    this._targetY = 0;
};

SpriteCard.prototype.setPositionCollection = function (index, length) {
    let paddind = length > 6 ? (624 / length - 1) * index : 104 * index;

    this._targetX = 50 + paddind;
    this._targetY = 0;
};

SpriteCard.prototype.moveField = function (index) {
    this._targetX = 0 + (104 * index);
    this._targetY = 0;
    this._targetScaleX = 1;
    this._targetScaleY = 1;
};

SpriteCard.prototype.moveHand = function () {
    this._targetX = 816;
    this._targetY = 0;
};

SpriteCard.prototype.moveAttack = function (target) {
    this._targetX = 0 + (52 * target);
    if (this.isPlayer()) {
        this._targetY = this.y - 256;
    } else {
        this._targetY = this.y + 256;
    }
};

SpriteCard.prototype.open = function () {
    if (this.isClose()) {
        this._targetX = this.x - 50;
        this._targetScaleX = 1;
    }
};

SpriteCard.prototype.close = function () {
    if (this.isOpen()) {
        this._targetX = this.x + 50;
        this._targetScaleX = 0;
    }
};

SpriteCard.prototype.plus = function (times) {
    let lessCoor = 0;
    let plusScale = 0.0;

    for (let index = 0; index < times; index++) {
        lessCoor += 10;
        plusScale += 0.2;
    }

    this._targetX = this.x - lessCoor;
    this._targetY = this.y - lessCoor;
    this._targetScaleX = this.scale.x + plusScale;
    this._targetScaleY = this.scale.y + plusScale;
};

SpriteCard.prototype.less = function (times) {
    let plusCoor = 0;
    let lessScale = 0.0;

    for (let index = 0; index < times; index++) {
        plusCoor += 10;
        lessScale += 0.2;
    }

    this._targetX = this.x + plusCoor;
    this._targetY = this.y + plusCoor;
    this._targetScaleX = this.scale.x - lessScale;
    this._targetScaleY = this.scale.y - lessScale;
};

SpriteCard.prototype.up = function (times) {
    let lessCoor = 0;

    for (let index = 0; index < times; index++) {
        lessCoor += 16;
    }

    this._targetY = this.y - lessCoor;
};

SpriteCard.prototype.down = function (times) {
    let plusCoor = 0;

    for (let index = 0; index < times; index++) {
        plusCoor += 16;
    }

    this._targetY = this.y + plusCoor;
};

SpriteCard.prototype.left = function (times) {
    let lessCoor = 0;

    for (let index = 0; index < times; index++) {
        lessCoor += 16;
    }

    this._targetX = this.x - lessCoor;
};

SpriteCard.prototype.right = function (times) {
    let plusCoor = 0;

    for (let index = 0; index < times; index++) {
        plusCoor += 16;
    }

    this._targetX = this.x + plusCoor;
};

SpriteCard.prototype.setPoints = function(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
};

SpriteCard.prototype.setAttack = function (points = this._attackPoints) {
    this._targetAttackPoints = this.setPoints(points, 0, 99);;
};

SpriteCard.prototype.setHealth = function (points = this._healthPoints) {
    this._targetHealthPoints = this.setPoints(points, 0, 99);;
};
