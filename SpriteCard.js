function SpriteCard() {
    this.initialize.apply(this, arguments);
};

SpriteCard.prototype = Object.create(Sprite.prototype);
SpriteCard.prototype.constructor = SpriteCard;

SpriteCard.prototype.initialize = function(GameCard) {
    Sprite.prototype.initialize.call(this);
    this._player = GameCard.isPlayer();
    this._type = GameCard.getType();
    this._attackPoints = GameCard.getAttackPoint();
    this._healthPoints = GameCard.getHealthPoint();
    this._targetAttackPoints = this._attackPoints;
    this._targetHealthPoints = this._healthPoints;
    this._framePoints = 0;
    this._sequence = [];
    this._targetX = 0;
    this._targetY = 0;
    this._targetScaleX = 0;
    this._targetScaleY = 1;
    this._frameMove = 0;
    this._flashDelay = 0;
    this._openness = false;
    this._show = false;
    this._light = false;
    this._select = false;
    this._confirm = false;
    this._effect = false;
    this._block = false;
    this._active = true;
    this.setup();
    this.create(GameCard);
};

SpriteCard.prototype.setup = function() {
    this.scale.x = 0;
};

SpriteCard.prototype.create = function(GameCard) {
    this.createBackground();
    this.createBackgroundImage(GameCard.getFilename());
    this.createBackgroundVerse();
    this.createBackgroundColor(GameCard.getColor());
    this.createBorder();
    this.createSelect();
    this.createChoice();
    this.createConfirm();
    this.createEffect();
    this.createCancel();
};

SpriteCard.prototype.createBackground = function() {
    this._background = new Sprite_Base();
    this._background.bitmap = new Bitmap(104, 120);
    this._background.bitmap.fontSize = 18;
    this.addChild(this._background);
};

SpriteCard.prototype.createBackgroundImage = function(filename) {
    this._backgroundImage = ImageManager.loadCard(filename);
};

SpriteCard.prototype.createBackgroundVerse = function() {
    this._backgroundVerse = ImageManager.loadCard('CardVerse');
};

SpriteCard.prototype.createBackgroundColor = function(color) {
    switch (color.toUpperCase()) {
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
            color  = 'rgba(255, 255, 255, 0.7)';
            break;
    }

    this._backgroundColor = new Bitmap(100, 30);
    this._backgroundColor.fillAll(color);
};

SpriteCard.prototype.createBorder = function() {
    this._borderStand = ImageManager.loadCard('CardStand');
};

SpriteCard.prototype.createSelect = function() {
    this._selectBorder = ImageManager.loadCard('CardSelect');
};

SpriteCard.prototype.createChoice = function() {
    this._lightBorder = new Sprite_Base();
    this._lightBorder.bitmap = ImageManager.loadCard('CardChoice');
    this.addChild(this._lightBorder);
};

SpriteCard.prototype.createConfirm = function() {
    this._confirmBorder = new Sprite_Base();
    this._confirmBorder.bitmap = ImageManager.loadCard('CardConfirm');
    this.addChild(this._confirmBorder);
};

SpriteCard.prototype.createEffect = function() {
    if (this.isPlayer()) {
        this._effectIcon = ImageManager.loadCard('CardEffect1');
    }else{
        this._effectIcon = ImageManager.loadCard('CardEffect3');
    }
};

SpriteCard.prototype.createCancel = function() {
    if (this.isPlayer()) {
        this._blockIcon = ImageManager.loadCard('CardEffect2');
    }else{
        this._blockIcon = ImageManager.loadCard('CardEffect4');
    }
};

SpriteCard.prototype.isPlayer = function() {
    return this._player;
};

SpriteCard.prototype.isNoPlayer = function() {
    return !this._player;
};

SpriteCard.prototype.isOpen = function() {
    return this._openness;
};

SpriteCard.prototype.isClose = function() {
    return !this._openness;
};

SpriteCard.prototype.hasFrameMove = function() {
    return this._frameMove;
};

SpriteCard.prototype.voidFrameMove = function() {
    return !this._frameMove;
};

SpriteCard.prototype.hasFramePoints = function() {
    return this._framePoints;
};

SpriteCard.prototype.voidFramePoints = function() {
    return !this._framePoints;
};

SpriteCard.prototype.displaySwitch = function() {
    return this.isShow() ? false : true;
};

SpriteCard.prototype.isShow = function() {
    return this._show;
};

SpriteCard.prototype.isLight = function() {
    return this._light;
};

