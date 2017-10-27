/* 
    主页初始化操作
 */
window.onload = function () {
    var html = document.getElementsByTagName('html')[0];
    html.style.fontSize = document.body.clientWidth / 10 + 'px';

    var content = document.getElementById('content');

    //事件:开始游戏
    var startGame = function () {
        content.className = 'index0';
        var game = new Game();
    }
    //事件:打开游戏介绍
    var introduceGame = function () {
        content.className = 'index1';        
    }
    //事件:打开游戏设置界面
    var configGame = function () {
        content.className = 'index2';
    }
    //事件:返回主界面
    var backToHomePage = function () {
        content.className = 'index';
    }

    content.querySelector('.game-start').addEventListener('click', startGame, false);
    content.querySelector('.game-introduce').addEventListener('click', introduceGame, false);
    content.querySelector('.game-config').addEventListener('click', configGame, false);
    content.querySelector('.backward').addEventListener('click', backToHomePage, false);
    content.querySelector('.confirm').addEventListener('click', backToHomePage, false);
}