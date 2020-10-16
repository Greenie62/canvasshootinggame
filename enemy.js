
class Enemy{
    constructor(x,y,r,color,vel){
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.velocity = vel;
        this.toDelete = false;
        this.isDead = false;
    }

    draw(){
        context.beginPath();
        context.fillStyle=this.color;
        context.arc(this.x,this.y,this.r,Math.PI * 2,false)
        context.fill()
    }


    update(){
        this.draw()
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if(this.x > canvas.width + 100 ||
           this.x < -100 ||
           this.y > canvas.height + 100 ||
           this.y < -100){
               console.log("off the map");
               this.toDelete = true;
           }
    }


    hitPlayer(player){
        
        let dist = Math.hypot(player.x - this.x,
                              player.y - this.y)
        
        if(dist < player.r){
            this.toDelete = true;
            return true;
        }
   }

   takeDamage(){
       this.r -= 10;

       if(this.r < 12){
           this.isDead = true;
       }
   }
}