function SpriteTransition() {
    this.initialize.apply(this, arguments);
}

SpriteTransition.prototype = Object.create(Sprite.prototype);
SpriteTransition.prototype.constructor = SpriteTransition;

SpriteTransition.prototype.initialize = function() {
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

SpriteTransition.prototype.isActive = function() {
    return this._active;
};

SpriteTransition.prototype.enable = function() {
    this._active = true;
};

SpriteTransition.prototype.disable = function() {
    this._active = false;
};

SpriteTransition.prototype.isShown = function() {
    return this.visible;
};

SpriteTransition.prototype.isHidden = function() {
    return !this.visible;
};

SpriteTransition.prototype.show = function() {
    this.visible = true;
};

SpriteTransition.prototype.hide = function() {
    this.visible = false;
};

SpriteTransition.prototype.create = function() {
    this.snapForPreviousScene(); 
    this.imageLayer();
    this.blackLayer();
    this.addChildren();
};

SpriteTransition.prototype.snapForPreviousScene = function() {
    this._previousSceneLayer.bitmap = SceneManager.backgroundBitmap();
};

SpriteTransition.prototype.imageLayer = function() {
    let imageLayer = this._imageLayer;

    imageLayer.bitmapCloned = ImageManager.loadPicture('IntroTransition1');
    imageLayer.rectangleClear = new Rectangle(0, 0, 816, 624);
};

SpriteTransition.prototype.blackLayer = function() {
    let blackLayer = this._blackLayer;

    blackLayer.bitmapBlack = new Bitmap(816, 624);
    blackLayer.bitmapBlack.fillAll('black');
    blackLayer.rectangleClear = new Rectangle(0, 0, 816, 624);
};

SpriteTransition.prototype.addChildren = function() {
    this.addChildAt(this._previousSceneLayer, 0);
    this.addChildAt(this._imageLayer, 1);
    this.addChildAt(this._blackLayer, 2);
};

SpriteTransition.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this.isActive()) {
        this.updateTransition();
    }
}

SpriteTransition.prototype.updateTransition = function() {
    let rectImageLayer = this._imageLayer.rectangleClear;
    let rectBlackLayer = this._blackLayer.rectangleClear;

    //Fechamento retangular de transição
    if (rectImageLayer.width > 0 && rectImageLayer.height > 0) {
        this.updateRectClearImage();
        this.renderRectClearImage();
    }

    //Fechamento horizontal retangular de transição
    if (rectImageLayer.height <= 0 && rectBlackLayer.width > 0) {
        this.updateRectClearBlack();
        this.renderRectClearBlack();
    }

    //Transição de desaparecer gradualmente
    if (rectBlackLayer.width <= 0 && this.opacity > 0) {
        this._frameCount++

        if (this._frameCount === 1) {
            this.removeChild(this._previousSceneLayer);
            this.removeChild(this._imageLayer);
        }

        if (this._frameCount > 100) {
            this.opacity -= 2;
        }

        if (this.opacity <= 0) {
            this._frameCount = 0;
            this.disable();
        }
    }
};

SpriteTransition.prototype.updateRectClearImage = function(time = 2) {
    let imageLayer = this._imageLayer;

    imageLayer.rectangleClear.x += time;
    imageLayer.rectangleClear.y += time;
    imageLayer.rectangleClear.width += time ? -time * 2 : +time * 2;
    imageLayer.rectangleClear.height += time ? -time * 2 : +time * 2;
};

SpriteTransition.prototype.renderRectClearImage = function() {
    let imageLayer = this._imageLayer;
    let rect = this._imageLayer.rectangleClear;

    if (imageLayer.opacity < 255) {
        imageLayer.opacity  += 8;
    }
    
    imageLayer.bitmap = new Bitmap(816, 624);
    imageLayer.bitmap.blt(imageLayer.bitmapCloned, 0, 0, 816, 624, 0, 0);
    imageLayer.bitmap.clearRect(rect.x, rect.y, rect.width, rect.height);
};

SpriteTransition.prototype.updateRectClearBlack = function(time = 6) {
    let blackLayer = this._blackLayer;

    blackLayer.rectangleClear.x += time;
    blackLayer.rectangleClear.width += time ? -time * 2: +time * 2;
};

SpriteTransition.prototype.renderRectClearBlack = function() {
    let blackLayer = this._blackLayer;
    let rect = blackLayer.rectangleClear;
    
    blackLayer.bitmap = new Bitmap(816, 624);
    blackLayer.bitmap.blt(blackLayer.bitmapBlack, 0, 0, 816, 624, 0, 0);
    blackLayer.bitmap.clearRect(rect.x, rect.y, rect.width, rect.height);
};

SpriteTransition.prototype.isFinished = function() {
    return this._transitionFinished;
};