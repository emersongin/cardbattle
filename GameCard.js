function GameCard() {
    this.initialize.apply(this, arguments);
};

GameCard.prototype.constructor = GameCard;

GameCard.prototype.initialize = function (id) {
    let {
        name, 
        description, 
        attackPoints, 
        healthPoints,
        type,
        effect,
        color,
        cost,
        filename
    } = $dataCards[id];
    
    this._id = id;
    this._name = name;
    this._description = description;
    this._attackPoints = attackPoints;
    this._healthPoints = healthPoints;
    this._type = type;
    this._effect = effect;
    this._color = color;
    this._cost = cost;
    this._filename = filename;

    this._player = false;
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

GameCard.prototype.getAttackPoints = function () {
    return this._attackPoints;
};

GameCard.prototype.getHealthPoints = function () {
    return this._healthPoints;
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

GameCard.prototype.setAttackPoints = function (points) {
    return this._attackPoints = points;
};

GameCard.prototype.setHealthPoint = function (points) {
    return this._healthPoints = points;
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
