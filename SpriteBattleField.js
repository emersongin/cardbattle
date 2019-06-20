function SpriteBattlefield() {
    this.initialize.apply(this, arguments);
}

SpriteBattlefield.prototype = Object.create(Sprite.prototype);
SpriteBattlefield.prototype.constructor = SpriteBattlefield;

SpriteBattlefield.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this._active = true;
    this.visible = false;
    this.setup();
};

SpriteBattlefield.prototype.setup = function () {
    this.createPlayerZone();
    this.createEnemyZone();
    this.createCollections();
    this.createWindowPhases();
    this.addChildren();
};

SpriteBattlefield.prototype.createPlayerZone = function () {
    this._playerBattleground = new WindowBattleground({ player: true });
    this._playerTrash = new WindowTrash({ player: true });
    this._playerScore = new WindowScore({ player: true });
};

SpriteBattlefield.prototype.createEnemyZone = function () {
    this._enemyBattleground = new WindowBattleground({ player: false });
    this._enemyTrash = new WindowTrash({ player: false });
    this._enemyScore = new WindowScore({ player: false });
};

SpriteBattlefield.prototype.createCollections = function () {
    this.playerCollection();
    this.enemyCollection();
};

SpriteBattlefield.prototype.playerCollection = function () {
    this._playerSpriteCollection = new SpriteCollection();
    this._playerSpriteCollection.x = 48;
    this._playerSpriteCollection.y = 440;
};

SpriteBattlefield.prototype.enemyCollection = function () {
    this._enemySpriteCollection = new SpriteCollection();
    this._enemySpriteCollection.x = 48;
    this._enemySpriteCollection.y = 64;
};

SpriteBattlefield.prototype.getPlayerSpriteCollection = function () {
    return this._playerSpriteCollection;
};

SpriteBattlefield.prototype.getEnemySpriteCollection = function () {
    return this._enemySpriteCollection;
};

SpriteBattlefield.prototype.addAndRefreshSpriteCardPlayer = function (index) {
    let gameHandCollection = CardBattleManager.getPlayerHandCollection();

    this._playerSpriteCollection.addCard(gameHandCollection[index]);
    this._playerSpriteCollection.addSprite(gameHandCollection[index]);
    this._playerSpriteCollection.addChildIndex(index);
};

SpriteBattlefield.prototype.addAndRefreshSpriteCardEnemy = function (index) {
    let gameHandCollection = CardBattleManager.getEnemyHandCollection();

    this._enemySpriteCollection.addCard(gameHandCollection[index]);
    this._enemySpriteCollection.addSprite(gameHandCollection[index]);
    this._enemySpriteCollection.addChildIndex(index);
};

SpriteBattlefield.prototype.refreshPlayerHandSpriteCollection = function () {
    this._playerSpriteCollection.removeChildren();
    this._playerSpriteCollection.refreshCollections(CardBattleManager.getPlayerHandCollection());
    this._playerSpriteCollection.addChildren();
};

SpriteBattlefield.prototype.refreshEnemyHandSpriteCollection = function () {
    this._enemySpriteCollection.removeChildren();
    this._enemySpriteCollection.refreshCollections(CardBattleManager.getEnemyHandCollection());
    this._enemySpriteCollection.addChildren();
};

SpriteBattlefield.prototype.showHandCardsPlayer = function (index) {
    let gameCardCollection = CardBattleManager.getPlayerHandCollection();
    let collection = this._playerSpriteCollection;
    let actions = [];
    
    if (gameCardCollection[index]) {
        actions.push(collection.positionHand(index));
        actions.push(collection.open(index));
        actions.push(collection.moveField(index));
    }

    collection.addActions(actions);
};

SpriteBattlefield.prototype.showHandCardsEnemy = function (index) {
    let gameCardCollection = CardBattleManager.getEnemyHandCollection();
    let collection = this._enemySpriteCollection;
    let actions = [];
    
    if (gameCardCollection[index]) {
        actions.push(collection.positionHand(index));
        actions.push(collection.open(index));
        actions.push(collection.moveField(index));
    }

    collection.addActions(actions);
};

