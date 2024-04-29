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
}