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

CardBattleManager.getPlayerFirst = function () {
    return this._playerFirst;
};

CardBattleManager.getPlayerDuelist = function () {
    return this._player;
};

CardBattleManager.getEnemyDuelist = function () {
    return this._enemy;
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
        this._player.pushToCollection(collectionOrigin, collectionDestiny);
    }
};

CardBattleManager.pushPackToHand = function (amount, Duelist) {
    this.drawCards({
        origin: Duelist.getPackCollection(),
        destiny: Duelist.getHandCollection(),
        amount
    });
};

CardBattleManager.drawCardPlayer = function (amount) {
    CardBattleManager.pushPackToHand(amount, CardBattleManager.getPlayerDuelist());
};

CardBattleManager.drawCardEnemy = function (amount) {
    CardBattleManager.pushPackToHand(amount, CardBattleManager.getEnemyDuelist());
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

CardBattleManager.getPlayerColors = function () {
    return this._player.getColors();
};

CardBattleManager.getEnemyColors = function () {
    return this._enemy.getColors();
};

CardBattleManager.setPlayerColors = function (Color) {
    return this._player.setColor(Color);
};

CardBattleManager.setEnemyColors = function (Color) {
    return this._enemy.setColor(Color);
};

CardBattleManager.getPlayerPackLength = function () {
    return this._player.getPackLength();
};

CardBattleManager.getEnemyPackLength = function () {
    return this._enemy.getPackLength();
};

CardBattleManager.getPlayerHandLength = function () {
    return this._player.getHandLength();
};

CardBattleManager.getEnemyHandLength = function () {
    return this._enemy.getHandLength();
};