import BossBullet from "./BossBullet.js";

export default class Boss{

    constructor(x, y, width, height, health, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = health;
        this.maxHealth = health;
        this.speed = speed;
        this.alive = true;
        this.direction = 'right'; 
        this.spriteDefault = new Image();
        this.spriteDefault.src = "/src/gogeta/default.png";
        this.spriteShoot = new Image();
        this.spriteShoot.src = "/src/gogeta/attack.png";
        this.spriteRight = new Image();
        this.spriteRight.src = "/src/gogeta/fly.png";
        this.spriteDown = new Image();
        this.spriteDown.src = "/src/gogeta/down.png";
        this.spriteUp = new Image();
        this.spriteUp.src = "/src/gogeta/up.png";
        this.currentSprite = this.spriteDefault;

        this.directionChangeInterval = 1000; // Intervalle de changement de direction en ms
        this.lastDirectionChangeTime = Date.now();


        this.attackInterval = 8000; // Intervalle entre les attaques en ms
        this.lastAttackTime = Date.now();
        this.isAttacking = false; // Indicateur d'attaque

        this.bossBullets = []; // Liste des balles du boss
    }

    draw(ctx) {
        if (this.alive) {
            ctx.drawImage(this.currentSprite, this.x, this.y, this.width, this.height);
            this.drawHealthBar(ctx);
        }
    }

    drawHealthBar(ctx) {
        const barWidth = this.width;
        const barHeight = 5;
        const barX = this.x;
        const barY = this.y - barHeight - 5;
    
        // Barre derrière la vie montrant ainsi les pv perdus
        ctx.fillStyle = "red";
        ctx.fillRect(barX, barY, barWidth, barHeight);
    
        // Barre de vie 
        ctx.fillStyle = "green";
        ctx.fillRect(barX, barY, (this.health / this.maxHealth) * barWidth, barHeight);
      }

      move(canvas) {
        if (this.isAttacking) return; 
        const rightBoundary = canvas.width - this.width;
        const leftBoundary = canvas.width / 2; // Boss can only move in the right half
        const topBoundary = 0;
        const bottomBoundary = canvas.height - this.height;
    
        const now = Date.now();
    
        // Changer de direction à intervalle régulier
        if (now - this.lastDirectionChangeTime > this.directionChangeInterval) {
          this.changeDirection();
          this.lastDirectionChangeTime = now;
        }
    
        // Effectuer le mouvement
        switch (this.direction) {
          case 'up':
            if (this.y > topBoundary) {
              this.y -= this.speed;
              this.currentSprite = this.spriteUp;
            } else {
              this.changeDirection(); // Changer de direction si bloqué
            }
            break;
          case 'down':
            if (this.y < bottomBoundary) {
              this.y += this.speed;
              this.currentSprite = this.spriteDown;
            } else {
              this.changeDirection(); // Changer de direction si bloqué
            }
            break;
          case 'left':
            if (this.x > leftBoundary) {
              this.x -= this.speed;
              this.currentSprite = this.spriteRight;
            } else {
              this.changeDirection(); // Changer de direction si bloqué
            }
            break;
          case 'right':
            if (this.x < rightBoundary) {
              this.x += this.speed;
              this.currentSprite = this.spriteRight;
            } else {
              this.changeDirection(); // Changer de direction si bloqué
            }
            break;
        }
        if (now - this.lastAttackTime > this.attackInterval) {
            this.attack();
            this.lastAttackTime = now;
          }
      }
    
      changeDirection() {
        const directions = ['up', 'down', 'left', 'right'];
        let newDirection = this.direction;
        while (newDirection === this.direction) {
          newDirection = directions[Math.floor(Math.random() * directions.length)];
        }
        this.direction = newDirection;
      }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.alive = false;
        }
    }

    attack() {
        if (this.alive) {
          this.isAttacking = true; // Marquer comme en attaque
          this.currentSprite = this.spriteShoot; // Changer le sprite pour l'attaque
          setTimeout(() => {
            this.currentSprite = this.spriteDefault; // Revenir au sprite par défaut après l'attaque
            this.isAttacking = false; // Fin de l'attaque
          }, 900); // Durée du changement de sprite pendant l'attaque
    
          // Logique de l'attaque ici (par exemple, tirer un projectile)
        }
      }
    
}