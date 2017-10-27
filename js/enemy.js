/* 
    飞机类(敌人)
*/
var Enemy  = function (type) {

    //初始化
    this.init = function () {
        this.width = CONFIG[type].width * CONFIG["Game"].unit;
        this.height = CONFIG[type].height * CONFIG["Game"].unit;
        this.posX = Math.random() * (document.documentElement.clientWidth) - this.width/2;
        this.posY = -this.height;
        this.speed = CONFIG[type].speed + 0.5 - Math.random();
        this.live = CONFIG[type].live;
        this.status = 'normal';
        this.boom_delay = 10;//爆炸效果持续10帧
        this.ico = new Image();
        this.ico.src = CONFIG[type].ico;
        this.ico.width = this.width;
        this.ico.height = this.height; 
        this.boomIco = new Image();
        this.boomIco.src = CONFIG[type]["boom-ico"];
        this.score = CONFIG[type].score;       
    }


    //被击中
    this.beenHit = function (damage) {
        this.live -= damage;        
        //如果生命值到达0,爆炸        
        if(this.live <= 0 && this.status === 'normal') {
            this.boom();

        }
    }

    //爆炸效果计时
    this.boom = function () {
        if(this.boom_delay-- < 0){
            this.status = 'boomed';
            return;            
        }
        else
            this.status = 'booming';                      
    }

    //更新位置
    this.update = function () {
        this.posY += this.speed;
    }

    //在画板中绘出飞机
    this.draw = function (ctx) {
        this.status === 'normal' && ctx.drawImage(this.ico, this.posX, this.posY);
        this.status === 'booming' && (this.boom(),ctx.drawImage(this.boomIco, this.posX + (this.width - this.boomIco.width)/2, this.posY + (this.height - this.boomIco.height)/2));
        this.update();       
    }  

    this.init();  
    
    
}