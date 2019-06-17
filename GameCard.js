function GameCard() {
    this.initialize.apply(this, arguments);
};

GameCard.prototype.constructor = GameCard;

GameCard.prototype.initialize = function (ID) {
    let card = $dataCards[ID];
    
    this._id = ID;
    this._name = card.name;
    this._description = card.description;
    this._attackPoint = card.attackPoint;
    this._healthPoint = card.healthPoint;
    this._type = card.type;
    this._effect = card.effect;
    this._color = card.color;
    this._cost = card.cost;
    this._filename = card.filename;
    this._player = true;
    this._active = true;
};

GameCard.prototype.getID = function () {
    return this._id;
};

GameCard.prototype.getName = function () {
    return this._name;
};

GameCard.prototype.getDescription = function () {
    return this._description;
};

GameCard.prototype.getAttackPoint = function () {
    return this._attackPoint;
};

GameCard.prototype.setAttackPoint = function (attack) {
    return this._attackPoint = attack;
};

GameCard.prototype.getHealthPoint = function () {
    return this._healthPoint;
};

GameCard.prototype.setHealthPoint = function (health) {
    return this._healthPoint = health;
};

GameCard.prototype.getType = function () {
    return this._type;
};

GameCard.prototype.getEffect = function () {
    return this._effect;
};

GameCard.prototype.getColor = function () {
    return this._color;
};

GameCard.prototype.getCost = function () {
    return this._cost;
};

GameCard.prototype.getFilename = function () {
    return this._filename;
};

GameCard.prototype.isPlayer = function () {
    return this._player;
};

GameCard.prototype.setPlayer = function (player) {
    this._player = player;
};

GameCard.prototype.isActive = function () {
    return this._active;
};

GameCard.prototype.active = function () {
    this._active = true;
};

GameCard.prototype.deactive = function () {
    this._active = false;
};
