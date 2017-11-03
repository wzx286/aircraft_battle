/* 
    主页初始化操作
 */
window.onload = function () {

    var html = document.getElementsByTagName('html')[0];
    html.style.fontSize = document.body.clientWidth / 10 + 'px';
    
    var content = document.getElementById('content');
    var config = content.querySelector('.config-details');
    var buttonSound = document.querySelector('#button_sound');

    //记录设置的游戏难度
    var setGameMode = function (mode) {
        CONFIG["Game"].mode = mode;
    };
    //确定游戏设置
    var confirm = function () {
        buttonSound.play();        
        var mode = config.querySelector('.mode');
        setGameMode(mode.querySelector('[name=mode]:checked').value);
        backToHomePage();
    }
    //获取默认游戏难度
    var getGameMode = function () {
        return CONFIG["Game"].mode;
    };

    //事件:开始游戏
    var startGame = function () {
        buttonSound.play();
        content.className = 'index0';
        var game = new Game();
        document.addEventListener('gameover', function () {
            var score = game.getScore();
            content.querySelector('.total-score').textContent = '您的得分: ' + score;
            content.className = 'index3'; 
        }, false);
    
    };

    //事件:打开游戏介绍
    var introduceGame = function () {
        buttonSound.play();        
        content.className = 'index1';        
    };
    //事件:打开游戏设置界面
    var configGame = function () {
        buttonSound.play();        
        content.className = 'index2';
    };
    //事件:返回主界面
    var backToHomePage = function () {
        buttonSound.play();        
        content.className = 'index';
    };


    (function () {
        var mode = config.querySelector('.mode');
        mode.querySelector('#' + getGameMode() + '-mode').checked = true;    
    })();

    content.querySelector('.game-start').addEventListener('click', startGame, false);
    content.querySelector('.game-restart').addEventListener('click', startGame, false);
    content.querySelector('.game-introduce').addEventListener('click', introduceGame, false);
    content.querySelector('.game-config').addEventListener('click', configGame, false);
    content.querySelector('.backward').addEventListener('click', backToHomePage, false);
    content.querySelector('.confirm').addEventListener('click', confirm, false);
    content.querySelector('.back-to-menu').addEventListener('click', backToHomePage, false);
    
}