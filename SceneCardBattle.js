function SceneCardBattle() {
    this.initialize.apply(this, arguments);
}

SceneCardBattle.prototype = Object.create(Scene_Base.prototype);
SceneCardBattle.prototype.constructor = SceneCardBattle;

SceneCardBattle.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this._wait = 0;
    this._times = 0;
    this._state = 'TAG';

};

SceneCardBattle.prototype.currentStatus = function (tag) {
    return this._state === tag;
};

SceneCardBattle.prototype.setStatus = function (tag) {
    this._state = tag;
};

SceneCardBattle.prototype.indexTimes = function () {
    return this._times - 1;
};

SceneCardBattle.prototype.times = function (times) {
    if (this._times < times) {
        this._times++;
        return true;
    } else {
        this._times = 0;
        return false;
    }
};

SceneCardBattle.prototype.waiting = function (wait) {
    if (this._wait > wait) {
        this._wait = 0;
        return true;
    } else {
        this._wait++;
        return false;
    }
};

SceneCardBattle.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createDisplayObjects();

    // this.testeTrashWindow();
    // this.testeZoneWindow();
    // this.testeWin();
    // this.testeCard();
    // this.testeCollection();
    // this.testeGameLuck();
    // this.testeSpriteBattlefield();
    // this.testeWindowsOption();

};

SceneCardBattle.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
};

SceneCardBattle.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    this.updatePreBattle();
    this.updateCardBattle();
};

SceneCardBattle.prototype.stop = function () {
    Scene_Base.prototype.stop.call(this);
};

SceneCardBattle.prototype.terminate = function () {
    Scene_Base.prototype.terminate.call(this);
};

SceneCardBattle.prototype.createDisplayObjects = function () {
    this.createSpriteset();
};

SceneCardBattle.prototype.createSpriteset = function () {
    this._spriteset = new SpritesetCardBattle();
    this._spriteset.layers().forEach(sprite =>{
        this.addChild(sprite);
    })
};

SceneCardBattle.prototype.updatePreBattle = function () {
    if (CardBattleManager.getPhase() === 'INITIALIZE') {
        if (this._spriteset.isHideBackground() && this._spriteset.isHideOpening()) {
            this._spriteset.showBackground();
            this._spriteset.showOpening();
        }
        if (this._spriteset.isDisabledOpening() && this._spriteset.isHideChallenger()) {
            if (this.waiting(20)) {
                this._spriteset.showChallenger();
            }
        }
        if (this._spriteset.isDisabledChallenger() && this._spriteset.isHideChooseFolder()) {
            if (this.waiting(60)) {
                this._spriteset.showChooseFolder();
            }
        }
        if (this._spriteset.isDisabledChooseFolder()) {
            if (this.waiting(60)) {
                CardBattleManager.setPhase('CARD_BATTLE');
            }
        }
    }
};