SpriteCard.prototype.isUnlit = function() {
    return !this._light;
};

SpriteCard.prototype.isSelected = function() {
    return this._select;
};

SpriteCard.prototype.isUnselected = function() {
    return !this._select;
};

SpriteCard.prototype.isConfirmed = function() {
    return this._confirm;
};

SpriteCard.prototype.isNoConfirm = function() {
    return !this._confirm;
};

SpriteCard.prototype.isEnabled = function() {
    return this._active;
};

SpriteCard.prototype.isDisabled = function() {
    return !this._active;
};

SpriteCard.prototype.isEffect = function() {
    return this._effect;
};

SpriteCard.prototype.isNoEffect = function() {
    return !this._effect;
};

SpriteCard.prototype.isBlock = function() {
    return this._block;
};

SpriteCard.prototype.isUnblock = function() {
    return !this._block;
};

SpriteCard.prototype.light = function() {
    this._light = true;
};

SpriteCard.prototype.unlit = function() {
    this._light = false;
};

SpriteCard.prototype.select = function() {
    this._select = true;
};

SpriteCard.prototype.unselect = function() {
    this._select = false;
};

SpriteCard.prototype.confirm = function() {
    this._confirm = true;
};

SpriteCard.prototype.unconfirm = function() {
    this._confirm = false;
};

SpriteCard.prototype.enable = function() {
    this._active = true;
};

SpriteCard.prototype.disable = function() {
    this._active = false;
};

SpriteCard.prototype.effect = function() {
    this._effect = true;
};

SpriteCard.prototype.uneffect = function() {
    this._effect = false;
};

SpriteCard.prototype.block = function() {
    this._block = true;
};

SpriteCard.prototype.unblock = function() {
    this._block = false;
};

SpriteCard.prototype.refresh = function() {
    this._background.bitmap.clear();
    this.drawBackground();
    this.drawDisplay();
    this.drawSelect();
    this.drawEffect();
    this.drawBlock();
    this.drawEnabled();
};

SpriteCard.prototype.drawBackground = function() {
    if (this._show) {
        this._background.bitmap.blt(this._backgroundImage, 0, 0, 100, 116, 2, 2);
        this._background.bitmap.blt(this._backgroundColor, 0, 0, 100, 30, 2, 88);
    } else {
        this._background.bitmap.blt(this._backgroundVerse, 0, 0, 104, 120, 0, 0);
    }
};

SpriteCard.prototype.drawDisplay = function() {
    let attack = this._attackPoints.padZero(2);
    let health = this._healthPoints.padZero(2);
    
    if (this._show) {
        switch (this._type) {
            case 'POWER_CARD':
                this._background.bitmap.textColor = 'yellow';
                this._background.bitmap.drawText('Power', 2, 88, 100, 30, 'center');
                break;
            case 'BATTLE_CARD':
                this._background.bitmap.textColor = 'white';
                this._background.bitmap.drawText(attack + "/" + health, 2, 88, 100, 30, 'center');
                break;
            default:
                throw new Error('This Card not type');
        }
    }
};

SpriteCard.prototype.drawSelect = function() {
    if (this.isSelected()) {
        this._background.bitmap.blt(this._selectBorder, 0, 0, 104, 120, 0, 0);
    } else {
        this._background.bitmap.blt(this._borderStand, 0, 0, 104, 120, 0, 0);
    }
};

SpriteCard.prototype.drawEffect = function() {
    if (this.isEffect()) {
        this._background.bitmap.blt(this._effectIcon, 0, 0, 13, 22, 10, 10);
    }
};

SpriteCard.prototype.drawBlock = function() {
    if (this.isBlock()) {
        this._background.bitmap.blt(this._blockIcon, 0, 0, 13, 22, 10, 60);
    }
};

SpriteCard.prototype.drawEnabled = function() {
    if (this.isEnabled()) {
        this._background.setColorTone([0, 0, 0, 0]);
    } else {
        this._background.setColorTone([0, 0, 0, 125]);
    }
};

SpriteCard.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateActionMove();
    this.updateOpening();
    this.updateMove();
    this.updatePoints();
    this.updateChoice();
    this.updateConfirm();
};

SpriteCard.prototype.updateActionMove = function() {
    if (this.hasSequence()) {
        if (this.voidFrameMove()) {
            this.actionMove(this._sequence.shift());
        }
    }
};

