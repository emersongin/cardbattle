function WindowZone(){
    this.initialize.apply(this, arguments);
}

WindowZone.prototype = Object.create(Window_Base.prototype);
WindowZone.prototype.constructor = WindowZone;

WindowZone.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
};


SpriteZone

Color
Display
Side

AttackPoint
HealthPoint
whitePoint
BluePoint
GreenPoint
RedPoint
BlackPoint
PackPoint
HandPoint
WinPoint

targetAttackPoint
targetHealthPoint
targetWhite
targetBlue
targetGreen
targetRed
targetBlack
targetPackPoint
targetHandPoint
targetWinPoint