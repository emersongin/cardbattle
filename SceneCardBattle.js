
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
    //this.createDisplayObjects();
    this.testeCreate();
};

SceneCardBattle.prototype.start = function(){
    Scene_Base.prototype.start.call(this);
};

SceneCardBattle.prototype.update = function(){
    if(this._frameCount > 0){
        this._frameCount--;
    }
    Scene_Base.prototype.update.call(this);
    // this._spriteset.update();
    // this.updateIntroduction();
    // this.updateChooseFolder();
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
    let control = this._sceneController;

    if(control === 'Start'){
        this._sceneController = 'TransitionInProgress';
        spriteset.enableBackground();
        spriteset.enableTransition();
    }
    if(spriteset.transitionIsFinished() && control === 'TransitionInProgress'){
        this._sceneController = 'ChallengerInProgress';
        windowset.changeTitleIntro("Card Battle Challenge");
        windowset.changeTextIntro([
            "Lv 92",
            "Forest Deck"
        ]);
        windowset.openTitleIntro();
        windowset.openTextIntro();
    }
    if(this.confirmKey() && control === 'ChallengerInProgress'){
        this._sceneController = 'ChallengerClosing';
        this._frameCount = 60;
        windowset.closeTitleIntro();
        windowset.closeTextIntro();
    }

};

SceneCardBattle.prototype.confirmKey = function(){
    return Input.isTriggered('ok') || TouchInput.isTriggered();
};

SceneCardBattle.prototype.updateChooseFolder = function(){
    let spriteset = this._spriteset;
    let windowset = this._windowset;
    let control = this._sceneController;
    let frame = this._frameCount;

    if(control === 'ChallengerClosing' && frame <= 0){
        this._sceneController = 'ChooseAFolderInProgress';
        windowset.changeTitleFolder("Choose a folder");
        windowset.openTitleFolder();
        windowset.openSelectFolder();
    }
}

SceneCardBattle.prototype.gamePlayerTest = function(){
    $gameCardPlayer.addCardsToStorage(new GameCardStored(1, 40));
    $gameCardPlayer.addDeck(new GameFolder('Folder 1', [new GameCardStored(1, 40)]));
};

SceneCardBattle.prototype.testeCreate = function(){
    this.windowTrashPlayer = new WindowTrash(true);
    let windowTrashEnemy = new WindowTrash();

    //windowTrashPlayer.changePosition(Graphics.boxWidth / 4, Graphics.boxHeight / 4 + 104);
    //windowTrashEnemy.changePosition(Graphics.boxWidth / 4, Graphics.boxHeight / 4);

    this.addChild(this.windowTrashPlayer);
    // this.addChild(windowTrashEnemy);

    this.windowTrashPlayer.setPoints();
    this.windowTrashPlayer.open();

    // windowTrashEnemy.setPoints();
    // windowTrashEnemy.open();
}