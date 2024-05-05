export default class Player {
  constructor(x, y, bulletController) {
    this.x = x;
    this.y = y;
    this.bulletController = bulletController;
    this.width = 50;
    this.height = 50;
    this.speed = 4;
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }

  draw(ctx) {
    this.move();
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.shoot();
  }

  move() {
    // Mise à jour des coordonnées du joueur en fonction des touches appuyées
    if (this.downPressed && this.y < 550) {
      this.y += this.speed;
    }
    if (this.upPressed && this.y > 0) {
      this.y -= this.speed;
    }
    if (this.leftPressed && this.x > 0) {
      this.x -= this.speed;
    }
    if (this.rightPressed && this.x< 500) {
      this.x += this.speed;
    }
  }

  shoot() {
    if (this.shootPressed) {
      const speed = 5;
      const delay = 7;
      const damage = 1;
      const bulletX = this.x + this.width / 2;
      const bulletY = this.y;
      this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
    }
  }

  keydown = (e) => {
    // Gestion des touches enfoncées
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
    // Gestion des touches relâchées
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