SceneCardBattle.prototype.updateCardBattle = function () {
    switch (CardBattleManager.getPhase()) {
        case 'CARD_BATTLE':
            if (CardBattleManager.getPlayerWins() < 2 && CardBattleManager.getEnemyWins() < 2) {
                CardBattleManager.setPhase('START_PHASE');
            } else {
                CardBattleManager.setPhase('END_PHASE');
            }
            break;
        case 'START_PHASE':
            if (this._spriteset.isHideBattlefield()) {
                this._spriteset.showBattlefield();
            };

            if (this._spriteset.isHideWindowStartPhase()) {
                this._spriteset.openWindowStartPhase();
            };

            if (this._spriteset.isDisableWindowStartPhase() && this._spriteset.isHideLuckyGame()) {
                if (this.waiting(60)) {
                    this._spriteset.showLuckyGame();
                }
            }

            if (this._spriteset.isDisabledLuckyGame()) {
                CardBattleManager.setPlayerFirst(this._spriteset.luckGameResult());
                CardBattleManager.createGameCardCollections();
                CardBattleManager.setPhase('DRAW_PHASE');
            }
            break;
        case 'DRAW_PHASE':
            if (this._spriteset.isHideWindowDrawPhase()) {
                if (this.waiting(60)) {
                    this._spriteset.openWindowDrawPhase();
                }
            };
            if (this._spriteset.isDisableWindowDrawPhase()) {
                if (this._spriteset.IsMoveOutBackgrounds()) {
                    if (this.waiting(60)) {
                        this._spriteset.moveInPlayerBattlefield();
                        this._spriteset.moveInEnemyBattlefield();
                        this.setStatus('DRAW_REFRESH_CARDS');
                    }
                }
            }
            if (this._spriteset.stopMoveCards() && this._spriteset.IsMoveInBackgrounds() && this.currentStatus('DRAW_REFRESH_CARDS')) {
                if (this.times(6)) {
                    CardBattleManager.drawCardPlayer(1);
                    CardBattleManager.drawCardEnemy(1);
                    this._spriteset.addAndRefreshSpriteCardPlayer(this.indexTimes());
                    this._spriteset.addAndRefreshSpriteCardEnemy(this.indexTimes());
                    this._spriteset.showHandCardsPlayer(this.indexTimes());
                    this._spriteset.showHandCardsEnemy(this.indexTimes());
                    this._spriteset.refreshPlayerBattleField();
                    this._spriteset.refreshEnemyBattleField();
                } else {
                    this.setStatus('DRAW_SHOW_PLAYER_CARDS');
                }
            }
            if (this._spriteset.stopMoveCards() && this.currentStatus('DRAW_SHOW_PLAYER_CARDS')) {
                if (this.times(6)) {
                    this._spriteset.playerHandCardsToTurn(this.indexTimes());
                } else {
                    this.setStatus('DRAW_ADD_COLORS');
                }
            }
            if (this._spriteset.stopMoveCards() && this.currentStatus('DRAW_ADD_COLORS')) {
                if (this.times(6)) {
                    this._spriteset.addPlayerColor(this.indexTimes());
                    this._spriteset.addEnemyColor(this.indexTimes());
                    this._spriteset.refreshPlayerBattleField();
                    this._spriteset.refreshEnemyBattleField();
                } else {
                    this.setStatus('DRAW_CLOSE_CARDS');
                    
                }
            }
            if (this._spriteset.stopMoveCards() && this.currentStatus('DRAW_CLOSE_CARDS')) {
                if (this.waiting(120)) {
                    this._spriteset.moveOutPlayerBattlefield();
                    this._spriteset.moveOutEnemyBattlefield();
                    this._spriteset.closeHandCardsPlayer();
                    this._spriteset.closeHandCardsEnemy();
                    CardBattleManager.setPhase('LOAD_PHASE');
                }
            }
            break;
        case 'LOAD_PHASE':
            if (this._spriteset.isHideWindowLoadPhase()) {
                if (this.waiting(60)) {
                    this._spriteset.openWindowLoadPhase();
                }
            };
            if (this._spriteset.isDisableWindowLoadPhase()) {
                if (this._spriteset.IsMoveOutBackgrounds()) {
                    if (this.waiting(60)) {
                        this._spriteset.moveInPlayerBattlefield();
                        this._spriteset.moveInEnemyBattlefield();
                        this.setStatus('LOAD_BEGIN');
                    }
                }
            }
            if (this._spriteset.IsMoveInBackgrounds() && this.currentStatus('LOAD_BEGIN')) {
                if (this._spriteset.isOpenAlertLoadWindow()) {
                    if (this.waiting(120)) {
                        this._spriteset.closeAlertLoadWindow();
                        this.setStatus('LOAD_POWERCARD_PLAYER');
                    }
                } else {
                    this._spriteset.openAlertLoadWindow();
                }
                
            }
            if (this.currentStatus('LOAD_POWERCARD_PLAYER')) {
                if (this.waiting(60)) {
                    this._spriteset.openOptionLoadWindow();
                    this._spriteset.setHandlerLoadWindow('OPTION_CONFIRM', this.testeSelect.bind(this, 0));
                    this._spriteset.setHandlerLoadWindow('OPTION_CANCEL', this.testeSelect.bind(this, 1));
                    CardBattleManager.setPhase('SUMMON_PHASE');
                }
            }
            break;
        case 'SUMMON_PHASE':

            break;
        case 'COMPILE_PHASE':

            break;
        case 'BATTLE_PHASE':

            break;
        case 'END_PHASE':

            break;
        default:
            break;
    }
};

