function SpritesetCardBattle() {
    this.initialize.apply(this, arguments);
}

SpritesetCardBattle.prototype.constructor = SpritesetCardBattle;

SpritesetCardBattle.prototype.initialize = function () {
    this.createSprites();
};

SpritesetCardBattle.prototype.createSprites = function () {
    this._background = new SpriteBackground();
    this._opening = new SpriteOpening();
    this._challenger = new SpriteChallenger();
    this._chooseFolder = new SpriteChooseFolder();
    this._luckyGame = new SpriteLuckyGame();
    this._battlefield = new SpriteBattlefield();
    this.start();
};

SpritesetCardBattle.prototype.start = function () {
    this._background.movePosition('down-right');
};

SpritesetCardBattle.prototype.layers = function () {
    return [
        this._background,
        this._opening,
        this._challenger,
        this._chooseFolder,
        this._luckyGame,
        this._battlefield
    ]
};

SpritesetCardBattle.prototype.showBackground = function () {
    this._background.show();
};

SpritesetCardBattle.prototype.showOpening = function () {
    this._opening.show();
};

SpritesetCardBattle.prototype.showChallenger = function () {
    this._challenger.show();
    this._challenger.openWindows();
};

SpritesetCardBattle.prototype.showChooseFolder = function () {
    this._chooseFolder.show();
    this._chooseFolder.openWindows();
};

SpritesetCardBattle.prototype.showLuckyGame = function () {
    this._luckyGame.setup();
    this._luckyGame.show();
    this._luckyGame.openCards();
};

SpritesetCardBattle.prototype.showBattlefield = function () {
    this._battlefield.show();
};

SpritesetCardBattle.prototype.openWindowPhaseStart = function () {
    let { phaseStart } = this._battlefield.windowProps();
    this._battlefield.openWindows(phaseStart);
};

SpritesetCardBattle.prototype.openWindowPhaseDraw = function () {
    let { phaseDraw } = this._battlefield.windowProps();
    this._battlefield.openWindows(phaseDraw);
};

SpritesetCardBattle.prototype.openWindowPhaseLoad = function () {
    let { phaseLoad } = this._battlefield.windowProps();
    this._battlefield.openWindows(phaseLoad);
};

SpritesetCardBattle.prototype.openWindowPhaseSummon = function () {
    let { phaseSummon } = this._battlefield.windowProps();
    this._battlefield.openWindows(phaseSummon);
};

SpritesetCardBattle.prototype.isHideBackground = function () {
    return this._background.isHidden();
};

SpritesetCardBattle.prototype.isHideOpening = function () {
    return this._opening.isHidden();
};

SpritesetCardBattle.prototype.isHideChallenger = function () {
    return this._challenger.isHidden();
};

SpritesetCardBattle.prototype.isHideChooseFolder = function () {
    return this._chooseFolder.isHidden();
};

SpritesetCardBattle.prototype.isHideLuckyGame = function () {
    return this._luckyGame.isHidden();
};

SpritesetCardBattle.prototype.isHideBattlefield = function () {
    return this._battlefield.isHidden();
};

SpritesetCardBattle.prototype.isHideWindowPhaseStart = function () {
    let { phaseStart } = this._battlefield.windowProps();
    return this._battlefield.isHideWindow(phaseStart);
};

SpritesetCardBattle.prototype.isHideWindowPhaseDraw = function () {
    let { phaseDraw } = this._battlefield.windowProps();
    return this._battlefield.isHideWindow(phaseDraw);
};

SpritesetCardBattle.prototype.isHideWindowPhaseLoad = function () {
    let { phaseLoad } = this._battlefield.windowProps();
    return this._battlefield.isHideWindow(phaseLoad);
};

SpritesetCardBattle.prototype.isHideWindowPhaseSummon = function () {
    let { phaseSummon } = this._battlefield.windowProps();
    return this._battlefield.isHideWindow(phaseSummon);
};

SpritesetCardBattle.prototype.isHideWindowPhaseCompile = function () {
    let { phaseCompile } = this._battlefield.windowProps();
    return this._battlefield.isHideWindow(phaseCompile);
};

