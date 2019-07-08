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

SpriteBattlefield.prototype.isActive = function () {
    return this._active;
};

SpriteBattlefield.prototype.isShown = function () {
    return this.visible;
};

SpriteBattlefield.prototype.isHidden = function () {
    return !this.visible;
};

SpriteBattlefield.prototype.enable = function () {
    this._active = true;
};

SpriteBattlefield.prototype.show = function () {
    this.visible = true;
};

SpriteBattlefield.prototype.disable = function () {
    this._active = false;
};

SpriteBattlefield.prototype.hide = function () {
    this.visible = false;
};

SpriteBattlefield.prototype.setup = function () {
    this.createBattlegrounds();
    this.createCollections();
    this.createWindows();
    this.addChildren();
};

SpriteBattlefield.prototype.createBattlegrounds = function () {
    this._battleground = {};
    this._trash = {};
    this._score = {};
    this.createPlayerBattlefield();
    this.createEnemyBattlefield();
};

SpriteBattlefield.prototype.createPlayerBattlefield = function () {
    this._battleground.player = new WindowBattleground({ player: true });
    this._trash.player = new WindowTrash({ player: true });
    this._score.player = new WindowScore({ player: true });
};

SpriteBattlefield.prototype.createEnemyBattlefield = function () {
    this._battleground.enemy = new WindowBattleground({ player: false });
    this._trash.enemy = new WindowTrash({ player: false });
    this._score.enemy = new WindowScore({ player: false });
};

SpriteBattlefield.prototype.createCollections = function () {
    this._spriteCollection = {};
    this._spriteCollection.field = {};
    this._spriteCollection.hand = {};
    this.playerFieldCollection();
    this.playerHandCollection();
    this.enemyFieldCollection();
};

SpriteBattlefield.prototype.playerFieldCollection = function () {
    this._spriteCollection.field.player = new SpriteHandlerCollection();
    this._spriteCollection.field.player.x = 48;
    this._spriteCollection.field.player.y = 440;
};

SpriteBattlefield.prototype.playerHandCollection = function () {
    this._spriteCollection.hand.player = new SpriteHandlerCollection();
    this._spriteCollection.hand.player.x = 48;
    this._spriteCollection.hand.player.y = 252;
};

SpriteBattlefield.prototype.enemyFieldCollection = function () {
    this._spriteCollection.field.enemy = new SpriteHandlerCollection();
    this._spriteCollection.field.enemy.x = 48;
    this._spriteCollection.field.enemy.y = 64;
};

SpriteBattlefield.prototype.createWindows = function () {
    this._window = {};
    this._window.alert = {};
    this._window.phase = {};
    this._window.option = {};
    this.createAlertWindows();
    this.createPhaseWindows();
    this.createOptionWindows();
};

SpriteBattlefield.prototype.createAlertWindows = function () {
    this._window.alert.load = new WindowTitle();
    this._window.alert.compile = new WindowTitle();
    this._window.alert.battle = new WindowTitle();
    this._window.alert.nextSet = new WindowTitle();
    this.refreshAlertWindows();
};

SpriteBattlefield.prototype.refreshAlertWindows = function () {
    let fontSize = this._window.alert.load.contents.fontSize;
    let heightWindow = (Graphics.boxHeight / 2) - fontSize;

    this._window.alert.load.changePosition(0, heightWindow);
    this._window.alert.compile.changePosition(0, heightWindow);
    this._window.alert.battle.changePosition(0, heightWindow);
    this._window.alert.nextSet.changePosition(0, heightWindow);
    this._window.alert.load.refreshTitle('Begin Load Phase');
    this._window.alert.compile.refreshTitle('Begin Compile Phase');
    this._window.alert.battle.refreshTitle('Card Battle');
    this._window.alert.nextSet.refreshTitle('Next Set');
};

