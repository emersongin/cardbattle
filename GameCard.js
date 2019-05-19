function GameCard() {
    this.initialize.apply(this, arguments);
}

GameCard.prototype.constructor = GameCard;

GameCard.prototype.initialize = function(cardId) {
    this.setup(cardId);
};

GameCard.prototype.setup = function(cardId) {
    var card = $dataCards[cardId];

    this._id = cardId;
    this._name = card.name;
    this._description = card.description;
    this._attackPoint = card.attackPoint;
    this._healthPoint = card.healthPoint;
    this._type = card.type;
    this._effect = card.effect;
    this._color = card.color;
    this._cost = card.cost;
    this._filename = card.filename;
    
    this.active = true;
};

GameCard.prototype.create = function() {

};

GameCard.prototype.start = function() {

};

GameCard.prototype.update = function() {

};

