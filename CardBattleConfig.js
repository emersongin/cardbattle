var parameters = PluginManager.parameters('CardBattle');
var unknownData = String(parameters['Unknown Data'] || '??????');
var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'START_CARD_BATTLE') {
        CardBattleManager.setup();
        CardBattleManager.setIdEnemy(args[0]);
        SceneManager.push(SceneCardBattle);
    }
};

ImageManager.reserveCard = function(filename, hue, reservationId) {
    return this.reserveBitmap('img/cards/', filename, hue, true, reservationId);
};

ImageManager.requestCard = function(filename, hue) {
    return this.requestBitmap('img/cards/', filename, hue, true);
};

ImageManager.loadCard = function(filename, hue) {
    return this.loadBitmap('img/cards/', filename, hue, false);
};

SceneManager.snapForBackground = function() {
    this._backgroundBitmap = this.snap();
};