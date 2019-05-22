function SpriteCard() {
    this.initialize.apply(this, arguments);
}

SpriteCard.prototype = Object.create(Sprite.prototype);
SpriteCard.prototype.constructor = SpriteCard;

SpriteCard.prototype.initialize = function(GameCard) {
    Sprite.prototype.initialize.call(this);
    this._player = GameCard.isPlayer();
    this._attackPoint = GameCard.getAttackPoint();
    this._healthPoint = GameCard.getHealthPoint();
    this._targetAttackPoint = GameCard.getAttackPoint();
    this._targetHealthPoint = GameCard.getHealthPoint();
    this._type = GameCard.getType();
    this._targetX = 0;
    this._targetY = 0;
    this._targetScaleX = 0;
    this._targetScaleY = 1;
    this._framePoints = 0;
    this._frameMove = 0;
    this._openness = false;
    this._show = false;
    this._turn = false;
    this._select = false;
    this._sequence = [];
    this.setup();
    this.create(GameCard);
};

SpriteCard.prototype.setup = function() {
    this.scale.x = 0;
}

SpriteCard.prototype.create = function(GameCard) {
    this.createBackground();
    this.createBackgroundImage(GameCard.getFilename());
    this.createbackgroundVerse();
    this.createBorderStand();
    this.createBorderSelect();
    this.createBackgroundColor(GameCard.getColor());
};

SpriteCard.prototype.createBackground = function() {
    this._background = new Sprite(new Bitmap(104, 120));
    this._background.bitmap.fontSize = 18;
    this.addChild(this._background);
};

SpriteCard.prototype.createBackgroundImage = function(filename) {
    this._backgroundImage = ImageManager.loadCard(filename);
};

SpriteCard.prototype.createbackgroundVerse = function() {
    this._backgroundVerse = ImageManager.loadCard('CardVerse');
};

SpriteCard.prototype.createBorderStand = function() {
    this._borderStand = ImageManager.loadCard('CardStand');
};

SpriteCard.prototype.createBorderSelect = function() {
    this._borderSelect = ImageManager.loadCard('CardSelect');
};

SpriteCard.prototype.createBackgroundColor = function(color) {
    switch (color) {
        case 'white':
            color  = 'rgba(255, 255, 255, 0.7)';
            break;
        case 'red':
            color  = 'rgba(255, 0, 0, 0.7)';
            break;
        case 'green':
            color  = 'rgba(0, 255, 0, 0.7)';
            break;
        case 'blue':
            color  = 'rgba(0, 0, 255, 0.7)';
            break;
        case 'black':
            color  = 'rgba(0, 0, 0, 0.7)';
            break;
        case 'brown':
            color  = 'rgba(139, 69, 19, 0.7)';
            break;
        default:
            color  = 'rgba(255, 255, 255, 0.7)';
            break;
    }

    this._backgroundColor = new Bitmap(100, 30);
    this._backgroundColor.fillAll(color);
};

SpriteCard.prototype.refresh = function() {
    this._background.bitmap.clear();
    this.drawCard();
    this.drawDisplay();
};

SpriteCard.prototype.drawCard = function() {
    if(this._show) {
        this._background.bitmap.blt(this._backgroundImage, 0, 0, 100, 116, 2, 2);
        this._background.bitmap.blt(this._backgroundColor, 0, 0, 100, 30, 2, 88);
    }else{
        this._background.bitmap.blt(this._backgroundVerse, 0, 0, 104, 120, 0, 0);
    }
    
    if(this._select){
        this._background.bitmap.blt(this._borderSelect, 0, 0, 104, 120, 0, 0);
    }else{
        this._background.bitmap.blt(this._borderStand, 0, 0, 104, 120, 0, 0);
    }
};

