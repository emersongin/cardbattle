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
    this.createPhaseWindows();
    this.createOptionWindows();
    this.createOtherWindows();
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

SpriteBattlefield.prototype.createPhaseWindows = function () {
    this._windowStartPhase = new SpritePhase();
    this._windowDrawPhase = new SpritePhase();
    this._windowLoadPhase = new SpritePhase();
    this._windowSummonPhase = new SpritePhase();
    this._windowCompilePhase = new SpritePhase();
    this._windowBattlePhase = new SpritePhase();
    this.refreshPhaseWindows();
};

SpriteBattlefield.prototype.refreshPhaseWindows = function () {
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

SpriteBattlefield.prototype.createOptionWindows = function () {
    let decisionOptions = [
        {label: 'Yes', tag: 'OPTION_ACCEPT'},
        {label: 'No', tag: 'OPTION_REFUSE'}
    ];

    this._windowOptionLoad = new SpriteOption(0, 20, 816, decisionOptions);
    this._windowOptionCompile = new SpriteOption(0, 20, 816, decisionOptions);
    this.refreshOptionWindows();
};

SpriteBattlefield.prototype.refreshOptionWindows = function () {
    let marginLeft = ' ';

    this._windowOptionLoad.refreshTitle(marginLeft + 'Use a Power Card?');
    this._windowOptionLoad.resizeWidthWindows(776);
    this._windowOptionLoad.changePositionTitle(20, Graphics.boxHeight / 2);
    this._windowOptionLoad.changePositionOptions(20, Graphics.boxHeight / 1.7);

    this._windowOptionCompile.refreshTitle(marginLeft + 'Use a Power Card?');
};

SpriteBattlefield.prototype.createOtherWindows = function () {
    this._windowAlertLoad = new WindowTitle();
    this._windowAlertCompile = new WindowTitle();
    this._windowAlertCardBattle = new WindowTitle();
    this._windowAlertNextSet = new WindowTitle();
    this.refreshAlertWindows();
};

SpriteBattlefield.prototype.refreshAlertWindows = function () {
    let fontSize = this._windowAlertLoad.contents.fontSize;
    let heightWindow = (Graphics.boxHeight / 2) - fontSize;

    this._windowAlertLoad.changePosition(0, heightWindow);
    this._windowAlertCompile.changePosition(0, heightWindow);
    this._windowAlertCardBattle.changePosition(0, heightWindow);
    this._windowAlertNextSet.changePosition(0, heightWindow);
    this._windowAlertLoad.refreshTitle('Begin Load Phase');
    this._windowAlertCompile.refreshTitle('Begin Compile Phase');
    this._windowAlertCardBattle.refreshTitle('Card Battle');
    this._windowAlertNextSet.refreshTitle('Next Set');
};

SpriteBattlefield.prototype.isOpenAlertLoadWindow = function () {
    return this._windowAlertLoad.openness === 255;
};

SpriteBattlefield.prototype.isOpenAlertCompileWindow = function () {
    return this._windowAlertCompile.openness === 255;
};

SpriteBattlefield.prototype.isOpenAlertCardBattleWindow = function () {
    return this._windowAlertCardBattle.openness === 255;
};

SpriteBattlefield.prototype.isOpenAlertNextSetWindow = function () {
    return this._windowAlertNextSet.openness === 255;
};

SpriteBattlefield.prototype.openAlertLoadWindow = function () {
    this._windowAlertLoad.open();
};

SpriteBattlefield.prototype.openAlertCompileWindow = function () {
    this._windowAlertCompile.open();
};

SpriteBattlefield.prototype.openAlertCardBattleWindow = function () {
    this._windowAlertCardBattle.open();
};

SpriteBattlefield.prototype.openAlertNextSetWindow = function () {
    this._windowAlertNextSet.open();
};

SpriteBattlefield.prototype.closeAlertLoadWindow = function () {
    this._windowAlertLoad.close();
};

SpriteBattlefield.prototype.closeAlertCompileWindow = function () {
    this._windowAlertCompile.close();
};

SpriteBattlefield.prototype.closeAlertCardBattleWindow = function () {
    this._windowAlertCardBattle.close();
};

SpriteBattlefield.prototype.closeAlertNextSetWindow = function () {
    this._windowAlertNextSet.close();
};

SpriteBattlefield.prototype.openOptionLoadWindow = function () {
    this._windowOptionLoad.show();
    this._windowOptionLoad.openWindows();
};

SpriteBattlefield.prototype.closeOptionLoadWindow = function () {
    this._windowOptionLoad.closeWindows();
};

SpriteBattlefield.prototype.setHandlerLoadWindow = function (tag, link) {
    this._windowOptionLoad.setHandler(tag, link);
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
    this.addChild(this._windowAlertLoad);
    this.addChild(this._windowAlertCompile);
    this.addChild(this._windowAlertCardBattle);
    this.addChild(this._windowAlertNextSet);
    this.addChild(this._windowOptionLoad);
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

SpriteBattlefield.prototype.IsMoveInPlayerBattleground = function () {
    return this._playerBattleground.IsMoveIn();
};

SpriteBattlefield.prototype.IsMoveOutPlayerBattleground = function () {
    return this._playerBattleground.IsMoveOut();
};

SpriteBattlefield.prototype.IsMoveInEnemyBattleground = function () {
    return this._enemyBattleground.IsMoveIn();
};

SpriteBattlefield.prototype.IsMoveOutEnemyBattleground = function () {
    return this._enemyBattleground.IsMoveOut();
};

SpriteBattlefield.prototype.moveInPlayerBattleground = function () {
    this._playerBattleground.moveIn();
};

SpriteBattlefield.prototype.moveOutPlayerBattleground = function () {
    this._playerBattleground.moveOut();
};

SpriteBattlefield.prototype.moveInEnemyBattleground= function () {
    this._enemyBattleground.moveIn();
};

SpriteBattlefield.prototype.moveOutEnemyBattleground= function () {
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
    return this._playerSpriteCollection.noWaitingCollection() && 
    this._playerSpriteCollection.voidActions();
};

SpriteBattlefield.prototype.stopMoveEnemySpriteCollection = function () {
    return this._enemySpriteCollection.noWaitingCollection() && 
    this._enemySpriteCollection.voidActions();
};

SpriteBattlefield.prototype.showPlayerDisplayPass = function () {
    this._playerBattleground.showDisplay();
};

SpriteBattlefield.prototype.hidePlayerDisplayPass = function () {
    this._playerBattleground.hideDisplay();
};

SpriteBattlefield.prototype.showEnemyDisplayPass = function () {
    this._enemyBattleground.showDisplay();
};

SpriteBattlefield.prototype.hideEnemyDisplayPass = function () {
    this._enemyBattleground.hideDisplay();
};
