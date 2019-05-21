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
    this.createBorder();
    this.createBackgroundColor(GameCard.getColor());
    this._framePoints = 1;
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

SpriteCard.prototype.createBorder = function() {
    this._border = ImageManager.loadCard('CardBorderStand');
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
        this._background.bitmap.blt(this._border, 0, 0, 104, 120, 0, 0);
    }else{
        this._background.bitmap.blt(this._backgroundVerse, 0, 0, 104, 120, 0, 0);
    }
};

SpriteCard.prototype.drawDisplay = function() {
    let attack = this._attackPoint.padZero(2);
    let health = this._healthPoint.padZero(2);
    
    if(this._show) {
        switch (this._type) {
            case 'powerCard':
                this._background.bitmap.textColor = 'yellow';
                this._background.bitmap.drawText('Power', 2, 88, 100, 30, 'center');
                break;
            case 'battleCard':
                this._background.bitmap.textColor = 'white';
                this._background.bitmap.drawText(attack + "/" + health, 2, 88, 100, 30, 'center');
                break;
            default:
                throw new Error('This Card not type');
        }
    }
};

SpriteCard.prototype.setPosition = function(position) {
    switch (position.target) {
        case 'Field':
            this.x = 49 + (104 * position.index); 
            if(this._player) {
                this.y = 441;
            }else{
                this.y = 65;
            }
            break;
        case 'Hand':
            this.x = 816;
            if(this._player) {
                this.y = 441;
            }else{
                this.y = 65;
            }
            break;
        case 'PowerField':
            this.x = 252 + (104 * position.index); 
            this.y = 260;
            break;
        case 'PowerPosition':
            this.x = 608;
            this.y = 260;
            break;
    }

    //Correction to OpenCard();
    this.x = this.x + 50;
    this._targetX = this.x;
    this._targetY = this.y;
    this._frameMove = 1;
};

SpriteCard.prototype.setMove = function(position) {
    switch (position.target) {
        case 'Field':
            this._targetX = 49 + (104 * position.index); 
            if(this._player) {
                this._targetY = 441;
            }else{
                this._targetY = 65;
            }
            break;
        case 'Hand':
            this._targetX = 816;
            if(this._player) {
                this._targetY = 441;
            }else{
                this._targetY = 65;
            }
            break;
        case 'PowerField':
            this._targetX = 252 + (104 * position.index); 
            this._targetY = 260;
            break;
        case 'PowerPosition':
            this._targetX = 608;
            this._targetY = 260;
            break;
    }
    this._frameMove = 10;
};

SpriteCard.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateOpening();
    this.updateTurn();
    this.updateMove();
    this.updatePoints();
};

SpriteCard.prototype.updateOpening = function() {
    if(this.scale.x === 1 && this.isClose()) {
        this._openness = true;
    }else if(this.scale.x === 0 && this.isOpen()){
        this._openness = false;
    }
};

SpriteCard.prototype.updateTurn = function() {
    if(this.isTurn()) {
        if(this.emptyFrameMove() && this.isOpen()) {
            this.closeCard();
        }

        if(this.emptyFrameMove() && this.isClose()) {
            this._show = this.displaySwitch();
            this.refresh();
            this.openCard();
            this.turnEnd();
        }
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

SpriteCard.prototype.emptyFrameMove = function() {
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

SpriteCard.prototype.openCard = function() {
    if(this.isClose()) {
        this._targetX = this.x - 50;
        this._targetScaleX = 1;
        this._frameMove = 10;
    }
};

SpriteCard.prototype.closeCard = function() {
    if(this.isOpen()) {
        this._targetX = this.x + 50;
        this._targetScaleX = 0;
        this._frameMove = 10;
    }
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