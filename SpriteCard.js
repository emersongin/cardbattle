function SpriteCard(){
    this.initialize.apply(this, arguments);
}

SpriteCard.prototype = Object.create(Sprite.prototype);
SpriteCard.prototype.constructor = SpriteCard;

SpriteCard.prototype.initialize = function(GameCard){
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(104, 120);
    this._backgroundImage = new Bitmap();
    this._backgroundVerse = new Bitmap();
    this._border = new Bitmap();
    this._backgroundDisplay = new Bitmap(100, 30);
    this._display = new Bitmap(100, 30);
    this._attackPoint = 0;
    this._healthPoint = 0;
    this._type = GameCard.type;
    this.frameUpdate = 0;
    this.frameMove = 0;
    //
    this.openness = false;
    this.upsideUp = false;
    this.turnNow = false;
    //
    this.targetAttackPoint = GameCard.attackPoint;
    this.targetHealthPoint = GameCard.healthPoint;
    //
    this.targetX = 0;
    this.targetY = 0;
    this.scale.x = 0;
    this.targetScaleX = 0;
    this.targetScaleY = 1;
    this.create(GameCard);
};

SpriteCard.prototype.create = function(GameCard){
    this.createBackgroundImage(GameCard.filename);
    this.createbackgroundVerse();
    this.createBackgroundDisplay(GameCard.color);
    this.createBorder();
    this.start();
};

SpriteCard.prototype.createBackgroundImage = function(filename){
    this._backgroundImage = ImageManager.loadCard(filename);
};

SpriteCard.prototype.createbackgroundVerse = function(){
    this._backgroundVerse = ImageManager.loadCard('CardVerse');
};

SpriteCard.prototype.createBackgroundDisplay = function(color){
    switch (color){
        case 'red':
            color  = 'rgba(255, 0, 0, 0.7)';
            break;
        case 'green':
            color  = 'rgba(0, 255, 0, 0.7)';
            break;
        case 'blue':
            color  = 'rgba(0, 0, 255, 0.7)';
            break;
        case 'white':
            color  = 'rgba(255, 255, 255, 0.7)';
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

    this._backgroundDisplay.fillAll(color);
};

SpriteCard.prototype.createBorder = function(){
    this._border = ImageManager.loadCard('CardBorderStand');
};

SpriteCard.prototype.updateDisplay = function(){
    var attack; 
    var health;
    this._display.clear();

    switch (this._type){
        case 'powerCard':
            this._display.fontSize = 18;
            this._display.textColor = 'yellow';
            this._display.drawText("Power", 0, 0, 100, 30, 'center');
            break;
        case 'battleCard':
            attack = this._attackPoint.padZero(2);
            health = this._healthPoint.padZero(2);

			this._display.fontSize = 18;
			this._display.textColor = 'white';
            this._display.drawText(attack + "/" + health, 0, 0, 100, 30, 'center');
            break;
        default:
            throw new Error('This Card not type');
    }
};

SpriteCard.prototype.start = function(){
    this.frameUpdate = 1;
};

SpriteCard.prototype.setPosition = function(position){
    switch (position.target) {
        case 'Player_A':
            this.targetX = 49 + (104 * position.index); 
            this.targetY = 65;
            break;
        case 'Player_B':
            this.targetX = 49 + (104 * position.index); 
            this.targetY = 441;
            break;
        case 'Hand_A':
            this.targetX = 900;
            this.targetY = 65;
            break;
        case 'Hand_B':
            this.targetX = 816; 
            this.targetY = 441;
            break;
    }
    this.frameMove = 10;
};

SpriteCard.prototype.renderCard = function(){
    this.bitmap.clear();

    if(this.upsideUp){
        this.updateDisplay();
        this.bitmap.blt(this._backgroundImage, 0, 0, 100, 116, 2, 2);
        this.bitmap.blt(this._backgroundDisplay, 0, 0, 100, 30, 2, 88);
        this.bitmap.blt(this._border, 0, 0, 104, 120, 0, 0);
        this.bitmap.blt(this._display, 0, 0, 100, 30, 2, 88);
    }else{
        this.bitmap.blt(this._backgroundVerse, 0, 0, 104, 120, 0, 0);
    }

};

SpriteCard.prototype.update = function(){
    Sprite.prototype.update.call(this);
    this.updateRender();
    this.updateTurnCard();
    this.updateMove();
};

SpriteCard.prototype.updateRender = function(){
    if(this.frameUpdate > 0){
        this.updateAttackPoint();
        this.updateHealthPoint();
        this.renderCard();
		this.frameUpdate--;
	}
};

SpriteCard.prototype.updateTurnCard = function(){
    if(this.turnNow){
        if(this.frameMove === 0 && this.openness){
            this.closeCard();
        }

        if(this.frameMove === 0 && !this.openness){
            this.upsideUp ? this.upsideUp = false: this.upsideUp = true;
            
            this.renderCard();
            this.openCard();
            this.turnNow = false;
        }
    }
};

SpriteCard.prototype.updateAttackPoint = function(){
    var frame = this.frameUpdate;
    var attack = this._attackPoint;
    var targetAttack = this.targetAttackPoint;

	if(this._attackPoint != this.targetAttackPoint){
        this._attackPoint = parseInt((attack * (frame - 1) + targetAttack) / frame);
    }
};

SpriteCard.prototype.updateHealthPoint = function(){
    var frame = this.frameUpdate;
    var health = this._healthPoint;
    var targetHealth = this.targetHealthPoint;

	if(this._healthPoint != this.targetHealthPoint){
        this._healthPoint = parseInt((health * (frame - 1) + targetHealth) / frame);
    }
};

SpriteCard.prototype.openCard = function(){
    if(!this.openness){
        this.targetX = this.x - 50;
        this.targetScaleX = 1;
        this.frameMove = 60;
        this.openness = true;
    }
};

SpriteCard.prototype.closeCard = function(){
    if(this.openness){
        this.targetX = this.x + 50;
        this.targetScaleX = 0;
        this.frameMove = 60;
        this.openness = false;
    }
};

SpriteCard.prototype.updateMove = function(){
    if(this.frameMove > 0){
        this.updateCoordX();
        this.updateCoordY();
        this.updateScaleX();
        this.updateScaleY();
        this.frameMove--;
    }
};

SpriteCard.prototype.updateCoordX = function(){
	if(this.x != this.targetX){
		this.x = (this.x * (this.frameMove - 1) + this.targetX) / this.frameMove;
	}
};

SpriteCard.prototype.updateCoordY = function(){
	if(this.y != this.targetY){
		this.y = (this.y * (this.frameMove - 1) + this.targetY) / this.frameMove;
	}
};

SpriteCard.prototype.updateScaleX = function(){
	if(this.scale.x != this.targetScaleX){
		this.scale.x  = (this.scale.x  * (this.frameMove - 1) + this.targetScaleX)  / this.frameMove;
	}
};

SpriteCard.prototype.updateScaleY = function(){
	if(this.scale.y != this.targetScaleY){
        this.scale.y  = (this.scale.y  * (this.frameMove - 1) + this.targetScaleY)  / this.frameMove;
	}
};
