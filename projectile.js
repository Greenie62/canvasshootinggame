
class Bullet{
    constructor(x,y,r,color,vel){
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.velocity = vel;
        this.toDelete = false;
    }

    draw(){
        context.beginPath();
        context.fillStyle=this.color;
        context.arc(this.x,this.y,this.r,Math.PI * 2,false)
        context.fill()
    }


    update(){
        this.draw()
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;

        if(this.x > canvas.width + this.r ||
           this.x < -this.r ||
           this.y > canvas.height + this.r ||
           this.y < -this.r){
               console.log("off the map");
               this.toDelete = true;
           }
    }


    hit(enemy){
        
        let dist = Math.hypot(enemy.x - this.x,
                              enemy.y - this.y)
        
        if(dist < enemy.r){
            this.toDelete = true;
            return true;
            
        }
    }
}