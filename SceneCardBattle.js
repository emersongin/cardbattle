
/*:
 * @plugindesc The scene class of the Card Battle screen.
 * @author Emerson Andrey
 *
 * @help ...
 *
*/

function SceneCardBattle(){
    this.initialize.apply(this, arguments);
}

SceneCardBattle.prototype = Object.create(Scene_Base.prototype);
SceneCardBattle.prototype.constructor = SceneCardBattle;

SceneCardBattle.prototype.initialize = function(){
    Scene_Base.prototype.initialize.call(this);
    this._sceneController = 'Start';
    this.gamePlayerTest();
};

SceneCardBattle.prototype.create = function(){
    Scene_Base.prototype.create.call(this);
    this.createDisplayObjects();
};

SceneCardBattle.prototype.start = function(){
    Scene_Base.prototype.start.call(this);
    this._spriteset.enableBackground();
    this._spriteset.enableTransition();
    this._windowset.changeTextDisplayTitle("Card Battle Challenge");
    this._windowset.changeTextDisplayText("Lv 92");
    this._windowset.openTitleDisplay();
    this._windowset.openTextDisplay();
};

SceneCardBattle.prototype.update = function(){
    Scene_Base.prototype.update.call(this);
    this._spriteset.update();
};

SceneCardBattle.prototype.stop = function(){
    Scene_Base.prototype.stop.call(this);
};

SceneCardBattle.prototype.terminate = function(){
    Scene_Base.prototype.terminate.call(this);
};

SceneCardBattle.prototype.createDisplayObjects = function(){
    this.createSpriteset();
    this.createWindowset();
};

SceneCardBattle.prototype.createSpriteset = function(){
    this._spriteset = new SpritesetCardBattle();
    this._spriteset.layers().forEach(sprite =>{
        this.addChild(sprite);
    })
};

SceneCardBattle.prototype.createWindowset = function(){
    this._windowset = new WindowsetCardBattle();
    this._windowset.layers().forEach(window =>{
        this.addChild(window);
    })
};

SceneCardBattle.prototype.gamePlayerTest = function(){
    $gameCardPlayer.addCardsToStorage({id: 1, amount: 40});
    $gameCardPlayer.addCardsToDeck([{id: 1, amount: 40}], 0);
};