SpritesetCardBattle.prototype.isHideWindowPhaseBattle = function () {
    let { phaseBattle } = this._battlefield.windowProps();
    return this._battlefield.isHideWindow(phaseBattle);
};

SpritesetCardBattle.prototype.isDisabledBackground = function () {
    return !this._background.isActive();
};

SpritesetCardBattle.prototype.isDisabledOpening = function () {
    return !this._opening.isActive();
};

SpritesetCardBattle.prototype.isDisabledChallenger = function () {
    return !this._challenger.isActive();
};

SpritesetCardBattle.prototype.isDisabledChooseFolder = function () {
    return !this._chooseFolder.isActive();
};

SpritesetCardBattle.prototype.isDisabledLuckyGame = function () {
    return !this._luckyGame.isActive();
};

SpritesetCardBattle.prototype.isDisabledBattlefield = function () {
    return !this._battlefield.isActive();
};

SpritesetCardBattle.prototype.isDisableWindowPhaseStart = function () {
    let { phaseStart } = this._battlefield.windowProps();
    return this._battlefield.isDisableWindow(phaseStart);
};

SpritesetCardBattle.prototype.isDisableWindowPhaseDraw = function () {
    let { phaseDraw } = this._battlefield.windowProps();
    return this._battlefield.isDisableWindow(phaseDraw);
};

SpritesetCardBattle.prototype.isDisableWindowPhaseLoad = function () {
    let { phaseLoad } = this._battlefield.windowProps();
    return this._battlefield.isDisableWindow(phaseLoad);
};

SpritesetCardBattle.prototype.isDisableWindowPhaseSummon = function () {
    let { phaseSummon } = this._battlefield.windowProps();
    return this._battlefield.isDisableWindow(phaseSummon);
};

SpritesetCardBattle.prototype.isDisableWindowPhaseCompile = function () {
    let { phaseCompile } = this._battlefield.windowProps();
    return this._battlefield.isDisableWindow(phaseCompile);
};

SpritesetCardBattle.prototype.isDisableWindowPhaseBattle = function () {
    let { phaseBattle } = this._battlefield.windowProps();
    return this._battlefield.isDisableWindow(phaseBattle);
};

SpritesetCardBattle.prototype.luckyGameResult = function () {
    return this._luckyGame.getGameResult();
};

SpritesetCardBattle.prototype.IsMoveInBattlegrounds = function () {
    return this.IsMoveInPlayerBattleground() && this.IsMoveInEnemyBattleground();
};

SpritesetCardBattle.prototype.IsMoveInPlayerBattleground = function () {
    let { battleground } = this._battlefield.playerProps();
    return this._battlefield.IsMoveIn(battleground);
};

SpritesetCardBattle.prototype.IsMoveInEnemyBattleground = function () {
    let { battleground } = this._battlefield.enemyProps();
    return this._battlefield.IsMoveIn(battleground);
};

SpritesetCardBattle.prototype.IsMoveOutBattlegrounds = function () {
    return this.IsMoveOutPlayerBattleground() && this.IsMoveOutEnemyBattleground();
};

SpritesetCardBattle.prototype.IsMoveOutPlayerBattleground = function () {
    let { battleground } = this._battlefield.playerProps();
    return this._battlefield.IsMoveOut(battleground);
};

SpritesetCardBattle.prototype.IsMoveOutEnemyBattleground = function () {
    let { battleground } = this._battlefield.enemyProps();
    return this._battlefield.IsMoveOut(battleground);
};

SpritesetCardBattle.prototype.moveInPlayerBattlefield = function () {
    let { battleground, trash, score } = this._battlefield.playerProps();
    this._battlefield.moveIn(battleground);
    this._battlefield.moveIn(trash);
    this._battlefield.moveIn(score);
};

SpritesetCardBattle.prototype.moveInPlayerBattleground = function () {
    let { battleground } = this._battlefield.playerProps();
    this._battlefield.moveIn(battleground);
};

