export default class Boss{

    constructor(x, y, width, height, health, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = health;
        this.speed = speed;
        this.alive = true;
        this.direction = 'right'; 
        this.spriteDefault = new Image();
        this.spriteDefault.src = "/src/gogeta/default.png";
        this.spriteShoot = new Image();
        this.spriteShoot.src = "/src/gogeta/default.png";
        this.spriteRight = new Image();
        this.spriteRight.src = "/src/gogeta/fly.png";
        this.spriteDown = new Image();
        this.spriteDown.src = "/src/gogeta/down.png";
        this.spriteUp = new Image();
        this.spriteUp.src = "/src/gogeta/up.png";
        this.currentSprite = this.spriteDefault;
    }

    draw(ctx) {
        if (this.alive) {
            ctx.drawImage(this.currentSprite, this.x, this.y, this.width, this.height);
        }
    }

    move(canvas) {
        
        const rightBoundary = canvas.width - this.width;
        const topBoundary = 0;
        const bottomBoundary = canvas.height - this.height;

       
        const directions = ['up', 'down', 'left', 'right'];
        if (Math.random() < 0.01) { 
            this.direction = directions[Math.floor(Math.random() * directions.length)];
        }

        switch (this.direction) {
            case 'up':
                if (this.y > topBoundary) this.y -= this.speed;
                this.currentSprite = this.spriteUp;
                break;
            case 'down':
                if (this.y < bottomBoundary) this.y += this.speed;
                this.currentSprite = this.spriteDown;
                break;
            case 'left':
                if (this.x > canvas.width / 2) this.x -= this.speed;
                this.currentSprite = this.spriteRight;
                break;
            case 'right':
                if (this.x < rightBoundary) this.x += this.speed;
                this.currentSprite = this.spriteRight;
                break;
        }
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.alive = false;
        }
    }

    attack(projectiles) {
        if (this.alive) {
            const projectile = {
                x: this.x + this.width / 2,
                y: this.y + this.height,
                width: 5,
                height: 10,
                speed: 5
            };
            projectiles.push(projectile);
        }
    }

    
}