SpriteBattlefield.prototype.closeHandCardsPlayer = function () {
    let gameCardCollection = CardBattleManager.getPlayerHandCollection();
    let collection = this._playerSpriteCollection;
    let actions = [];
    
    gameCardCollection.forEach((GameCard, index) => {
        actions.push(collection.close(index));
    });

    collection.addActions(actions);
};

SpriteBattlefield.prototype.closeHandCardsEnemy = function () {
    let gameCardCollection = CardBattleManager.getEnemyHandCollection();
    let collection = this._enemySpriteCollection;
    let actions = [];
    
    gameCardCollection.forEach((GameCard, index) => {
        actions.push(collection.close(index));
    });

    collection.addActions(actions);
};

SpriteBattlefield.prototype.playerHandCardsToTurn = function (index) {
    let gameCardCollection = CardBattleManager.getPlayerHandCollection();
    let collection = this._playerSpriteCollection;
    let actions = [];

    if (gameCardCollection[index]) {
        actions.push(collection.waitMoment(index, 4));
        actions.push(collection.toTurn(index));
    }

    collection.addActions(actions);
};

SpriteBattlefield.prototype.enemyCardsToTurn = function (index) {
    let gameCardCollection = CardBattleManager.getEnemyHandCollection();
    let collection = this._enemySpriteCollection;
    let actions = [];

    if (gameCardCollection[index]) {
        actions.push(collection.waitMoment(index, 4));
        actions.push(collection.toTurn(index));
    }

    collection.addActions(actions);
};

SpriteBattlefield.prototype.createWindowPhases = function () {
    this._windowStartPhase = new SpritePhase();
    this._windowDrawPhase = new SpritePhase();
    this._windowLoadPhase = new SpritePhase();
    this._windowSummonPhase = new SpritePhase();
    this._windowCompilePhase = new SpritePhase();
    this._windowBattlePhase = new SpritePhase();
    this.refreshWindows();
};

SpriteBattlefield.prototype.refreshWindows = function () {
    this.refreshTitles();
    this.refreshTexts();
};

SpriteBattlefield.prototype.refreshTitles = function () {
    this._windowStartPhase.refreshTitle('Start Phase');
    this._windowDrawPhase.refreshTitle('Draw Phase');
    this._windowLoadPhase.refreshTitle('Load Phase');
    this._windowSummonPhase.refreshTitle('Summon Phase');
    this._windowCompilePhase.refreshTitle('Compile Phase');
    this._windowBattlePhase.refreshTitle('Battle Phase');
};

SpriteBattlefield.prototype.refreshTexts = function () {
    this._windowStartPhase.refreshText('Draw Holy Sword to go first.');
    this._windowDrawPhase.refreshText('6 cards will be drawn.');
    this._windowLoadPhase.refreshText('Select and use a Power Card.');
    this._windowSummonPhase.refreshText('Select your Battler');
    this._windowCompilePhase.refreshText('Select and use a Power Card.');
    this._windowBattlePhase.refreshText('Start Battle!');
};

SpriteBattlefield.prototype.addChildren = function () {
    this.addBattleChildren();
    this.addCollectionChildren();
    this.addWindowChildren();
};

SpriteBattlefield.prototype.addBattleChildren = function () {
    this.addChild(this._playerBattleground);
    this.addChild(this._playerTrash);
    this.addChild(this._playerScore);
    this.addChild(this._enemyBattleground);
    this.addChild(this._enemyTrash);
    this.addChild(this._enemyScore);
};

SpriteBattlefield.prototype.addCollectionChildren = function () {
    this.addChild(this._playerSpriteCollection);
    this.addChild(this._enemySpriteCollection);
};

SpriteBattlefield.prototype.addWindowChildren = function () {
    this.addChild(this._windowStartPhase);
    this.addChild(this._windowDrawPhase);
    this.addChild(this._windowLoadPhase);
    this.addChild(this._windowSummonPhase);
    this.addChild(this._windowCompilePhase);
    this.addChild(this._windowBattlePhase);
};