SpriteBattlefield.prototype.createPhaseWindows = function () {
    this._window.phase.start = new SpritePhase();
    this._window.phase.draw = new SpritePhase();
    this._window.phase.load = new SpritePhase();
    this._window.phase.summon = new SpritePhase();
    this._window.phase.compile = new SpritePhase();
    this._window.phase.battle = new SpritePhase();
    this.refreshPhaseWindows();
};

SpriteBattlefield.prototype.refreshPhaseWindows = function () {
    this.refreshTitles();
    this.refreshTexts();
};

SpriteBattlefield.prototype.refreshTitles = function () {
    this._window.phase.start.refreshTitle('Start Phase');
    this._window.phase.draw.refreshTitle('Draw Phase');
    this._window.phase.load.refreshTitle('Load Phase');
    this._window.phase.summon.refreshTitle('Summon Phase');
    this._window.phase.compile.refreshTitle('Compile Phase');
    this._window.phase.battle.refreshTitle('Battle Phase');
};

SpriteBattlefield.prototype.refreshTexts = function () {
    this._window.phase.start.refreshText('Draw Holy Sword to go first.');
    this._window.phase.draw.refreshText('6 cards will be drawn.');
    this._window.phase.load.refreshText('Select and use a Power Card.');
    this._window.phase.summon.refreshText('Select your Battler');
    this._window.phase.compile.refreshText('Select and use a Power Card.');
    this._window.phase.battle.refreshText('Start Battle!');
};

SpriteBattlefield.prototype.createOptionWindows = function () {
    let decisionOptions = [
        {label: 'Yes', tag: 'OPTION_ACCEPT'},
        {label: 'No', tag: 'OPTION_REFUSE'}
    ];

    this._window.option.load = new SpriteOption(0, 20, 816, decisionOptions);
    this._window.option.compile = new SpriteOption(0, 20, 816, decisionOptions);
    this.refreshOptionWindows();
};

SpriteBattlefield.prototype.refreshOptionWindows = function () {
    let marginLeft = ' ';

    this._window.option.load.refreshTitle(marginLeft + 'Use a Power Card?');
    this._window.option.load.resizeWidthWindows(776);
    this._window.option.load.changePositionTitle(20, Graphics.boxHeight / 2);
    this._window.option.load.changePositionOptions(20, Graphics.boxHeight / 1.7);

    this._window.option.compile.refreshTitle(marginLeft + 'Use a Power Card?');
};

SpriteBattlefield.prototype.addChildren = function () {
    this.addBattleChildren();
    this.addCollectionChildren();
    this.addWindowChildren();
};

SpriteBattlefield.prototype.addBattleChildren = function () {
    this.addChild(this._battleground.player);
    this.addChild(this._trash.player);
    this.addChild(this._score.player);
    this.addChild(this._battleground.enemy);
    this.addChild(this._trash.enemy);
    this.addChild(this._score.enemy);
};

SpriteBattlefield.prototype.addCollectionChildren = function () {
    this.addChild(this._spriteCollection.field.player);
    this.addChild(this._spriteCollection.hand.player);
    this.addChild(this._spriteCollection.field.enemy);
};

SpriteBattlefield.prototype.addWindowChildren = function () {
    this.addChild(this._window.phase.start);
    this.addChild(this._window.phase.draw);
    this.addChild(this._window.phase.load);
    this.addChild(this._window.phase.summon);
    this.addChild(this._window.phase.compile);
    this.addChild(this._window.phase.battle);
    this.addChild(this._window.alert.load);
    this.addChild(this._window.alert.compile);
    this.addChild(this._window.alert.battle);
    this.addChild(this._window.alert.nextSet);
    this.addChild(this._window.option.load);
};

SpriteBattlefield.prototype.showDisplay = function (prop) {
    prop.showDisplay();
};

SpriteBattlefield.prototype.hideDisplay = function (prop) {
    prop.hideDisplay();
};