SceneCardBattle.prototype.testeSelect = function (index) {
    if (index) {
        console.log('No');
    } else {
        console.log('Yes');
    }
    this._spriteset.closeOptionLoadWindow();
};

// SceneCardBattle.prototype.testeWindowsOption = function () {
//     this.window = new SpriteOption(0, 20, 816, [
//         {label: 'Hand', tag: 'OPTION_HAND'},
//         {label: 'Field', tag: 'OPTION_FIELD'},
//         {label: 'Trash', tag: 'OPTION_TRASH'},
//         {label: 'Cancel', tag: 'OPTION_CANCEL'},
//         {label: 'Surrender', tag: 'OPTION_SURRENDER'}
//     ]);

//     this.window.refreshTitle('');
//     this.window.resizeWidthWindows(300);

//     this.window.changePositionTitle(40, Graphics.boxHeight / 3);
//     this.window.changePositionOptions(40, Graphics.boxHeight / 2.4);

//     this.addChild(this.window);

//     this.window.show();
//     this.window.openOptionsWindow();

//     this.window.setHandler('OPTION_HAND', this.testeSelect.bind(this, 0));
// 	this.window.setHandler('OPTION_FIELD', this.testeSelect.bind(this, 1));
// 	this.window.setHandler('OPTION_TRASH', this.testeSelect.bind(this, 2));
// 	this.window.setHandler('OPTION_CANCEL', this.testeSelect.bind(this, 3));
//     this.window.setHandler('OPTION_SURRENDER', this.testeSelect.bind(this, 4));
// };

// SceneCardBattle.prototype.testeWindowsOption = function () {
    // this.window = new SpriteOption(0, 20, 816, [
    //     {label: 'Yes', tag: 'OPTION_CONFIRM'},
    //     {label: 'No', tag: 'OPTION_CANCEL'}
    // ]);
    // let marginLeft = ' ';
    // this.window.refreshTitle(marginLeft + 'Use a Power Card?');

    // this.window.resizeWidthWindows(776);
    // this.window.changePositionTitle(20, Graphics.boxHeight / 2);
    // this.window.changePositionOptions(20, Graphics.boxHeight / 1.7);
    // this.addChild(this.window);

    // this.window.show();
    // this.window.openWindows();

    // this.window.setHandler('OPTION_CONFIRM', this.testeSelect.bind(this, 0));
    // this.window.setHandler('OPTION_CANCEL', this.testeSelect.bind(this, 1));
// };

// SceneCardBattle.prototype.testeSpriteBattlefield = function () {
//     this._Battlefield = new SpriteBattlefield();
//     this.addChild(this._Battlefield);

//     this._Battlefield.openWindowStartPhase();
//     this._Battlefield.openWindowDrawPhase();
//     this._Battlefield.openWindowLoadPhase();
//     this._Battlefield.openWindowSummonPhase();
//     this._Battlefield.openWindowCompilePhase();
//     this._Battlefield.openWindowBattlePhase();

//     this._Battlefield.moveInPlayerBackground();
//     this._Battlefield.moveInPlayerTrash();
//     this._Battlefield.moveInPlayerScore();

//     this._Battlefield.moveInEnemyBackground();
//     this._Battlefield.moveInEnemyTrash();
//     this._Battlefield.moveInEnemyScore();
// };

