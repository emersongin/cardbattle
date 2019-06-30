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
    // this.createDisplayObjects();

    // this.testeWindowTrash();
    // this.testeWindowBattlefield();
    // this.testeWindowScore();
    // this.testeCard();
    this.testeCollection();
    // this.testeLuckyGame();
    // this.testeSpriteBattlefield();
    // this.testeWindowsOption();

};

SceneCardBattle.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
};

SceneCardBattle.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    // this.updatePreBattle();
    // this.updateCardBattle();
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
    const scene = this;
    const spriteset = this._spriteset;
    const cardBattle = CardBattleManager;

    if (cardBattle.isPhase('INITIALIZE')) {
        startPreBattle();
        startChallenger();
        startChooseFolder();
        endPreBattle();
    }

    function startPreBattle () {
        if (spriteset.isHideBackground() && spriteset.isHideOpening()) {
            spriteset.showBackground();
            spriteset.showOpening();
        }
    };

    function startChallenger () {
        if (spriteset.isDisabledOpening() && spriteset.isHideChallenger()) {
            if (scene.waiting(20)) {
                spriteset.showChallenger();
            }
        }
    };

    function startChooseFolder () {
        if (spriteset.isDisabledChallenger() && spriteset.isHideChooseFolder()) {
            if (scene.waiting(60)) {
                spriteset.showChooseFolder();
            }
        }
    };

    function endPreBattle () {
        if (spriteset.isDisabledChooseFolder()) {
            if (scene.waiting(60)) {
                cardBattle.setPhase('CARD_BATTLE');
            }
        }
    };
};