SpriteBattlefield.prototype.isOpenWindow = function (prop) {
    return prop.openness >= 255;
};

SpriteBattlefield.prototype.isHideWindow = function (prop) {
    return prop.isHidden();
};

SpriteBattlefield.prototype.isDisableWindow = function (prop) {
    return !prop.isActive();
};

SpriteBattlefield.prototype.openWindow = function (prop) {
    prop.open();
};

SpriteBattlefield.prototype.openWindows = function (prop) {
    prop.show();
    prop.openWindows();
};

SpriteBattlefield.prototype.closeWindow = function (prop) {
    prop.close();
};

SpriteBattlefield.prototype.closeWindows = function (prop) {
    prop.closeWindows();
};

SpriteBattlefield.prototype.setHandlerWindow = function (prop, tag, link) {
    prop.setHandler(tag, link);
};

SpriteBattlefield.prototype.IsMoveIn = function (prop) {
    return prop.IsMoveIn();
};

SpriteBattlefield.prototype.IsMoveOut = function (prop) {
    return prop.IsMoveOut();
};

SpriteBattlefield.prototype.moveIn = function (prop) {
    prop.moveIn();
};

SpriteBattlefield.prototype.moveOut = function (prop) {
    prop.moveOut();
};

SpriteBattlefield.prototype.isStopMovementCollection = function (prop) {
    return prop.noWaitingCollection() && prop.voidActions();
};

SpriteBattlefield.prototype.refreshCollection = function (prop, collection) {
    prop.refreshCollections(collection);
    prop.addChildren();
};

SpriteBattlefield.prototype.removeCollection = function (prop) {
    prop.removeChildren();
};

SpriteBattlefield.prototype.showCollection = function (prop, Range) {
    prop.showCollection(Range);
};

SpriteBattlefield.prototype.toTurnCollection = function (prop, Range) {
    prop.toTurnCollection(Range);
};

SpriteBattlefield.prototype.flashCollection = function (prop, Range) {
    prop.flashCollection(Range);
};

SpriteBattlefield.prototype.closeCollection = function (prop, Range) {
    prop.closeCollection(Range)
};

SpriteBattlefield.prototype.refreshBattlePoints = function (prop, Colors, pack, hand) {
    prop.setWhitePoints(Colors.white);
    prop.setBluePoints(Colors.blue);
    prop.setGreenPoints(Colors.green);
    prop.setRedPoints(Colors.red);
    prop.setBlackPoints(Colors.black);
    prop.setPackPoints(pack.length);
    prop.setHandPoints(hand.length);
};

SpriteBattlefield.prototype.windowProps = function () {
    return {
        alertLoad: this._window.alert.load,
        alertCompile: this._window.alert.compile,
        alertCardBattle: this._window.alert.battle,
        alertNextSet: this._window.alert.nextSet,
        phaseStart: this._window.phase.start,
        phaseDraw: this._window.phase.draw,
        phaseLoad: this._window.phase.load,
        phaseSummon: this._window.phase.summon,
        phaseCompile: this._window.phase.compile,
        phaseBattle: this._window.phase.battle,
        optionLoad: this._window.option.load
    }
};

SpriteBattlefield.prototype.playerProps = function () {
    let battleground = this._battleground.player;
    let trash = this._trash.player;
    let score = this._score.player;
    let fieldCollection = this._spriteCollection.field.player;
    let handCollection = this._spriteCollection.hand.player;

    return {
        battleground,
        trash,
        score,
        fieldCollection,
        handCollection,
    }
};

SpriteBattlefield.prototype.enemyProps = function () {
    let battleground = this._battleground.enemy;
    let trash = this._trash.enemy;
    let score = this._score.enemy;
    let fieldCollection = this._spriteCollection.field.enemy;
    let handCollection = this._spriteCollection.hand.enemy;

    return {
        battleground,
        trash,
        score,
        fieldCollection,
        handCollection,
    }
};
