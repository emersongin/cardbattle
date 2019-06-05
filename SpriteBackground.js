function SpriteBackground() {
    this.initialize.apply(this, arguments);
}

SpriteBackground.prototype = Object.create(Sprite.prototype);
SpriteBackground.prototype.constructor = SpriteBackground;

SpriteBackground.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._backgroundTiles = [];
    this._speed = 0.5;
    this._moveX = 0;
    this._moveY = 0;
    this._active = true;
    this.visible = false;
    this.createTiles();
};

SpriteBackground.prototype.isActive = function() {
    return this._active;
};

SpriteBackground.prototype.enable = function() {
    this._active = true;
};

SpriteBackground.prototype.disable = function() {
    this._active = false;
};

SpriteBackground.prototype.isShown = function() {
    return this.visible;
};

SpriteBackground.prototype.isHidden = function() {
    return !this.visible;
};

SpriteBackground.prototype.show = function() {
    this.visible = true;
};

SpriteBackground.prototype.hide = function() {
    this.visible = false;
};

SpriteBackground.prototype.createTiles = function() {
    this.loadTilesImage();
    this.setTilesPosition();
    this.addChildren();
};

SpriteBackground.prototype.loadTilesImage = function() {
    for(var index = 0; index < 4; index++) {
        this._backgroundTiles.push(this.loadImage());
    }
};

SpriteBackground.prototype.loadImage = function() {
    return new Sprite(ImageManager.loadParallax('GrayField'));
};

SpriteBackground.prototype.setTilesPosition = function() {
    this.positionTile(this._backgroundTiles[0], 'center');
    this.positionTile(this._backgroundTiles[1], 'left-center');
    this.positionTile(this._backgroundTiles[2], 'upper');
    this.positionTile(this._backgroundTiles[3], 'left-upper');
};

SpriteBackground.prototype.positionTile = function(tile, position) {
    switch (position) {
        case 'center':
            tile.move(0, 0, 816, 816);
            break;
        case 'left-center':
            tile.move(-816, 0, 816, 816);
            break;
        case 'right-center':
            tile.move(816, 0, 816, 816);
            break;
        case 'upper':
            tile.move(0, -816, 816, 816);
            break;
        case 'left-upper':
            tile.move(-816, -816, 816, 816);
            break;
        case 'right-upper':
            tile.move(816, -816, 816, 816);
            break;
        case 'bottom':
            tile.move(0, 816, 816, 816);
            break;
        case 'left-bottom':
            tile.move(-816, 816, 816, 816);
            break;
        case 'right-bottom':
            tile.move(816, 816, 816, 816);
            break;
        default:
            tile.move(0, 0, 816, 816);
            break;
    }
};

SpriteBackground.prototype.addChildren = function() {
    this._backgroundTiles.forEach(tile => {
        this.addChild(tile);
    });   
};

SpriteBackground.prototype.movePosition = function(typeMove) {
    let valueX = 0;
    let valueY = 0;

    switch (typeMove) {
        case 'up': valueY = -1;
            break;
        case 'right': valueX = 1;
            break;
        case 'down': valueY = 1;
            break;
        case 'left': valueX = -1;
            break;
        case 'up-right': valueX = 1; valueY = -1;
            break;
        case 'up-left': valueX = -1; valueY = -1;
            break;
        case 'down-right': valueX = 1; valueY = 1;
            break;
        case 'down-left': valueX = -1; valueY = 1;
            break;
    }

    this._moveX = valueX;
    this._moveY = valueY;
};

SpriteBackground.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this.isActive() && this.isShown()) {
        this.moveTiles();
    }
};

SpriteBackground.prototype.moveTiles = function() {
    this.children.forEach(tile => {
        this.limitMoving(tile);
        this.refreshMoving(tile);
    });
};

SpriteBackground.prototype.limitMoving = function(tile) {
    if (this._moveX > 0) {
        if (tile.x >= 816) {
            tile.x = -816;
        }
    }else{
        if (tile.x <= -816) {
            tile.x = 816;
        }
    }

    if (this._moveY > 0) {
        if (tile.y >= 816) {
            tile.y = -816;
        }
    }else{
        if (tile.y <= -816) {
            tile.y = 816;
        }
    }
};

SpriteBackground.prototype.refreshMoving = function(tile) {
    tile.x += (this._speed * this._moveX);
    tile.y += (this._speed * this._moveY);
};
