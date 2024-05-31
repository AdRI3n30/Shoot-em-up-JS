export default class BossBullet {
    constructor(x, y, width, height, speed) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
      this.image = new Image();
      this.image.src = "/src/gogeta/tir.png"; // Chemin de l'image de la balle du boss
    }
  
    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
    update() {
      this.x -= this.speed;
    }
  
    isOffScreen(canvas) {
      return this.x + this.width < 0;
    }
  }