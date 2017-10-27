var hasCollision = function (obj1,obj2) {
    return (obj1.posX < obj2.posX + obj2.width - obj1.width/2) 
        && (obj1.posX > obj2.posX - obj1.width/2)
        && (obj1.posY > obj2.posY - obj1.height/2)
        && (obj1.posY < obj2.posY + obj2.height - obj1.height/2);
}