SpriteBattlefield.prototype.isActive = function () {
    return this._active;
};

SpriteBattlefield.prototype.enable = function () {
    this._active = true;
};

SpriteBattlefield.prototype.disable = function () {
    this._active = false;
};

SpriteBattlefield.prototype.isShown = function () {
    return this.visible;
};

SpriteBattlefield.prototype.isHidden = function () {
    return !this.visible;
};

SpriteBattlefield.prototype.show = function () {
    this.visible = true;
};

SpriteBattlefield.prototype.hide = function () {
    this.visible = false;
};

SpriteBattlefield.prototype.update = function () {
    Sprite.prototype.update.call(this);
};

SpriteBattlefield.prototype.IsMoveInPlayerBackground = function () {
    return this._playerBattleground.IsMoveIn();
};

SpriteBattlefield.prototype.IsMoveOutPlayerBackground = function () {
    return this._playerBattleground.IsMoveOut();
};

SpriteBattlefield.prototype.IsMoveInEnemyBackground = function () {
    return this._enemyBattleground.IsMoveIn();
};

SpriteBattlefield.prototype.IsMoveOutEnemyBackground = function () {
    return this._enemyBattleground.IsMoveOut();
};

SpriteBattlefield.prototype.moveInPlayerBackground = function () {
    this._playerBattleground.moveIn();
};

SpriteBattlefield.prototype.moveOutPlayerBackground = function () {
    this._playerBattleground.moveOut();
};

SpriteBattlefield.prototype.moveInEnemyBackground = function () {
    this._enemyBattleground.moveIn();
};

SpriteBattlefield.prototype.moveOutEnemyBackground = function () {
    this._enemyBattleground.moveOut();
};

SpriteBattlefield.prototype.moveInPlayerTrash = function () {
    this._playerTrash.moveIn();
};

SpriteBattlefield.prototype.moveOutPlayerTrash = function () {
    this._playerTrash.moveOut();
};

SpriteBattlefield.prototype.moveInEnemyTrash = function () {
    this._enemyTrash.moveIn();
};

SpriteBattlefield.prototype.moveOutEnemyTrash = function () {
    this._enemyTrash.moveOut();
};

SpriteBattlefield.prototype.moveInPlayerScore = function () {
    this._playerScore.moveIn();
};

SpriteBattlefield.prototype.moveOutPlayerScore = function () {
    this._playerScore.moveOut();
};

SpriteBattlefield.prototype.moveInEnemyScore = function () {
    this._enemyScore.moveIn();
};

SpriteBattlefield.prototype.moveOutEnemyScore = function () {
    this._enemyScore.moveOut();
};

SpriteBattlefield.prototype.openWindowStartPhase = function () {
    this._windowStartPhase.show();
    this._windowStartPhase.openWindows();
};

SpriteBattlefield.prototype.openWindowDrawPhase = function () {
    this._windowDrawPhase.show();
    this._windowDrawPhase.openWindows();
};

SpriteBattlefield.prototype.openWindowLoadPhase = function () {
    this._windowLoadPhase.show();
    this._windowLoadPhase.openWindows();
};

SpriteBattlefield.prototype.openWindowSummonPhase = function () {
    this._windowSummonPhase.show();
    this._windowSummonPhase.openWindows();
};

SpriteBattlefield.prototype.openWindowCompilePhase = function () {
    this._windowCompilePhase.show();
    this._windowCompilePhase.openWindows();
};

SpriteBattlefield.prototype.openWindowBattlePhase = function () {
    this._windowBattlePhase.show();
    this._windowBattlePhase.openWindows();
};

SpriteBattlefield.prototype.isHideWindowStartPhase = function () {
    return this._windowStartPhase.isHidden();
};

SpriteBattlefield.prototype.isHideWindowDrawPhase = function () {
    return this._windowDrawPhase.isHidden();
};

SpriteBattlefield.prototype.isHideWindowLoadPhase = function () {
    return this._windowLoadPhase.isHidden();
};

SpriteBattlefield.prototype.isHideWindowSummonPhase = function () {
    return this._windowSummonPhase.isHidden();
};