SpritesetCardBattle.prototype.moveInEnemyBattlefield = function () {
    let { battleground, trash, score } = this._battlefield.enemyProps();
    this._battlefield.moveIn(battleground);
    this._battlefield.moveIn(trash);
    this._battlefield.moveIn(score);
};

SpritesetCardBattle.prototype.moveInEnemyBattleground = function () {
    let { battleground } = this._battlefield.enemyProps();
    this._battlefield.moveIn(battleground);
};

SpritesetCardBattle.prototype.moveOutPlayerBattlefield = function () {
    let { battleground, trash, score } = this._battlefield.playerProps();
    this._battlefield.moveOut(battleground);
    this._battlefield.moveOut(trash);
    this._battlefield.moveOut(score);
};

SpritesetCardBattle.prototype.moveOutEnemyBattlefield = function () {
    let { battleground, trash, score } = this._battlefield.enemyProps();
    this._battlefield.moveOut(battleground);
    this._battlefield.moveOut(trash);
    this._battlefield.moveOut(score);
};

SpritesetCardBattle.prototype.refreshPlayerFieldCollection = function () {
    let { fieldCollection } = this._battlefield.playerProps();
    this._battlefield.refreshCollection(fieldCollection, CardBattleManager.getHand('player'));
};

SpritesetCardBattle.prototype.refreshEnemyFieldCollection = function () {
    let { fieldCollection } = this._battlefield.enemyProps();
    this._battlefield.refreshCollection(fieldCollection, CardBattleManager.getHand('enemy'));
};

SpritesetCardBattle.prototype.showPlayerFieldCollection = function (Range) {
    let { fieldCollection } = this._battlefield.playerProps();
    this._battlefield.showCollection(fieldCollection, Range);
};

SpritesetCardBattle.prototype.showEnemyFieldCollection = function (Range) {
    let { fieldCollection } = this._battlefield.enemyProps();
    this._battlefield.showCollection(fieldCollection, Range);
};

SpritesetCardBattle.prototype.toTurnPlayerCollection = function (Range) {
    let { fieldCollection } = this._battlefield.playerProps();
    this._battlefield.toTurnCollection(fieldCollection, Range);
};

SpritesetCardBattle.prototype.flashPlayerCollection = function (Range) {
    let { fieldCollection } = this._battlefield.playerProps();
    this._battlefield.flashCollection(fieldCollection, Range);
};

SpritesetCardBattle.prototype.flashEnemyCollection = function (Range) {
    let { fieldCollection } = this._battlefield.enemyProps();
    this._battlefield.flashCollection(fieldCollection, Range);
};

SpritesetCardBattle.prototype.closePlayerFieldCollection = function (Range) {
    let { fieldCollection } = this._battlefield.playerProps();
    this._battlefield.closeCollection(fieldCollection, Range);
};

SpritesetCardBattle.prototype.closeEnemyFieldCollection = function (Range) {
    let { fieldCollection } = this._battlefield.enemyProps();
    this._battlefield.closeCollection(fieldCollection, Range);
};

SpritesetCardBattle.prototype.refreshPlayerBattleField = function () {
    let player = 'player';
    let Colors = CardBattleManager.getColors(player);
    let pack = CardBattleManager.getPack(player);
    let hand = CardBattleManager.getHand(player);
    let { battleground } = this._battlefield.playerProps();
    
    this._battlefield.refreshBattlePoints(battleground, Colors, pack, hand);
};

SpritesetCardBattle.prototype.refreshEnemyBattleField = function () {
    let player = 'enemy';
    let Colors = CardBattleManager.getColors(player);
    let pack = CardBattleManager.getPack(player);
    let hand = CardBattleManager.getHand(player);
    let { battleground } = this._battlefield.enemyProps();
    
    this._battlefield.refreshBattlePoints(battleground, Colors, pack, hand);
};

SpritesetCardBattle.prototype.stopMoveCards = function () {
    return this.stopMovePlayerFieldCollect() && this.stopMoveEnemyFieldCollect();
};

SpritesetCardBattle.prototype.stopMovePlayerFieldCollect = function () {
    let { fieldCollection } = this._battlefield.playerProps();
    return this._battlefield.isStopMovementCollection(fieldCollection)  
};

