function SpriteOpening() {
    this.initialize.apply(this, arguments);
}

SpriteOpening.prototype = Object.create(Sprite.prototype);
SpriteOpening.prototype.constructor = SpriteOpening;

SpriteOpening.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this._previousSceneLayer = new Sprite();
    this._imageLayer = new Sprite();
    this._blackLayer = new Sprite();
    this._imageLayer.opacity = 0;
    this._frameCount = 0;
    this._active = true;
    this.visible = false;
    this.create();
};

SpriteOpening.prototype.isActive = function () {
    return this._active;
};

SpriteOpening.prototype.isShown = function () {
    return this.visible;
};

SpriteOpening.prototype.isHidden = function () {
    return !this.visible;
};

SpriteOpening.prototype.show = function () {
    this.visible = true;
};

SpriteOpening.prototype.hide = function () {
    this.visible = false;
};

SpriteOpening.prototype.enable = function () {
    this._active = true;
};

SpriteOpening.prototype.disable = function () {
    this._active = false;
};

SpriteOpening.prototype.visibility = function () {
    return this.opacity;
};

SpriteOpening.prototype.create = function () {
    this.createSnapForPreviousScene(); 
    this.createImageLayer();
    this.createBlackLayer();
    this.addChildren();
};

SpriteOpening.prototype.createSnapForPreviousScene = function () {
    this._previousSceneLayer.bitmap = SceneManager.backgroundBitmap();
};

SpriteOpening.prototype.createImageLayer = function () {
    this._imageLayer.bitmapCloned = ImageManager.loadPicture('OpeningBackground');
    this._imageLayer.rectangleClear = new Rectangle(0, 0, 816, 624);
};

SpriteOpening.prototype.createBlackLayer = function () {
    this._blackLayer.bitmapBlack = new Bitmap(816, 624);
    this._blackLayer.bitmapBlack.fillAll('black');
    this._blackLayer.rectangleClear = new Rectangle(0, 0, 816, 624);
};

SpriteOpening.prototype.addChildren = function () {
    this.addChild(this._previousSceneLayer);
    this.addChild(this._imageLayer);
    this.addChild(this._blackLayer);
};

SpriteOpening.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (this.isActive()) {
        this.updateOpening();
    }
}

SpriteOpening.prototype.rectWidth = function (Sprite) {
    return Sprite.rectangleClear.width;
};

SpriteOpening.prototype.rectHeight = function (Sprite) {
    return Sprite.rectangleClear.height;
};

SpriteOpening.prototype.rectWidthClosed = function (Sprite) {
    return !Sprite.rectangleClear.width;
};

SpriteOpening.prototype.rectHeightClosed = function (Sprite) {
    return !Sprite.rectangleClear.height;
};

SpriteOpening.prototype.updateOpening = function () {
    let imageLayer = this._imageLayer;
    let backLayer = this._blackLayer;

    //Fechamento retangular da imagem de fundo
    if (this.rectWidth(imageLayer) && this.rectHeight(imageLayer)) {
        this.updateRectclearImage();
        this.refreshRectClearImage();
    }

    //Fechamento horizontal dos retangulos
    if (this.rectHeightClosed(imageLayer) && this.rectWidth(backLayer)) {
        this.updateRectclearBlack();
        this.refreshRectclearBlack();
    }

    //Transição de desaparecer gradualmente
    if (this.rectWidthClosed(backLayer) && this.visibility()) {
        if (this._frameCount > 60) {
            this.removeChild(this._previousSceneLayer);
            this.removeChild(imageLayer);
            this.opacity -= 3;
        }
        if (this.visibility()) {
            this._frameCount++
        } else {
            this._frameCount = 0;
            this.disable();
        }
    }
};

SpriteOpening.prototype.updateRectclearImage = function (time = 4) {
    this._imageLayer.rectangleClear.x += time;
    this._imageLayer.rectangleClear.y += time;
    this._imageLayer.rectangleClear.width += time ? -time * 2 : +time * 2;
    this._imageLayer.rectangleClear.height += time ? -time * 2 : +time * 2;
};

SpriteOpening.prototype.refreshRectClearImage = function () {
    let rect = this._imageLayer.rectangleClear;

    if (this._imageLayer.opacity < 255) {
        this._imageLayer.opacity  += 8;
    }
    
    this._imageLayer.bitmap = new Bitmap(816, 624);
    this._imageLayer.bitmap.blt(this._imageLayer.bitmapCloned, 0, 0, 816, 624, 0, 0);
    this._imageLayer.bitmap.clearRect(rect.x, rect.y, rect.width, rect.height);
};

SpriteOpening.prototype.updateRectclearBlack = function (time = 8) {
    this._blackLayer.rectangleClear.x += time;
    this._blackLayer.rectangleClear.width += time ? -time * 2: +time * 2;
};

SpriteOpening.prototype.refreshRectclearBlack = function () {
    let rect = this._blackLayer.rectangleClear;
    
    this._blackLayer.bitmap = new Bitmap(816, 624);
    this._blackLayer.bitmap.blt(this._blackLayer.bitmapBlack, 0, 0, 816, 624, 0, 0);
    this._blackLayer.bitmap.clearRect(rect.x, rect.y, rect.width, rect.height);
};
