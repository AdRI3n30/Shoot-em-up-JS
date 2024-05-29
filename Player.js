export default class Player {
  constructor(x, y, bulletController) {
    this.x = x;
    this.y = y;
    this.bulletController = bulletController;
    this.width = 50;
    this.height = 50;
    this.speed = 4;
    this.health = 100; // Points de vie initial
    this.maxHealth = 100; // Points de vie maximum
    this.isGameOver = false; // Indicateur de fin de jeu
    this.spriteDefault = new Image();
    this.spriteDefault.src = "/src/Broly1.png";
    this.spriteShoot = new Image();
    this.spriteShoot.src = "/src/Broly2.png";
    this.spriteLeft = new Image();
    this.spriteLeft.src = "/src/Broly3.png";
    this.shootDuration = 6;
    this.shootTimer = 0;
    this.currentSprite = this.spriteDefault;
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }

  draw(ctx) {
    if (this.isGameOver) {
      this.displayGameOver(ctx);
      return;
    }

    this.move();
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.currentSprite, this.x, this.y, this.width, this.height);
    this.drawHealthBar(ctx);

    if (this.shootTimer > 0) {
      this.currentSprite = this.spriteShoot;
      this.shootTimer--;
    } else {
      this.currentSprite = this.spriteDefault;
    }
    this.shoot();
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

  move() {
    if (this.downPressed && this.y < 550) {
      this.y += this.speed;
    }
    if (this.upPressed && this.y > 0) {
      this.y -= this.speed;
    }
    if (this.leftPressed && this.x > 0) {
      this.x -= this.speed;
      this.currentSprite = this.spriteLeft;
    }
    if (this.rightPressed && this.x < 500) {
      this.x += this.speed;
      this.currentSprite = this.spriteDefault;
    }
  }

  shoot() {
    if (this.shootPressed && this.shootTimer === 0) {
      const speed = 5;
      const delay = 2;
      const damage = 1;
      const bulletX = this.x + this.width / 2;
      const bulletY = this.y;
      this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
      this.shootTimer = this.shootDuration;
    }
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      this.isGameOver = true;
    }
  }

  displayGameOver(ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", ctx.canvas.width / 2, ctx.canvas.height / 2);
  }

  keydown = (e) => {
    if (e.code === "KeyW" || e.code === "ArrowUp") {
      this.upPressed = true;
    }
    if (e.code === "KeyS" || e.code === "ArrowDown") {
      this.downPressed = true;
    }
    if (e.code === "KeyA" || e.code === "ArrowLeft") {
      this.leftPressed = true;
    }
    if (e.code === "KeyD" || e.code === "ArrowRight") {
      this.rightPressed = true;
    }
    if (e.code === "Space") {
      this.shootPressed = true;
    }
  };

  keyup = (e) => {
    if (e.code === "KeyW" || e.code === "ArrowUp") {
      this.upPressed = false;
    }
    if (e.code === "KeyS" || e.code === "ArrowDown") {
      this.downPressed = false;
    }
    if (e.code === "KeyA" || e.code === "ArrowLeft") {
      this.leftPressed = false;
    }
    if (e.code === "KeyD" || e.code === "ArrowRight") {
      this.rightPressed = false;
    }
    if (e.code === "Space") {
      this.shootPressed = false;
    }
  };
}
