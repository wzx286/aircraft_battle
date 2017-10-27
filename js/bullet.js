/* 
    子弹类
*/
var Bullet = function (type, x, y) {
    
    this.init = function () {
        this.width = CONFIG[type].width * CONFIG["Game"].unit;
        this.height = CONFIG[type].height * CONFIG["Game"].unit;
        this.posX = x;
        this.posY = y- this.height;
        this.speed = CONFIG[type].speed;
        this.live = CONFIG[type].live;
        this.status = 'normal';
        this.ico = new Image();
        this.ico.src = CONFIG[type].ico;
        this.ico.width = this.width;
        this.ico.height = this.height; 
        this.damage = CONFIG[type].damage;     
    }
    
    //检测碰撞
    this.hasHit = function (el) {
        return hasCollision(this, el);
    }

    //更新位置
    this.update = function () {
        this.posY -= this.speed;
    }

    //在画板中绘出飞机
    this.draw = function (ctx) {
        ctx.drawImage(this.ico, this.posX, this.posY); 
        this.update();       
    }  

    this.init();  
}