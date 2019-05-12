
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
    this._frameCount = 0;
    this.gamePlayerTest();
};

SceneCardBattle.prototype.create = function(){
    Scene_Base.prototype.create.call(this);
    this.createDisplayObjects();
    this.testeCreate();
};

SceneCardBattle.prototype.start = function(){
    Scene_Base.prototype.start.call(this);
};

SceneCardBattle.prototype.update = function(){
    console.log(this._frameCount);
    if(this._frameCount > 0){
        this._frameCount--;
    }
    Scene_Base.prototype.update.call(this);
    this._spriteset.update();
    this.updateIntroduction();
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

SceneCardBattle.prototype.updateIntroduction = function(){
    let spriteset = this._spriteset;
    let windowset = this._windowset;

    if(this._sceneController === 'Start'){
        this._sceneController = 'TransitionInProgress';
        spriteset.enableBackground();
        spriteset.enableTransition();
    }
    if(spriteset.transitionIsFinished() && this._sceneController === 'TransitionInProgress'){
        this._sceneController = 'ChallengerInProgress';
        windowset.changeTextDisplayTitleIntro("Card Battle Challenge");
        windowset.changeTextDisplayTextIntro([
            "Lv 92",
            "Forest Deck"
        ]);
        windowset.openTitleDisplayIntro();
        windowset.openTextDisplayIntro();
    }
    if(this.confirmKey() && this._sceneController === 'ChallengerInProgress'){
        this._sceneController = 'ChallengerClosing'
        windowset.closeTitleDisplayIntro();
        windowset.closeTextDisplayIntro();
        this._frameCount = 60;
    }
    if(this._sceneController === 'ChallengerClosing' && this._frameCount <= 0){
        this._sceneController = 'ChooseAFolderInProgress';
        windowset.changeTextDisplayTitleFolder("Choose a folder");
        windowset.openTitleDisplayFolder();
        windowset.openSelectFolder();
    }
};

SceneCardBattle.prototype.gamePlayerTest = function(){
    $gameCardPlayer.addCardsToStorage({id: 1, amount: 40});
    $gameCardPlayer.addCardsToDeck(
        {
            name: 'Folder 1',
            folder: [{id: 1, amount: 40}]
        }
    , 0);
    $gameCardPlayer.addCardsToDeck(
        {
            name: 'Folder 2',
            folder: [{id: 1, amount: 40}]
        }
    , 1);
    $gameCardPlayer.addCardsToDeck(
        {
            name: 'Folder 3',
            folder: [{id: 1, amount: 40}]
        }
    , 2);
};

SceneCardBattle.prototype.confirmKey = function(){
    return Input.isTriggered('ok') || TouchInput.isTriggered();
};

SceneCardBattle.prototype.testeCreate = function(){
    
}