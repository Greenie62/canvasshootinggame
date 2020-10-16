

class Player{
    constructor(x,y,r,color){
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.isDead = false;
    }

    draw(){
        context.beginPath();
        context.fillStyle=this.color;
        context.arc(this.x,this.y,this.r,Math.PI * 2,false)
        context.fill()
    }


    takeDamage(){
        this.r -= 4

        if(this.r < 20){
            this.isDead = true;
        }
    }
}