/* 
    飞机类(玩家)
*/
var Player  = function (type) {

    //初始化
    this.init = function () {
        this.width = CONFIG[type].width * CONFIG["Game"].unit;
        this.height = CONFIG[type].height * CONFIG["Game"].unit;
        this.posX = document.documentElement.clientWidth / 2 - this.width / 2;
        this.posY = document.documentElement.clientHeight - this.height;
        this.ico = new Image();
        this.ico.src = CONFIG[type].ico;
        this.ico.style.width = this.width;
        this.ico.style.height = this.height;
        this.live = CONFIG["Game"].live;
        this.status = 'normal';
        this.boomIco = new Image();
        this.boomIco.src = CONFIG[type]["boom-ico"];
        this.boom_delay = 20;
        this.bullets = [];
        this.bulletType = "Bullet-1";
        this.shootInterval = CONFIG[type].shootInterval; 
        setInterval(function () {        
            this.shoot();
        }.bind(this),this.shootInterval);
    }

    //改变位置
    this.changePositionTo = function(x, y) {
        this.posX = x;
        this.posY = y;
    }

    //发射子弹
    this.shoot = function () {
        var bullet = new Bullet(this.bulletType, this.posX, this.posY); 
        this.bullets.push(bullet);       
    }

    //判断是否击中敌机
    this.hasHit = function (el) {
        for( var len = this.bullets.length-1; len >= 0; len --) {
            if(this.bullets[len].hasHit(el)){                
                this.bullets.splice(len, 1);
                return true;
            }
        };
        return false;
    }

    //死亡,游戏结束
    this.dead = function () {
        if( this.status === 'normal') {
            this.ico.src = this.boomIco;
            this.status = 'booming';
            this.boom();
        }
    }

    this.boom = function () {
        if(this.boom_delay-- <= 0 && this.status === 'booming') {
            this.status = 'boomed';
            return true;
        }
        return false;
    }

    //判断是否与敌机相撞
    this.hasCrash = function (el) {
        return hasCollision(this, el);
    }

    //在画板中绘出飞机
    this.draw = function (ctx) {
        if(this.status === 'booming') {
            if(this.boom())return true;
            ctx.drawImage(this.boomIco, this.posX + (this.width - this.boomIco.width)/2, this.posY + (this.height - this.boomIco.height)/2);
            return false;
        } else if (this.status === 'normal') {
            ctx.drawImage(this.ico, this.posX, this.posY);
            this.bullets.forEach(function(element, i) {
                element.draw(ctx);
                if(element.posY < 0) {
                    this.bullets.splice(i, 1);
                }
            }, this);
            return false;
        } else
            return true;
    } 

    this.init(); 


    
}