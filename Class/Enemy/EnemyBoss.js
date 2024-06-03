export default class Enemyboss {
  constructor(x, y, width, height, bulletControllerBoss, name, health) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.name = name;
      this.health = health;
      this.maxHealth = health;
      this.bulletControllerBoss = bulletControllerBoss;
      this.speed = 2;
      this.alive = true;
      this.direction = 'right';
      this.directionChangeInterval = 1000;
      this.lastDirectionChangeTime = Date.now();
      this.isAttack = false;
      this.sprites = {
          Gogeta: {
              spriteDefault: "/src/gogeta/default.png",
              spriteShoot: "/src/gogeta/attack.png",
              spriteRight: "/src/gogeta/fly.png",
              spriteDown: "/src/gogeta/down.png",
              spriteUp: "/src/gogeta/up.png",
          },
          Goku: {
              spriteDefault: "/src/Goku/gokudown.png",
              spriteShoot: "/src/Goku/gokuATTACK2.png",
              spriteRight: "/src/Goku/gokumoove.png",
              spriteDown: "/src/Goku/gokudown.png",
              spriteUp: "/src/Goku/gokuup.png",
          },
          Vegeta: {
              spriteDefault: "/src/Vegeta/default.png",
              spriteShoot: "/src/Vegeta/vegetaAttack2.png",
              spriteRight: "/src/Vegeta/vegetamoove.png",
              spriteDown: "/src/Vegeta/vegetadown.png",
              spriteUp: "/src/Vegeta/vegetaup.png",
          }
      };

      this.currentSprite = this.sprites[this.name]?.spriteDefault || this.sprites.Gogeta.spriteDefault;
      this.currentShoot = this.sprites[this.name]?.spriteShoot || this.sprites.Gogeta.spriteShoot;
      this.attackDuration = 4000;
      this.lastAttackTime = 0; 
  }

  draw(ctx ,canvas) {
    if (this.alive) {
      this.shoot();
      this.move(canvas);
      const spriteImage = new Image();
      spriteImage.src = this.currentSprite;
      ctx.drawImage(spriteImage, this.x, this.y, this.width, this.height);
      this.drawHealthBar(ctx);
  }
  }

  drawHealthBar(ctx) {
      const barWidth = this.width;
      const barHeight = 5;
      const barX = this.x;
      const barY = this.y - barHeight - 5;

      ctx.fillStyle = "red";
      ctx.fillRect(barX, barY, barWidth, barHeight);

      ctx.fillStyle = "green";
      ctx.fillRect(barX, barY, (this.health / this.maxHealth) * barWidth, barHeight);
  }

  move(canvas) {
      if (!this.alive) return;

      const now = Date.now();
      if (now - this.lastDirectionChangeTime > this.directionChangeInterval) {
          this.changeDirection();
          this.lastDirectionChangeTime = now;
      }

      const rightBoundary = canvas.width - this.width;
      const leftBoundary = canvas.width / 2;
      const topBoundary = 0;
      const bottomBoundary = canvas.height - this.height;
      switch (this.direction) {
          case 'up':
              if (this.y > topBoundary) {
                  this.y -= this.speed;
                  this.currentSprite = this.sprites[this.name].spriteUp;
              } else {
                  this.changeDirection();
              }
              break;
          case 'down':
              if (this.y < bottomBoundary) {
                  this.y += this.speed;
                  this.currentSprite = this.sprites[this.name].spriteDown;
              } else {
                  this.changeDirection();
              }
              break;
          case 'left':
              if (this.x > leftBoundary) {
                  this.x -= this.speed;
                  this.currentSprite = this.sprites[this.name].spriteRight;
              } else {
                  this.changeDirection();
              }
              break;
          case 'right':
              if (this.x < rightBoundary) {
                  this.x += this.speed
                  this.currentSprite = this.sprites[this.name].spriteRight;
              } else {
                  this.changeDirection();
              }
              break;
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

  shoot() {
      const speed = 5;
      const delay = 500;
      const damage = 1;
      const bulletX = this.x - 300;
      const bulletY = this.y - 70;
      this.bulletControllerBoss.shoot(bulletX, bulletY, speed, damage, delay);
      this.shootTimer = this.shootDuration;
  }
}


