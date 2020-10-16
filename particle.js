
class Particle{
    constructor(x,y,r,color,vel){
        this.x = x;
        this.y = y;
        this.r = r;
        this.enemyX = x;
        this.enemyY = y;
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

    travelDistance(){
        
        let dist = Math.hypot(this.enemyX - this.x,
                              this.enemyY - this.y)
        
        if(dist > 125){
            this.toDelete = true;
            
        }
    }
}