// SceneCardBattle.prototype.testeGameLuck = function () {
//     this._gameLuck = new SpriteGameLuck();
//     this._gameLuck.visible = true;
//     this.addChild(this._gameLuck);

//     this._gameLuck.openCards();
// };

// SceneCardBattle.prototype.testeCollection = function () {
//     this._testeColection = new SpriteCollection();
//     this._testeColection.x = Graphics.boxWidth / 16;
//     this._testeColection.y = Graphics.boxHeight / 2;

//     let GameCardCollection = [];
//     for (let index = 0; index < 6; index++) {
//         GameCardCollection.push(new GameCard(3));
//     }
//     this.addChild(this._testeColection);
    
//     this._testeColection.refreshCollection(GameCardCollection);
//     this._testeColection.addChildren();

//     GameCardCollection.forEach((GameCard, index) => {
//         this._testeColection.positionCollection(index);
//         this._testeColection.waitMoment(index, index * 8);
//         this._testeColection.toTurn(index);

//         this._testeColection.positionHand(index);
//         this._testeColection.moveField(index);

//         this._testeColection.toTurn(index);
//         this._testeColection.flash(index);
//         this._testeColection.close(index);

//         this._testeColection.effect(index);
//         this._testeColection.block(index);

//         this._testeColection.activeEffect(index);

//         this._testeColection.toDestroy(index);

//         this._testeColection.light(index);
//         this._testeColection.unlit(index);

//         this._testeColection.select(index);
//         this._testeColection.unselect(index);
//         this._testeColection.confirm(index);

//         this._testeColection.react(index);

//         this._testeColection.powerUp(index);
//         this._testeColection.powerDown(index);
        
//         this._testeColection.disabled(index);
//         this._testeColection.enabled(index);

//         this._testeColection.moveAttack(index, 6);
//         this._testeColection.moveBattleField(index);

//         this._testeColection.damager(index);

//         this._testeColection.setAttack(index, 90);
//         this._testeColection.setHealth(index, -90);

//     });
    
// };

// SceneCardBattle.prototype.testeWin = function () {
//     this.windowWinPlayer = new WindowWin(true);
//     this.windowWinEnemy = new WindowWin();

//     this.addChild(this.windowWinPlayer);
//     this.addChild(this.windowWinEnemy);

//     this.windowWinPlayer.open();
//     this.windowWinPlayer.moveIn();
//     this.windowWinEnemy.open();
//     this.windowWinEnemy.moveIn();

//     this.windowWinPlayer.firstVictory();
//     this.windowWinEnemy.winner();
//     this.windowWinPlayer.winner();
//     this.windowWinEnemy.secondVictory();
    
// }

// SceneCardBattle.prototype.testeZoneWindow = function () {
//     this.windowZone = new WindowZone(true);
//     this.windowZone2 = new WindowZone();

//     this.addChild(this.windowZone);
//     this.addChild(this.windowZone2);

//     this.windowZone.initialPosition();
//     this.windowZone2.initialPosition();

//     this.windowZone.open();
//     this.windowZone2.open();

//     this.windowZone.moveIn();
//     this.windowZone2.moveIn();

//     this.windowZone.setPackPoints(10);
//     this.windowZone2.setPackPoints(10);

//     this.windowZone.positionAnimation('RED_POINTS');
//     this.windowZone.showWinAnimation();
    
// }

// SceneCardBattle.prototype.testeTrashWindow = function () {
//     this.windowTrashPlayer = new WindowTrash(true);
//     this.windowTrashEnemy = new WindowTrash();

//     this.addChild(this.windowTrashPlayer);
//     this.addChild(this.windowTrashEnemy);

//     this.windowTrashPlayer.setPoints(1);
//     this.windowTrashPlayer.open();
//     this.windowTrashPlayer.moveIn();

//     this.windowTrashEnemy.setPoints(1);
//     this.windowTrashEnemy.open();
//     this.windowTrashEnemy.moveIn();
// }