SpriteBattlefield.prototype.isHideWindowCompilePhase = function () {
    return this._windowCompilePhase.isHidden();
};

SpriteBattlefield.prototype.isHideWindowBattlePhase = function () {
    return this._windowBattlePhase.isHidden();
};

SpriteBattlefield.prototype.isDisableWindowStartPhase = function () {
    return !this._windowStartPhase.isActive();
};

SpriteBattlefield.prototype.isDisableWindowDrawPhase = function () {
    return !this._windowDrawPhase.isActive();
};

SpriteBattlefield.prototype.isDisableWindowLoadPhase = function () {
    return !this._windowLoadPhase.isActive();
};

SpriteBattlefield.prototype.isDisableWindowSummonPhase = function () {
    return !this._windowSummonPhase.isActive();
};

SpriteBattlefield.prototype.isDisableWindowCompilePhase = function () {
    return !this._windowCompilePhase.isActive();
};

SpriteBattlefield.prototype.isDisableWindowBattlePhase = function () {
    return !this._windowBattlePhase.isActive();
};

SpriteBattlefield.prototype.addPlayerColor = function (index) {
    let gameCardCollection = CardBattleManager.getPlayerHandCollection();
    let gameCardColor = gameCardCollection[index].getColor();
    let collection = this._playerSpriteCollection;
    let actions = [];
    
    actions.push(collection.waitMoment(index, 8));
    if (gameCardColor !== 'brown') {
        actions.push(collection.flash(index));
        CardBattleManager.setPlayerColors({
            name: gameCardColor,
            value: 1
        });
    }

    collection.addActions(actions);
};

SpriteBattlefield.prototype.addEnemyColor = function (index) {
    let gameCardCollection = CardBattleManager.getEnemyHandCollection();
    let gameCardColor = gameCardCollection[index].getColor();
    let collection = this._enemySpriteCollection;
    let actions = [];
    
    actions.push(collection.waitMoment(index, 8));
    if (gameCardColor !== 'brown') {
        actions.push(collection.flash(index));
        CardBattleManager.setEnemyColors({
            name: gameCardColor,
            value: 1
        });
    }

    collection.addActions(actions);
};

SpriteBattlefield.prototype.refreshPlayerBattlefieldPoints = function () {
    let Colors = CardBattleManager.getPlayerColors();
    let packLength = CardBattleManager.getPlayerPackLength();
    let handLength = CardBattleManager.getPlayerHandLength();

    this._playerBattleground.setWhitePoints(Colors.white);
    this._playerBattleground.setBluePoints(Colors.blue);
    this._playerBattleground.setGreenPoints(Colors.green);
    this._playerBattleground.setRedPoints(Colors.red);
    this._playerBattleground.setBlackPoints(Colors.black);
    this._playerBattleground.setPackPoints(packLength);
    this._playerBattleground.setHandPoints(handLength);
};

SpriteBattlefield.prototype.refreshEnemyBattlefieldPoints = function () {
    let Colors = CardBattleManager.getEnemyColors();
    let packLength = CardBattleManager.getEnemyPackLength();
    let handLength = CardBattleManager.getEnemyHandLength();

    this._enemyBattleground.setWhitePoints(Colors.white);
    this._enemyBattleground.setBluePoints(Colors.blue);
    this._enemyBattleground.setGreenPoints(Colors.green);
    this._enemyBattleground.setRedPoints(Colors.red);
    this._enemyBattleground.setBlackPoints(Colors.black);
    this._enemyBattleground.setPackPoints(packLength);
    this._enemyBattleground.setHandPoints(handLength);
};

SpriteBattlefield.prototype.stopMovePlayerSpriteCollection = function () {
    return this._playerSpriteCollection.voidFramesCollection() && 
    this._playerSpriteCollection.voidActions();
};

SpriteBattlefield.prototype.stopMoveEnemySpriteCollection = function () {
    return this._enemySpriteCollection.voidFramesCollection() && 
    this._enemySpriteCollection.voidActions();
};