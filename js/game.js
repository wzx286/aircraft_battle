/* 
    游戏类:用于开始游戏
*/
var Game = function () {

    var scoreArea = document.getElementById('score');
    var bgMusic = document.getElementById('bg_music');
    this.init = function () {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this.background = new Image(); 
        this.background.src = 'source/img/bg_1.jpg';       
        this.canvas = document.getElementById('myCanvas');
        this.player = new Player("Plane-1");
        this.canvas.width = this.width;
        this.canvas.height = this.height; 
        this.score = new Score();
        bgMusic && (bgMusic.play(), bgMusic.loop = true);
        //根据游戏难度调整敌机数量
        this.enemies = (function (CONFiG) {
            switch(CONFiG["Game"].mode.toLowerCase()) {
                case "easy":
                    return new Array(CONFiG["Game"].minEnemy);
                    break;
                case "normal":
                    return new Array(~~((CONFiG["Game"].minEnemy + CONFiG["Game"].maxEnemy)/2));
                    break;
                case "hard":
                    return new Array(CONFiG["Game"].maxEnemy);
                    break;
                default:break;
            }
        })(CONFIG);
        
        for( var len = this.enemies.length; len >= 0; len--) {
            this.enemies[len] = createEnemy();
        }

        this.background.onload = function () {
            this.ctx = this.canvas.getContext('2d');
            this.canvas.addEventListener('touchstart', touchStart.bind(this), false);
            this.canvas.addEventListener('touchmove', touchMove.bind(this), false);        
            requestAnimationFrame(this.draw.bind(this));
        }.bind(this);
    };

    //创建敌机
    var createEnemy = function () {
        var rand = Math.random();
        if(rand >= 0.9) {
            return new Enemy("Enemy-Big");
        } else if(rand >= 0.4){
            return new Enemy("Enemy-Small");
        } else {
            // createEnemy();
        }
    }

    this.getScore = function () {
        return this.score.getScore();
    }

    this.hasOver = function () {
        // return this.over;
        // this.emit('gameover');        
        var content = document.getElementById('content');
        var eve = document.createEvent('HTMLEvents');
        eve.initEvent('gameover');
        document.dispatchEvent(eve); 
        bgMusic && (bgMusic.pause(), bgMusic.currentTime = 0.0);
    }

    var requestAnimationFrame = window.requestAnimationFrame 
                            || window.webkitRequestAnimationFrame
                            || window.msRequestAnimationFrame
                            || window.mozRequestAnimationFrame;
    
    /* 
        绘出每一帧的画面
    */
    this.draw = function () {    
        this.ctx.drawImage(this.background, 0, 0);
        if(this.player.draw(this.ctx)) {
            //游戏结束
            this.hasOver();      
            return;
        }
        for( let len = this.enemies.length-1; len >= 0; len --) {
            if(this.enemies[len] === undefined)
                this.enemies[len] = createEnemy();
            else {
                if(this.player.hasCrash(this.enemies[len])) {
                    this.player.dead();
                } else {
                    this.enemies[len].draw(this.ctx);
                    this.player.hasHit(this.enemies[len]) 
                    && this.enemies[len].beenHit(CONFIG[this.player.bulletType].damage);
                    if(this.enemies[len].posY > this.height || this.enemies[len].status === 'boomed') {
                        this.score.addScore(this.enemies[len].score);
                        scoreArea.textContent = '当前得分:' + this.score.getScore();
                        this.enemies.splice(len,1,createEnemy());
                    }
                }
                
            }            
        }
        requestAnimationFrame(this.draw.bind(this));
        
    };

    var touchStart = function (evt) {        
        evt.stopPropagation();
        this.lastPointX = evt.targetTouches[0].pageX;
        this.lastPointY = evt.targetTouches[0].pageY;
    }

    var touchMove = function (evt) {
        evt.stopPropagation();     
        this.player.changePositionTo(this.player.posX + evt.targetTouches[0].pageX - this.lastPointX, this.player.posY + evt.targetTouches[0].pageY - this.lastPointY);
        this.lastPointX = evt.targetTouches[0].pageX;
        this.lastPointY = evt.targetTouches[0].pageY;
    }


    this.init();
    

}