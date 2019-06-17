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

SpriteOpening.prototype.enable = function () {
    this._active = true;
};

SpriteOpening.prototype.disable = function () {
    this._active = false;
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

SpriteOpening.prototype.visibility = function () {
    return this.opacity;
};

SpriteOpening.prototype.create = function () {
    this.snapForPreviousScene(); 
    this.imageLayer();
    this.blackLayer();
    this.addChildren();
};

SpriteOpening.prototype.snapForPreviousScene = function () {
    this._previousSceneLayer.bitmap = SceneManager.backgroundBitmap();
};

SpriteOpening.prototype.imageLayer = function () {
    let imageLayer = this._imageLayer;

    imageLayer.bitmapCloned = ImageManager.loadPicture('OpeningBackground');
    imageLayer.rectangleClear = new Rectangle(0, 0, 816, 624);
};

SpriteOpening.prototype.blackLayer = function () {
    let blackLayer = this._blackLayer;

    blackLayer.bitmapBlack = new Bitmap(816, 624);
    blackLayer.bitmapBlack.fillAll('black');
    blackLayer.rectangleClear = new Rectangle(0, 0, 816, 624);
};

SpriteOpening.prototype.addChildren = function () {
    this.addChildAt(this._previousSceneLayer, 0);
    this.addChildAt(this._imageLayer, 1);
    this.addChildAt(this._blackLayer, 2);
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
    //Fechamento retangular da imagem de fundo
    if (this.rectWidth(this._imageLayer) && this.rectHeight(this._imageLayer)) {
        this.updateRectClearImage();
        this.renderRectClearImage();
    }

    //Fechamento horizontal dos retangulos
    if (this.rectHeightClosed(this._imageLayer) && this.rectWidth(this._blackLayer)) {
        this.updateRectClearBlack();
        this.renderRectClearBlack();
    }

    //Transição de desaparecer gradualmente
    if (this.rectWidthClosed(this._blackLayer) && this.visibility()) {
        if (this._frameCount > 100) {
            this.removeChild(this._previousSceneLayer);
            this.removeChild(this._imageLayer);
            this.opacity -= 2;
        }

        if (!this.visibility()) {
            this._frameCount = 0;
            this.disable();
        }

        this._frameCount++
    }
};

SpriteOpening.prototype.updateRectClearImage = function (time = 2) {
    let imageLayer = this._imageLayer;

    imageLayer.rectangleClear.x += time;
    imageLayer.rectangleClear.y += time;
    imageLayer.rectangleClear.width += time ? -time * 2 : +time * 2;
    imageLayer.rectangleClear.height += time ? -time * 2 : +time * 2;
};

SpriteOpening.prototype.renderRectClearImage = function () {
    let imageLayer = this._imageLayer;
    let rect = this._imageLayer.rectangleClear;

    if (imageLayer.opacity < 255) {
        imageLayer.opacity  += 8;
    }
    
    imageLayer.bitmap = new Bitmap(816, 624);
    imageLayer.bitmap.blt(imageLayer.bitmapCloned, 0, 0, 816, 624, 0, 0);
    imageLayer.bitmap.clearRect(rect.x, rect.y, rect.width, rect.height);
};

SpriteOpening.prototype.updateRectClearBlack = function (time = 6) {
    let blackLayer = this._blackLayer;

    blackLayer.rectangleClear.x += time;
    blackLayer.rectangleClear.width += time ? -time * 2: +time * 2;
};

SpriteOpening.prototype.renderRectClearBlack = function () {
    let blackLayer = this._blackLayer;
    let rect = blackLayer.rectangleClear;
    
    blackLayer.bitmap = new Bitmap(816, 624);
    blackLayer.bitmap.blt(blackLayer.bitmapBlack, 0, 0, 816, 624, 0, 0);
    blackLayer.bitmap.clearRect(rect.x, rect.y, rect.width, rect.height);
};