SpriteCard.prototype.updateOpening = function() {
    if (this.scale.x === 1 && this.isClose()) {
        this._openness = true;
    }else if (this.scale.x === 0 && this.isOpen()) {
        this._openness = false;
    }
};

SpriteCard.prototype.updateMove = function() {
    if (this.hasFrameMove()) {
        this.updateX();
        this.updateY();
        this.updateScaleX();
        this.updateScaleY();
        this._frameMove--;
    }
};

SpriteCard.prototype.updatePoints = function() {
    if (this.isUpdatePoints() && this.isOpen()) {
        if (this.voidFrameMove()) {
            this.refreshPoints();
            this._framePoints--;
        }
    }
};

SpriteCard.prototype.updateChoice = function() {
    if (this.isLight() && this.isOpen()) {
        this._lightBorder.opacity = 200;
        this._flashDelay++
        if (this._flashDelay > 20) {
            this._lightBorder.startAnimation($dataAnimations[122]);
            this._flashDelay = 0;
        }
    } else {
        if (this._lightBorder.opacity || this.isNoConfirm()) {
            this._lightBorder.opacity = 0;
            this._flashDelay = 0;
        }
    }
};

SpriteCard.prototype.updateConfirm = function() {
    if (this.isConfirmed() && this.isOpen()) {
        this._confirmBorder.opacity = 200;
        this._flashDelay++
        if (this._flashDelay > 20) {
            this._confirmBorder.startAnimation($dataAnimations[122]);
            this._flashDelay = 0;
        }
    } else {
        if (this._confirmBorder.opacity || this.isUnlit()) {
            this._confirmBorder.opacity = 0;
            this._flashDelay = 0;
        }
    }
};

SpriteCard.prototype.refreshPoints = function() {
    this._attackPoints = this.updateAttackPoints();
    this._healthPoints = this.updateHealthPoints();
    this.refresh();
};

SpriteCard.prototype.updateAttackPoints = function() {
	if (this.isUpdateAttackPoints()) {
        this._framePoints = this.setFrameAttackPoints();
        return parseInt((this._attackPoints * (this._framePoints - 1) + this._targetAttackPoints) / this._framePoints, 10);
    }
    return this._attackPoints;
};

SpriteCard.prototype.updateHealthPoints = function() {
	if (this.isUpdateHealthPoints()) {
        this._framePoints = this.setFrameHealthPoints();
        return parseInt((this._healthPoints * (this._framePoints - 1) + this._targetHealthPoints) / this._framePoints, 10);
    }
    return this._healthPoints;
};

SpriteCard.prototype.setFrameAttackPoints = function() {
    return parseInt(Math.abs(this._attackPoints - this._targetAttackPoints) / 1);
};

SpriteCard.prototype.setFrameHealthPoints = function() {
    return parseInt(Math.abs(this._healthPoints - this._targetHealthPoints) / 1);
};

SpriteCard.prototype.updateX = function() {
	if (this.isUpdateMoveX()) {
		this.x = (this.x * (this._frameMove - 1) + this._targetX) / this._frameMove;
	}
};

SpriteCard.prototype.updateY = function() {
	if (this.isUpdateMoveY()) {
		this.y = (this.y * (this._frameMove - 1) + this._targetY) / this._frameMove;
	}
};

SpriteCard.prototype.updateScaleX = function() {
	if (this.isUpdateScaleX()) {
		this.scale.x  = (this.scale.x  * (this._frameMove - 1) + this._targetScaleX)  / this._frameMove;
	}
};

SpriteCard.prototype.updateScaleY = function() {
	if (this.isUpdateScaleY()) {
        this.scale.y  = (this.scale.y  * (this._frameMove - 1) + this._targetScaleY)  / this._frameMove;
	}
};

SpriteCard.prototype.isUpdateMoveX = function() {
    return this.x !== this._targetX;
};

SpriteCard.prototype.isUpdateMoveY = function() {
    return this.y !== this._targetY;
};

SpriteCard.prototype.isUpdateScaleX = function() {
    return this.scale.x !== this._targetScaleX;
};

SpriteCard.prototype.isUpdateScaleY = function() {
    return this.scale.y !== this._targetScaleY;
};

SpriteCard.prototype.isUpdatePoints = function() {
    return this.isUpdateAttackPoints() || this.isUpdateHealthPoints();
};

SpriteCard.prototype.isUpdateAttackPoints = function() {
    return this._attackPoints !== this._targetAttackPoints;
};

