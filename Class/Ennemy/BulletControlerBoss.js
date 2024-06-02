import BossBullet from "./BossBullet.js";

export default class BulletControlerBoss{
    bossBullets = [];
    timerTillNextBullet = 0;
    constructor(canvas){
        this.canvas = canvas;
    }
    shoot(x, y ,speed , damage , delay){
        if(this.timerTillNextBullet <= 0){
            this.bossBullets.push(new BossBullet(x , y , speed, damage));
            this.timerTillNextBullet = delay;
        }
        this.timerTillNextBullet--;
    }
    draw(ctx) {
        this.bossBullets.forEach((bossbullet) => {
            if(this.isBulletOffScreen(bossbullet)){
                const index = this.bossBullets.indexOf(bullet);
                this.bossBullets.splice(index,1);
            }
            bossbullet.draw(ctx)
        }); 
    }

    collideWith(sprite){
        return this.bossBullets.some((bullet) =>{
            if (bossbullet.collideWith(sprite)){
                this.bossBullets.splice(this.bossBullets.indexOf(bossbullet), 1);
                return true;
            }
            return false;
        })

    }

    isBulletOffScreen(bullet){
        return bullet.y <= bullet.height;
    }   
}