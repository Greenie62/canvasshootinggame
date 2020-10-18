var canvas = document.querySelector("canvas");

var playerScore =0;
var playerLevel =1;



canvas.width = innerWidth;
canvas.height = innerHeight;

var context = canvas.getContext('2d');

context.fillStyle='black';
context.fillRect(0,0,canvas.width,canvas.height);

context.fillStyle='white'
context.font = "30px Arial";
context.textAlign="center"
context.fillText("Canvas Shooter", canvas.width/2, 50);
context.fillText(`Score:${playerScore}`, canvas.width/2, 100);
context.fillText(`Level:${playerLevel}`,canvas.width/2,150)


let playerX = canvas.width/2;
let playerY = canvas.height/2;


let player = new Player(playerX,playerY,40,'white');
let bullets = [];
let enemies = [];
let particles = [];
let kills = 0;
let enemySpeed = .6

let enemyInterval;
let gameInterval;



function spawnEnemy(){

    let enemyX =  Math.random() * canvas.width | 0;
    let enemyY =  Math.random() * canvas.height | 0;


     if(Math.random() > .5){
        if(enemyX > playerX){
           enemyX = canvas.width + 50;
                            }
         else{
        enemyX = -50
              }
            }
         if(enemyY > playerY){
            enemyY = canvas.height + 50;
                              }
        else{
            enemyY = -50
        }
    
//}

        let angle = Math.atan2(playerY - enemyY,
                               playerX - enemyX)

        let velocity = {x:Math.cos(angle) * enemySpeed,
                        y:Math.sin(angle) * enemySpeed
                       }

                       console.log(velocity)
                      
                       let color=`hsl(${Math.random() * 300 | 0},100%,50%)`

            enemies.push(new Enemy(enemyX,enemyY,((Math.random() * 45 | 0)+10),color,velocity))

            console.log(enemies)
    
}

enemyInterval = setInterval(spawnEnemy,1750)

canvas.addEventListener("ontouchstart",(e)=>shootBullet(e))
// addEventListener("click",(e)=>shootBullet(e))


function shootBullet(e){

    let {clientY, clientX} = e

    console.log(clientY,clientX)

    let angle = Math.atan2(clientY - playerY,
                          clientX - playerX)

    let velocity = {x:Math.cos(angle) * 4,
                    y:Math.sin(angle) * 4}

    bullets.push(new Bullet(playerX,playerY,4,'white',velocity))
}




function gameLoop(){
    gameInterval = requestAnimationFrame(gameLoop);

    context.fillStyle='rgba(0,0,0,.4)'
    context.fillRect(0,0,canvas.width,canvas.height)

    context.fillStyle='white'
    context.font = "30px Arial";
    context.textAlign="center"
    context.fillText("Canvas Shooter", canvas.width/2, 50);
    context.fillText(`Score:${playerScore} Level:${playerLevel}`, canvas.width/2, 100);
    // context.fillText(`Level:${playerLevel}`,canvas.width/2,150)



    player.draw()


    bullets.forEach((bullet,idx)=>{
        bullet.update()
        enemies.forEach((enemy,index)=>{
            if(bullet.hit(enemy)){

                enemy.takeDamage()
                playerScore +=20;
            }
        })
        if(bullet.toDelete){
            bullets.splice(idx,1);
            console.log("BulletsComputated: " + bullets.length)
        }
    })

    enemies.forEach((enemy,idx)=>{
        enemy.update()
        if(enemy.toDelete){
            enemies.splice(idx,1)
            console.log("EnemiesLength: " + enemies.length)
        }
        if(enemy.isDead){
            explodeParticles(enemy)
            enemies.splice(idx,1)
            kills++
          
        }

        if(enemy.hitPlayer(player)){
            explodeParticles(player)
            player.takeDamage()
        }

        if(player.isDead){
            console.log("Game over")
            cancelAnimationFrame(gameInterval)
            clearInterval(enemyInterval)
            setTimeout(()=>{
                window.location.reload()
            },1500)
        }
    })

    particles.forEach((p,idx)=>{
        p.update()
        p.travelDistance()

        if(p.toDelete){
            particles.splice(idx,1)
        }
    })

    if(kills === 10){
        kills = 0;
        playerLevel++
        enemySpeed = enemySpeed + .1
    }
}




gameLoop()


function explodeParticles(enemy){
    for(let i=0;i<8;i++){
        particles.push(new Particle(enemy.x,enemy.y,Math.random() * 4 | 0,enemy.color,{x:Math.random(),y:Math.random()}))
    }
}


