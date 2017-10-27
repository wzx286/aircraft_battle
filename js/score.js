var Score = function () {

    this.init = function () {
        this.score = 0;
    }
    
    this.addScore = function (score) {
        this.score += score;
    }

    this.getScore = function () {        
        return this.score;
    }

    this.init();
    
}