SpritesetCardBattle.prototype.stopMoveEnemyFieldCollect = function () {
    let { fieldCollection } = this._battlefield.enemyProps();
    return this._battlefield.isStopMovementCollection(fieldCollection)  
};

SpritesetCardBattle.prototype.isOpenAlertLoadWindow = function () {
    let { alertLoad } = this._battlefield.windowProps();
    return this._battlefield.isOpenWindow(alertLoad);
}

SpritesetCardBattle.prototype.isOpenAlertCompileWindow = function () {
    let { alertCompile } = this._battlefield.windowProps();
    return this._battlefield.isOpenWindow(alertCompile);
}

SpritesetCardBattle.prototype.isOpenAlertCardBattleWindow = function () {
    let { alertCardBattle } = this._battlefield.windowProps();
    return this._battlefield.isOpenWindow(alertCardBattle);
}

SpritesetCardBattle.prototype.isOpenAlertNextSetWindow = function () {
    let { alertNextSet } = this._battlefield.windowProps();
    return this._battlefield.isOpenWindow(alertNextSet);
}

SpritesetCardBattle.prototype.openAlertLoadWindow = function () {
    let { alertLoad } = this._battlefield.windowProps();
    return this._battlefield.openWindow(alertLoad);
};

SpritesetCardBattle.prototype.openAlertCompileWindow = function () {
    let { alertCompile } = this._battlefield.windowProps();
    return this._battlefield.openWindow(alertCompile);
};

SpritesetCardBattle.prototype.openAlertCardBattleWindow = function () {
    let { alertCardBattle } = this._battlefield.windowProps();
    return this._battlefield.openWindow(alertCardBattle);
};

SpritesetCardBattle.prototype.openAlertNextSetWindow = function () {
    let { alertNextSet } = this._battlefield.windowProps();
    return this._battlefield.openWindow(alertNextSet);
};

SpritesetCardBattle.prototype.closeAlertLoadWindow = function () {
    let { alertLoad } = this._battlefield.windowProps();
    return this._battlefield.closeWindow(alertLoad);
};

SpritesetCardBattle.prototype.closeAlertCompileWindow = function () {
    let { alertCompile } = this._battlefield.windowProps();
    return this._battlefield.closeWindow(alertCompile);
};

SpritesetCardBattle.prototype.closeAlertCardBattleWindow = function () {
    let { alertCardBattle } = this._battlefield.windowProps();
    return this._battlefield.closeWindow(alertCardBattle);
};

SpritesetCardBattle.prototype.closeAlertNextSetWindow = function () {
    let { alertNextSet } = this._battlefield.windowProps();
    return this._battlefield.closeWindow(alertNextSet);
};

SpritesetCardBattle.prototype.openOptionLoadWindow = function () {
    let { optionLoad } = this._battlefield.windowProps();
    return this._battlefield.openWindows(optionLoad);
};

SpritesetCardBattle.prototype.closeOptionLoadWindow = function () {
    let { optionLoad } = this._battlefield.windowProps();
    return this._battlefield.closeWindows(optionLoad);
};

SpritesetCardBattle.prototype.setHandlerLoadWindow = function (tag, link) {
    let { optionLoad } = this._battlefield.windowProps();
    this._battlefield.setHandlerWindow(optionLoad, tag, link);
};

SpritesetCardBattle.prototype.showPlayerDisplayPass = function () {
    let { battleground } = this._battlefield.playerProps();
    this._battlefield.showDisplay(battleground);
};

SpritesetCardBattle.prototype.hidePlayerDisplayPass = function () {
    let { battleground } = this._battlefield.playerProps();
    this._battlefield.hideDisplay(battleground);
};

SpritesetCardBattle.prototype.showEnemyDisplayPass = function () {
    let { battleground } = this._battlefield.enemyProps();
    this._battlefield.showDisplay(battleground);
};

SpritesetCardBattle.prototype.hideEnemyDisplayPass = function () {
    let { battleground } = this._battlefield.enemyProps();
    this._battlefield.hideDisplay(battleground);
};