SpriteCard.prototype.isUpdateHealthPoints = function() {
    return this._healthPoints !== this._targetHealthPoints;
};

SpriteCard.prototype.hasSequence = function() {
    return this._sequence.length;
};

SpriteCard.prototype.setActions = function(actions) {
    if (Array.isArray(actions) === false) {
        if (actions) {
            actions = [actions];
        }else{
            actions = [];
        }
    }
    
    for (let index = 0; index < actions.length; index++) {
        this._sequence.push(actions[index]);
    }
};

SpriteCard.prototype.actionMove = function(action) {
    switch (action.type) {
        case 'POSITION_BATTLEFIELD':
            this.setPositionBattlefield(action.index);
            break;
        case 'POSITION_HAND':
            this.setPositionHand();
            break;
        case 'POSITION_POWERFIELD':
            this.setPositionPowerfield();
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
            this.updateOpening();
            this.open();
            break;
        case 'CLOSE':
            this.updateOpening();
            this.close();
            break;
        case 'TO_TURN':
            this._show = this.displaySwitch();
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
        case 'LIGHT':
            this.light();
            break;
        case 'UNLIT':
            this.unlit();
            break;
        case 'SELECT':
            this.select();
            break;
        case 'UNSELECT':
            this.unselect();
            break;
        case 'CONFIRM':
            this.confirm();
            break;
        case 'UNCONFIRM':
            this.unconfirm();
            break;
        case 'ENABLE':
            this.enable();
            break;
        case 'DISABLE':
            this.disable();
            break;
        case 'EFFECT':
            this.effect();
            break;
        case 'UNEFFECT':
            this.uneffect();
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
    this._frameMove = action.frame || 1;
};

SpriteCard.prototype.setPositionBattlefield = function(index) {
    this._targetX = 50 + (104 * index);
    this._targetY = 0;
};

SpriteCard.prototype.setPositionHand = function() {
    this._targetX = 850;
    this._targetY = 0;
};

SpriteCard.prototype.setPositionPowerfield = function() {
    this._targetX = 658;
    this._targetY = 0;
};

SpriteCard.prototype.setPositionCollection = function(index, length) {
    let paddind = length > 6 ? (624 / length - 1) * index : 104 * index;

    this._targetX = 50 + paddind;
    this._targetY = 0;
};

SpriteCard.prototype.moveField = function(index) {
    this._targetX = 0 + (104 * index);
    this._targetY = 0;
    this._targetScaleX = 1;
    this._targetScaleY = 1;
};

SpriteCard.prototype.moveHand = function() {
    this._targetX = 816;
    this._targetY = 0;
};

SpriteCard.prototype.moveAttack = function(target) {
    this._targetX = 0 + (52 * target);
    if (this._player) {
        this._targetY = this.y - 256;
    } else {
        this._targetY = this.y + 256;
    }
};

SpriteCard.prototype.open = function() {
    if (this.isClose()) {
        this._targetX = this.x - 50;
        this._targetScaleX = 1;
    }
};

SpriteCard.prototype.close = function() {
    if (this.isOpen()) {
        this._targetX = this.x + 50;
        this._targetScaleX = 0;
    }
};

SpriteCard.prototype.plus = function(times) {
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

SpriteCard.prototype.less = function(times) {
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

SpriteCard.prototype.up = function(times) {
    let lessCoor = 0;

    for (let index = 0; index < times; index++) {
        lessCoor += 16;
    }

    this._targetY = this.y - lessCoor;
};

SpriteCard.prototype.down = function(times) {
    let plusCoor = 0;

    for (let index = 0; index < times; index++) {
        plusCoor += 16;
    }

    this._targetY = this.y + plusCoor;
};

SpriteCard.prototype.left = function(times) {
    let lessCoor = 0;

    for (let index = 0; index < times; index++) {
        lessCoor += 16;
    }

    this._targetX = this.x - lessCoor;
};

SpriteCard.prototype.right = function(times) {
    let plusCoor = 0;

    for (let index = 0; index < times; index++) {
        plusCoor += 16;
    }

    this._targetX = this.x + plusCoor;
};

SpriteCard.prototype.setAttack = function(points = this._attackPoints) {
    if (points < 0) points = 0;
    if (points > 99) points = 99;
    this._targetAttackPoints = points;
};

SpriteCard.prototype.setHealth = function(points = this._healthPoints) {
    if (points < 0) points = 0;
    if (points > 99) points = 99;
    this._targetHealthPoints = points;
};