SpriteCard.prototype.drawDisplay = function() {
    let attack = this._attackPoint.padZero(2);
    let health = this._healthPoint.padZero(2);
    
    if(this._show) {
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

SpriteCard.prototype.actionMove = function(action) {
    let lessCoor = 0;
    let lessScale = 0.0;

    switch (action.target) {
        case 'INIT_POSITION_HAND':
            this.x = 866;
            this._targetX = this.x;
            if(this.isPlayer()) {
                this._targetY = 441;
            }else{
                this._targetY = 65;
            }
            break;
        case 'INIT_POSITION_POWER_FIELD':
                this.x = 658;
                this._targetX = this.x;
                this.y = 260;
                this._targetY = this.y;
                break;
        case 'MOVE_BATTLE_FIELD':
            this._targetX = 49 + (104 * action.index);
            if(this._player) {
                this._targetY = 441;
            }else{
                this._targetY = 65;
            }
            break;
        case 'MOVE_HAND':
            this._targetX = 816;
            if(this._player) {
                this._targetY = 441;
            }else{
                this._targetY = 65;
            }
            break;
        case 'MOVE_POWER_FIELD':
            this._targetX = 252 + (104 * position.index); 
            this._targetY = 260;
            break;
        case 'OPEN_CARD':
            if(this.isClose()) {
                this._targetX = this.x - 50;
                this._targetScaleX = 1;
            }
            break;
        case 'CLOSE_CARD':
            if(this.isOpen()) {
                this._targetX = this.x + 50;
                this._targetScaleX = 0;
            }
            break;
        case 'TURN_CARD':
            this._show = this.displaySwitch();
            break;
        case 'REFRESH_CARD':
            this.refresh();
            break;
        case 'REFRESH_SELECT_CARD':
            this._select = true;
            this.refresh();
            break;
        case 'REFRESH_UNSELECT_CARD':
            this._select = false;
            this.refresh();
            break;
        case 'PLUS_CARD':
            for (let index = 0; index < action.times; index++) {
                lessCoor += 10;
                lessScale += 0.2;
            }

            this._targetX = this.x - lessCoor;
            this._targetY = this.y - lessCoor;
            this._targetScaleX = this.scale.x + lessScale;
            this._targetScaleY = this.scale.y + lessScale;
            break;
        case 'LESS_CARD':
            for (let index = 0; index < action.times; index++) {
                lessCoor += 10;
                lessScale += 0.2;
            }

            this._targetX = this.x + lessCoor;
            this._targetY = this.y + lessCoor;
            this._targetScaleX = this.scale.x - lessScale;
            this._targetScaleY = this.scale.y - lessScale;
            break;
        case 'UP_CARD':
            for (let index = 0; index < action.times; index++) {
                lessCoor += 16;
            }
            this._targetY = this.y - lessCoor;
            break;
        case 'DOWN_CARD':
            for (let index = 0; index < action.times; index++) {
                lessCoor += 16;
            }
            this._targetY = this.y + lessCoor;
            break;
    }
    this._frameMove = action.frame;
};

SpriteCard.prototype.isPlayer = function() {
    return this._player;
};

SpriteCard.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateActionMove();
    this.updateOpening();
    this.updateMove();
    this.updatePoints();
};

SpriteCard.prototype.updateActionMove = function() {
    if(this.hasSequence()){
        if(this.voidFrameMove()) {
            this.actionMove(this._sequence.shift());
        }
    }
};

SpriteCard.prototype.hasSequence = function() {
    return this._sequence.length;
};

SpriteCard.prototype.setAction = function(action) {
    this._sequence.push(action);
};

SpriteCard.prototype.updateOpening = function() {
    if(this.scale.x === 1 && this.isClose()) {
        this._openness = true;
    }else if(this.scale.x === 0 && this.isOpen()){
        this._openness = false;
    }
};

SpriteCard.prototype.updateMove = function() {
    if(this.hasFrameMove()) {
        this.updateCoordX();
        this.updateCoordY();
        this.updateScaleX();
        this.updateScaleY();
        this._frameMove--;
    }
};

SpriteCard.prototype.updatePoints = function() {
    if(this.hasFramePoints()) {
        this.updateAttackPoint();
        this.updateHealthPoint();
        this.refresh();
		this._framePoints--;
	}
};

SpriteCard.prototype.isOpen = function() {
    return this._openness;
};

SpriteCard.prototype.isClose = function() {
    return !this._openness;
};

SpriteCard.prototype.isTurn = function() {
    return this._turn;
};

SpriteCard.prototype.hasFrameMove = function() {
    return this._frameMove;
};

SpriteCard.prototype.voidFrameMove = function() {
    return !this._frameMove;
};

SpriteCard.prototype.displaySwitch = function() {
    return this.isShow() ? false : true;
};

SpriteCard.prototype.isShow = function() {
    return this._show;
};

SpriteCard.prototype.turnStart = function() {
    this._turn = true;
};

SpriteCard.prototype.turnEnd = function() {
    this._turn = false;
};

SpriteCard.prototype.updateCoordX = function() {
	if(this.isUpdateMoveX()) {
		this.x = (this.x * (this._frameMove - 1) + this._targetX) / this._frameMove;
	}
};

SpriteCard.prototype.updateCoordY = function() {
	if(this.isUpdateMoveY()) {
		this.y = (this.y * (this._frameMove - 1) + this._targetY) / this._frameMove;
	}
};

SpriteCard.prototype.updateScaleX = function() {
	if(this.isUpdateScaleX()) {
		this.scale.x  = (this.scale.x  * (this._frameMove - 1) + this._targetScaleX)  / this._frameMove;
	}
};

SpriteCard.prototype.updateScaleY = function() {
	if(this.isUpdateScaleY()) {
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

SpriteCard.prototype.hasFramePoints = function() {
    return this._framePoints;
};

SpriteCard.prototype.updateAttackPoint = function() {
	if(this.isUpdateAttackPoint()) {
        this._attackPoint = parseInt((this._attackPoint * (this._framePoints - 1) + this._targetAttackPoint) / this._framePoints);
    }
};

SpriteCard.prototype.updateHealthPoint = function() {
	if(this.isUpdateHealthPoint()) {
        this._healthPoint = parseInt((this._healthPoint * (this._framePoints - 1) + this._targetHealthPoint) / this._framePoints);
    }
};

SpriteCard.prototype.isUpdateAttackPoint = function() {
    return this._attackPoint !== this._targetAttackPoint;
};

SpriteCard.prototype.isUpdateHealthPoint = function() {
    return this._healthPoint !== this._targetHealthPoint;
};
