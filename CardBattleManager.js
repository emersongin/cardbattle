function CardBattleManager() {
    throw new Error('This is a static class');
}

CardBattleManager.setup = function() {
    this.initMembers();
};

CardBattleManager.initMembers = function() {
    this._phase = 'INITIALIZE';
    this._player = new GameDuelist();
    this._enemy = new GameDuelist();
};

CardBattleManager.getPhase = function() {
    return this._phase;
};

CardBattleManager.setPhase = function(phase) {
    this._phase = phase;
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

CardBattleManager.setPlayerBattleCollection = function(cardBattlePack) {
    this._player.setPack(cardBattlePack);
};

CardBattleManager.createGameBattleCollection = function(GameCardCollection) {
    let cardBattlePack = [];

    GameCardCollection.forEach(GameCardStored => {
        for (let index = 0; index < GameCardStored.amount; index++) {
            cardBattlePack.push(new GameCard(GameCardStored.id));
        }
    });

    return cardBattlePack;
};

CardBattleManager.randomCollection = function(GameBattlePack) {
    let oldBattlePack = GameBattlePack;
    let randomBattlePack = [];

    while (oldBattlePack.length) {
        let random = Math.floor(Math.random() * oldBattlePack.length);
        randomBattlePack.push(oldBattlePack.splice(random, 1)[0]);
    }

    return randomBattlePack; 
};