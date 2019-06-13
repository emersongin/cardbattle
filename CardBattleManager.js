function CardBattleManager() {
    throw new Error('This is a static class');
}

CardBattleManager.setup = function() {
    this.initMembers();
};

CardBattleManager.initMembers = function() {
    this._phase = 'INITIALIZE';
    this._playerFirst = false;
    this._player = new GameDuelist();
    this._enemy = new GameDuelist();
};

CardBattleManager.getPhase = function() {
    return this._phase;
};

CardBattleManager.setPhase = function(phase) {
    this._phase = phase;
};

CardBattleManager.getPlayerFirst = function() {
    return this._playerFirst;
};

CardBattleManager.setPlayerFirst = function(player) {
    this._playerFirst = player;
};

CardBattleManager.getEnemyInformation = function() {
    return this._enemy.getEnemyInformation();
};

CardBattleManager.setIdEnemy = function(ID) {
    this._enemy.setEnemy(ID);
};

CardBattleManager.getPlayerWins = function() {
    return this._player.getWins();
};

CardBattleManager.getEnemyWins = function() {
    return this._enemy.getWins();
};

CardBattleManager.getPlayerFieldCollection = function() {
    return this._player.getField();
};

CardBattleManager.getEnemyFieldCollection = function() {
    return this._enemy.getField();
};

CardBattleManager.setPlayerBattleCollection = function(gameBattleCollection) {
    this._player.setPack(gameBattleCollection);
};

CardBattleManager.setEnemyBattleCollection = function(gameBattleCollection) {
    this._enemy.setPack(gameBattleCollection);
};

CardBattleManager.drawSixCards = function() {
    for (let index = 0; index < 6; index++) {
        this.playerPushPackToField();
        this.enemyPushPackToField();
    }
};

CardBattleManager.playerPushPackToHand = function() {
    this._player.pushToFolder(this._player.getPack(), this._player.getHand());
};

CardBattleManager.playerPushPackToField = function() {
    this._player.pushToFolder(this._player.getPack(), this._player.getField());
};

CardBattleManager.playerPushHandToField = function() {
    this._player.pushToFolder(this._player.getHand(), this._player.getField());
};

CardBattleManager.enemyPushPackToHand = function() {
    this._enemy.pushToFolder(this._enemy.getPack(), this._enemy.getHand());
};

CardBattleManager.enemyPushPackToField = function() {
    this._enemy.pushToFolder(this._enemy.getPack(), this._enemy.getField());
};

CardBattleManager.enemyPushHandToField = function() {
    this._enemy.pushToFolder(this._enemy.getHand(), this._enemy.getField());
};

CardBattleManager.createGameBattleCollection = function(GameCardCollection) {
    let gameBattleCollection = [];

    GameCardCollection.forEach(GameCardStored => {
        for (let index = 0; index < GameCardStored.amount; index++) {
            gameBattleCollection.push(new GameCard(GameCardStored.id));
        }
    });

    return gameBattleCollection;
};

CardBattleManager.randomCollection = function(GameBattlePack) {
    let oldBattlePack = GameBattlePack;
    let randomBattlePack = [];

    while (oldBattlePack.length) {
        let random = Math.floor(Math.random() * oldBattlePack.length);
        randomBattlePack.push(oldBattlePack.splice(random, 1).shift());
    }

    return randomBattlePack; 
};