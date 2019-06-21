function SpriteBackground() {
    this.initialize.apply(this, arguments);
}

SpriteBackground.prototype = Object.create(Sprite.prototype);
SpriteBackground.prototype.constructor = SpriteBackground;

SpriteBackground.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this._tiles = [];
    this._speed = 1;
    this._targetX = 0;
    this._targetY = 0;
    this._active = true;
    this.visible = false;
    this.createTiles();
};

SpriteBackground.prototype.isActive = function () {
    return this._active;
};

SpriteBackground.prototype.isShown = function () {
    return this.visible;
};

SpriteBackground.prototype.isHidden = function () {
    return !this.visible;
};

SpriteBackground.prototype.show = function () {
    this.visible = true;
};

SpriteBackground.prototype.hide = function () {
    this.visible = false;
};

SpriteBackground.prototype.enable = function () {
    this._active = true;
};

SpriteBackground.prototype.disable = function () {
    this._active = false;
};

SpriteBackground.prototype.createTiles = function () {
    this.loadImageTiles();
    this.setPositionTiles();
    this.addChildren();
};

SpriteBackground.prototype.loadImageTiles = function () {
    while (this._tiles.length < 4) {
        this._tiles.push(this.loadImage('GrayField'));
    }
};

SpriteBackground.prototype.loadImage = function (filename) {
    return new Sprite(ImageManager.loadParallax(filename));
};

SpriteBackground.prototype.setPositionTiles = function () {
    // center, left-center, upper, left-upper
    this._tiles[0].move(0, 0, 816, 816);
    this._tiles[1].move(-816, 0, 816, 816);
    this._tiles[2].move(0, -816, 816, 816);
    this._tiles[3].move(-816, -816, 816, 816);
};

SpriteBackground.prototype.addChildren = function () {
    this._tiles.forEach(SpriteTile => {
        this.addChild(SpriteTile);
    });   
};

SpriteBackground.prototype.movePosition = function (movingDirection) {
    let valueX = 0;
    let valueY = 0;

    switch (movingDirection) {
        case 'up': valueY--;
            break;
        case 'right': valueX++;
            break;
        case 'down': valueY++;
            break;
        case 'left': valueX--;
            break;
        case 'up-right': valueX++; valueY--;
            break;
        case 'up-left': valueX--; valueY--;
            break;
        case 'down-right': valueX++; valueY++;
            break;
        case 'down-left': valueX--; valueY++;
            break;
    }

    this._targetX = valueX;
    this._targetY = valueY;
};

SpriteBackground.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (this.isActive() && this.isShown()) {
        this.updateMoveTiles();
    }
};

SpriteBackground.prototype.updateMoveTiles = function () {
    this.children.forEach(SpriteTile => {
        this.limitMoving(SpriteTile);
        this.updateMoving(SpriteTile);
    });
};

SpriteBackground.prototype.limitMoving = function (SpriteTile) {
    if (this._targetX > 0) {
        if (SpriteTile.x >= 816) {
            SpriteTile.x = -816;
        }
    }else{
        if (SpriteTile.x <= -816) {
            SpriteTile.x = 816;
        }
    }
    if (this._targetY > 0) {
        if (SpriteTile.y >= 816) {
            SpriteTile.y = -816;
        }
    }else{
        if (SpriteTile.y <= -816) {
            SpriteTile.y = 816;
        }
    }
};

SpriteBackground.prototype.updateMoving = function (SpriteTile) {
    SpriteTile.x += (this._speed * this._targetX);
    SpriteTile.y += (this._speed * this._targetY);
};
