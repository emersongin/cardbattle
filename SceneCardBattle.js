function SceneCardBattle() {
    this.initialize.apply(this, arguments);
}

SceneCardBattle.prototype = Object.create(Scene_Base.prototype);
SceneCardBattle.prototype.constructor = SceneCardBattle;

SceneCardBattle.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    this._wait = 0;
    this.gamePlayerTest();
};

SceneCardBattle.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createDisplayObjects();

    // this.testeTrashWindow();
    // this.testeZoneWindow();
    // this.testeWin();
    // this.testeCard();
    // this.testeCollection();
    // this.testeGameLuck();
    // this.testeSpriteBattlefield();

};

SceneCardBattle.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
};

SceneCardBattle.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    this._spriteset.update();
    this.updatePreBattle();
    this.updateCardBattle();
};

SceneCardBattle.prototype.stop = function() {
    Scene_Base.prototype.stop.call(this);
};

SceneCardBattle.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
};

SceneCardBattle.prototype.createDisplayObjects = function() {
    this.createSpriteset();
};

SceneCardBattle.prototype.createSpriteset = function() {
    this._spriteset = new SpritesetCardBattle();
    this._spriteset.layers().forEach(sprite =>{
        this.addChild(sprite);
    })
};

SceneCardBattle.prototype.updatePreBattle = function() {
    if (CardBattleManager.getPhase() === 'INITIALIZE') {
        if (this._spriteset.isHideBackground() && this._spriteset.isHideOpening()) {
            this._spriteset.showBackground();
            this._spriteset.showOpening();
        }
        if (this._spriteset.isDisabledOpening() && this._spriteset.isHideChallenger()) {
            if (this._wait > 20) {
                this._spriteset.showChallenger();
                this._wait = 0;
            } else {
                this._wait++;
            }
        }
        if (this._spriteset.isDisabledChallenger() && this._spriteset.isHideChooseFolder()) {
            if (this._wait > 60) {
                this._spriteset.showChooseFolder();
                this._wait = 0;
            } else {
                this._wait++;
            }
        }
        if (this._spriteset.isDisabledChooseFolder()) {
            if (this._wait > 60) {
                CardBattleManager.setPhase('CARD_BATTLE');
                this._wait = 0;
            } else {
                this._wait++;
            }
        }
    }
};

SceneCardBattle.prototype.updateCardBattle = function() {
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
                    if (this._wait > 60) {
                        this._spriteset.showLuckyGame();
                        this._wait = 0;
                    } else {
                        this._wait++;
                    }
                }

                if (this._spriteset.isDisabledLuckyGame()) {
                    if (this._wait > 60) {
                        CardBattleManager.setPlayerFirst(this._spriteset.luckGameResult());
                        CardBattleManager.setPhase('DRAW_PHASE');
                        this._wait = 0;
                    } else {
                        this._wait++;
                    }
                }
            break;
        case 'DRAW_PHASE':
                if (this._spriteset.isHideWindowDrawPhase()) {
                    this._spriteset.openWindowDrawPhase();
                    CardBattleManager.drawSixCards();
                    this._spriteset.refreshBattleCards();
                };

                if (this._spriteset.isDisableWindowDrawPhase()) {
                    if (this._wait > 60) {
                        this._spriteset.moveInBattlefield();
                        this._spriteset.moveHandToField();
                        CardBattleManager.setPhase('WAIT');
                        this._wait = 0;
                    } else {
                        this._wait++;
                    }
                }
            break;
        case 'LOAD_PHASE':

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

SceneCardBattle.prototype.gamePlayerTest = function() {
    $gameCardPlayer.addCardsToStorage(new GameCardStored(3, 40));
    $gameCardPlayer.addDeck(new GameFolder('Folder 1', [new GameCardStored(3, 40)]));

    let enemyInformation = CardBattleManager.getEnemyInformation();
    let gameBattleCollection = CardBattleManager.createGameBattleCollection(enemyInformation.pack);
    CardBattleManager.setEnemyBattleCollection(gameBattleCollection);
};








// SceneCardBattle.prototype.testeSpriteBattlefield = function() {
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

// SceneCardBattle.prototype.testeGameLuck = function() {
//     this._gameLuck = new SpriteGameLuck();
//     this._gameLuck.visible = true;
//     this.addChild(this._gameLuck);

//     this._gameLuck.openCards();
// };

// SceneCardBattle.prototype.testeCollection = function() {
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

// SceneCardBattle.prototype.testeWin = function() {
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

// SceneCardBattle.prototype.testeZoneWindow = function() {
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

// SceneCardBattle.prototype.testeTrashWindow = function() {
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