function CardBattleManager() {
    throw new Error('This is a static class');
}

CardBattleManager.setup = function (args) {
    this.initMembers();
    CardBattleManager.createEnemyDuelist(args[0]);
};

CardBattleManager.initMembers = function () {
    this._phase = 'INITIALIZE';
    this._playerFirst = false;
    this._programCards = [];

    $gameCardPlayer.storageCards(new GameCardStored(3, 40));
    $gameCardPlayer.storageCardsFolder([
        new GameCardStored(1, 10),
        new GameCardStored(2, 10),
        new GameCardStored(3, 20)
    ], 0);
    $gameCardPlayer.storageCardsFolder(new GameCardStored(3, 40), 1);
    $gameCardPlayer.storageCardsFolder(new GameCardStored(3, 40), 2);
};

CardBattleManager.createPlayerDuelist = function (index) {
    this._player = new GameDuelist($gameCardPlayer.createDuelist(index));
};

CardBattleManager.createEnemyDuelist = function (index) {
    this._enemy = new GameDuelist(CardBattleManager.getEnemyDatabase(index));
};

CardBattleManager.getPhase = function () {
    return this._phase;
};

CardBattleManager.isPhase = function (tag) {
    return this._phase === tag;
};

CardBattleManager.getPlayerFirst = function () {
    return this._playerFirst;
};

CardBattleManager.getDuelist = function (player) {
    return this['_' + player];
};

CardBattleManager.isProgramCards = function () {
    return this._programCards.length;
};

CardBattleManager.getEnemyDatabase = function (ID) {
    return $dataCardBattleEnemies[ID];
};

CardBattleManager.setPhase = function (phase) {
    this._phase = phase;
};

CardBattleManager.setPlayerFirst = function (player) {
    this._playerFirst = player;
};

CardBattleManager.getEnemyName = function () {
    return this._enemy.getName();
};

CardBattleManager.getEnemyLevel = function () {
    return this._enemy.getLevel();
};

CardBattleManager.getEnemyFolderName = function () {
    return this._enemy.getFolderName();
};

CardBattleManager.createGameCardCollections = function () {
    this.createPlayerCollection();
    this.createEnemyCollection();
};

CardBattleManager.createPlayerCollection = function () {
    this._player.createPackCollection();
    this._player.randomPackCollection();
};

CardBattleManager.createEnemyCollection = function () {
    this._enemy.createPackCollection();
    this._enemy.randomPackCollection();
};

CardBattleManager.drawCards = function (Duelist) {
    let collectionOrigin = Duelist.origin;
    let collectionDestiny = Duelist.destiny;
    let amount = Duelist.amount;

    for (let index = 0; index < amount; index++) {
        console.log(index)
        this._player.pushToCollection(collectionOrigin, collectionDestiny);
    }
};

CardBattleManager.pushPackToHand = function (amount, Duelist) {
    this.drawCards({
        origin: Duelist.getPack(),
        destiny: Duelist.getHand(),
        amount
    });
};

CardBattleManager.drawCard = function (player, amount) {
    CardBattleManager.pushPackToHand(amount, CardBattleManager.getDuelist(player));
};

CardBattleManager.getPlayerPackCollection = function () {
    return this._player.getPackCollection();
};

CardBattleManager.getEnemyPackCollection = function () {
    return this._enemy.getPackCollection();
};

CardBattleManager.getPlayerHandCollection = function () {
    return this._player.getHandCollection();
};

CardBattleManager.getEnemyHandCollection = function () {
    return this._enemy.getHandCollection();
};

CardBattleManager.getPlayerFieldCollection = function () {
    return this._player.getFieldCollection();
};

CardBattleManager.getEnemyFieldCollection = function () {
    return this._enemy.getFieldCollection();
};

CardBattleManager.getPlayerWins = function () {
    return this._player.getWins();
};

CardBattleManager.getEnemyWins = function () {
    return this._enemy.getWins();
};

CardBattleManager.getColors = function (player) {
    return this['_' + player].getColors();
};

CardBattleManager.setColors = function (player, Color) {
    this['_' + player].setColor(Color);
};

CardBattleManager.getPack = function (player) {
    return this['_' + player].getPack();
};

CardBattleManager.getHand = function (player) {
    return this['_' + player].getHand();
};

CardBattleManager.getPlayerPass = function () {
    return this._player.getPass();
};

CardBattleManager.getEnemyPass = function () {
    return this._enemy.getPass();
};

CardBattleManager.setPlayerPass = function (pass) {
    return this._player.setPass(pass);
};

CardBattleManager.setEnemyPass = function (pass) {
    return this._enemy.setPass(pass);
};