SceneCardBattle.prototype.updateCardBattle = function () {
    const scene = this;
    const spriteset = this._spriteset;
    const cardBattle = CardBattleManager;

    switch (cardBattle.getPhase()) {
        case 'CARD_BATTLE':
            nextSet();
            break;
        case 'START_PHASE':
            showBattlefield();
            showWindowStartPhase();
            startLuckyGame();
            endLuckyGame();
            break;
        case 'DRAW_PHASE':
            showWindowDrawPhase();
            moveBattleFieldAndSetDrawCards();
            drawCards();
            showCards();
            addColors();
            closeCardsAndBattlefield();
            break;
        case 'LOAD_PHASE':
            showWindowLoadPhase();
            moveBattleFieldAndSetLoad();
            beginLoadPhase();
            loadPhaseControl();
            openWindowPlayerLoadPhase();
            break;
        case 'SUMMON_PHASE':
            showWindowSummonPhase();
            selectBattleCards();
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

    function nextSet () {
        if (cardBattle.getPlayerWins() < 2 && cardBattle.getEnemyWins() < 2) {
            cardBattle.setPhase('START_PHASE');
        } else {
            cardBattle.setPhase('END_PHASE');
        }
    };

    function showBattlefield () {
        if (spriteset.isHideBattlefield()) {
            spriteset.showBattlefield();
        };
    };

    function showWindowStartPhase () {
        if (spriteset.isHideWindowStartPhase()) {
            spriteset.openWindowStartPhase();
        };
    };

    function startLuckyGame() {
        if (spriteset.isDisableWindowStartPhase() && spriteset.isHideLuckyGame()) {
            if (scene.waiting(60)) {
                spriteset.showLuckyGame();
            }
        }
    };

    function endLuckyGame () {
        if (spriteset.isDisabledLuckyGame()) {
            cardBattle.setPlayerFirst(spriteset.luckyGameResult());
            cardBattle.createGameCardCollections();
            cardBattle.setPhase('DRAW_PHASE');
        }
    };

    function showWindowDrawPhase () {
        if (spriteset.isHideWindowDrawPhase()) {
            if (scene.waiting(60)) {
                spriteset.openWindowDrawPhase();
            }
        };
    };

    function moveBattleFieldAndSetDrawCards () {
        if (spriteset.isDisableWindowDrawPhase() && spriteset.IsMoveOutBattlegrounds()) {
            if (scene.waiting(60)) {
                spriteset.moveInPlayerBattlefield();
                spriteset.moveInEnemyBattlefield();
                scene.setStatus('DRAW_REFRESH_CARDS');
            }
        }
    };

    function drawCards () {
        if (spriteset.stopMoveCards() && spriteset.IsMoveInBattlegrounds() && 
        scene.currentStatus('DRAW_REFRESH_CARDS')) {

            if (scene.times(6)) {
                cardBattle.drawCardPlayer(1);
                cardBattle.drawCardEnemy(1);
                spriteset.addAndRefreshSpriteCardPlayer(scene.indexTimes());
                spriteset.addAndRefreshSpriteCardEnemy(scene.indexTimes());
                spriteset.showHandCardsPlayer(scene.indexTimes());
                spriteset.showHandCardsEnemy(scene.indexTimes());
                spriteset.refreshPlayerBattleField();
                spriteset.refreshEnemyBattleField();
            } else {
                scene.setStatus('DRAW_SHOW_PLAYER_CARDS');
            }
        }
    };

    function showCards () {
        if (spriteset.stopMoveCards() && scene.currentStatus('DRAW_SHOW_PLAYER_CARDS')) {
            if (scene.times(6)) {
                spriteset.playerHandCardsToTurn(scene.indexTimes());
            } else {
                scene.setStatus('DRAW_ADD_COLORS');
            }
        }
    };

    function addColors () {
        if (spriteset.stopMoveCards() && scene.currentStatus('DRAW_ADD_COLORS')) {
            if (scene.times(6)) {
                spriteset.addPlayerColor(scene.indexTimes());
                spriteset.addEnemyColor(scene.indexTimes());
                spriteset.refreshPlayerBattleField();
                spriteset.refreshEnemyBattleField();
            } else {
                scene.setStatus('DRAW_CLOSE_CARDS');
                
            }
        }
    };

    function closeCardsAndBattlefield () {
        if (spriteset.stopMoveCards() && scene.currentStatus('DRAW_CLOSE_CARDS')) {
            if (scene.waiting(120)) {
                spriteset.moveOutPlayerBattlefield();
                spriteset.moveOutEnemyBattlefield();
                spriteset.closeHandCardsPlayer();
                spriteset.closeHandCardsEnemy();
                cardBattle.setPhase('LOAD_PHASE');
            }
        }
    };

    function showWindowLoadPhase () {
        if (spriteset.isHideWindowLoadPhase()) {
            if (scene.waiting(60)) {
                spriteset.openWindowLoadPhase();
            }
        };
    };

    function moveBattleFieldAndSetLoad () {
        if (spriteset.isDisableWindowLoadPhase() && spriteset.IsMoveOutBattlegrounds()) {
            if (scene.waiting(60)) {
                spriteset.moveInPlayerBattlefield();
                spriteset.moveInEnemyBattlefield();
                scene.setStatus('LOAD_BEGIN');
            }
        }
    };

    function beginLoadPhase () {
        if (spriteset.IsMoveInBattlegrounds() && scene.currentStatus('LOAD_BEGIN')) {
            if (spriteset.isOpenAlertLoadWindow()) {
                if (scene.waiting(120)) {
                    spriteset.closeAlertLoadWindow();
                    scene.setStatus('LOAD_CONTROL');
                }
            } else {
                spriteset.openAlertLoadWindow();
            }
            
        }
    };

    function loadPhaseControl () {
        if (scene.currentStatus('LOAD_CONTROL')) {
            if (spriteset.IsMoveOutBattlegrounds()) {
                spriteset.moveInPlayerBattlefield();
                spriteset.moveInEnemyBattlefield();
            }
            if (scene.waiting(60)) {
                if (CardBattleManager.getPlayerPass() && CardBattleManager.getEnemyPass()) {
                    spriteset.moveOutPlayerBattlefield();
                    spriteset.moveOutEnemyBattlefield();
                    cardBattle.setPhase('SUMMON_PHASE');
                } else {
                    if (CardBattleManager.getPlayerFirst()) {
                        CardBattleManager.setPlayerFirst(false);
                        scene.setStatus('LOAD_POWERCARD_PLAYER');
                    } else {
                        CardBattleManager.setPlayerFirst(true);
                        CardBattleManager.setEnemyPass(true);
                        spriteset.showEnemyDisplayPass();
                    }
                }
            }
        }
    };

    function openWindowPlayerLoadPhase () {
        if (scene.currentStatus('LOAD_POWERCARD_PLAYER')) {
            if (scene.waiting(30)) {
                spriteset.openOptionLoadWindow();
                spriteset.setHandlerLoadWindow('OPTION_ACCEPT', loadingPhaseOptions.bind(scene, true));
                spriteset.setHandlerLoadWindow('OPTION_REFUSE', loadingPhaseOptions.bind(scene, false));
            }
        }
    };

    function loadingPhaseOptions (choice) {
        if (choice) {
            console.log('Yes');
        } else {
            CardBattleManager.setPlayerPass(true);
            spriteset.showPlayerDisplayPass();
            scene.setStatus('LOAD_CONTROL');
        }
        this._spriteset.closeOptionLoadWindow();
    };

    function showWindowSummonPhase () {
        if (spriteset.isHideWindowSummonPhase()) {
            if (scene.waiting(60)) {
                spriteset.openWindowSummonPhase();
            }
        };
    };

    function selectBattleCards () {
        if (spriteset.isDisableWindowSummonPhase() && spriteset.IsMoveOutBattlegrounds()) {
            if (scene.waiting(60)) {
                cardBattle.setPhase('selectBattleCards');
                spriteset.moveInPlayerBattleground();
            }
        }
    };
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

//     this._Battlefield.moveInPlayerBattleground();
//     this._Battlefield.moveInPlayerTrash();
//     this._Battlefield.moveInPlayerScore();

//     this._Battlefield.moveInEnemyBackground();
//     this._Battlefield.moveInEnemyTrash();
//     this._Battlefield.moveInEnemyScore();
// };

// SceneCardBattle.prototype.testeLuckyGame = function () {
//     this._gameLuck = new SpriteGameLuck();
//     this._gameLuck.visible = true;
//     this.addChild(this._gameLuck);

//     this._gameLuck.openCards();
// };

SceneCardBattle.prototype.testeCollection = function () {
    this._testeColection = new SpriteHandlerCollection();
    this._testeColection.x = Graphics.boxWidth / 16;
    this._testeColection.y = Graphics.boxHeight / 2;

    let GameCardCollection = [];
    let actions = [];

    for (let index = 0; index < 6; index++) {
        GameCardCollection.push(new GameCard(3));
    }
    this.addChild(this._testeColection);
    
    this._testeColection.refreshCollections(GameCardCollection);
    this._testeColection.addChildren();

    this._testeColection.showCollection({min: 1, max: 6});
    this._testeColection.activeSelection();


};''            

// SceneCardBattle.prototype.testeWindowScore = function () {
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

// SceneCardBattle.prototype.testeWindowBattlefield = function () {
//     this.windowZone = new WindowBattleground({ player: true });
//     this.windowZone2 = new WindowBattleground({ player: false });

//     this.addChild(this.windowZone);
//     this.addChild(this.windowZone2);

//     this.windowZone.initialPosition();
//     this.windowZone2.initialPosition();
//     this.windowZone.moveIn();
//     this.windowZone2.moveIn();    

//     if (this.windowZone.IsMoveIn()) {
//         this.windowZone.showDisplay();
//         this.windowZone2.showDisplay();
//         this.windowZone.setHandPoints(5555);
//     }

//     this.windowZone.setPackPoints(10);
//     this.windowZone2.setPackPoints(10);
//     this.windowZone.setPositionAnimate('WHITE_POINTS');
//     this.windowZone.startAnimation(2);
    
// }

// SceneCardBattle.prototype.testeWindowTrash = function () {
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