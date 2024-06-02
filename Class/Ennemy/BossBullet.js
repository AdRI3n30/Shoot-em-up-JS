export default class BossBullet {
    constructor(x, y,speed, damage) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.damage = damage;
      this.image = new Image();
      this.image.src = "/src/gogeta/tire.png";
      this.width = 30;
      this.height = 60;
    }
  
    draw(ctx) {
      this.x -= this.speed;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  
  collideWith(sprite) {
    if (
        this.x < sprite.x + sprite.width &&
        this.x + this.width > sprite.x &&
        this.y < sprite.y + sprite.height &&
        this.y + this.height > sprite.y
    ) {
        sprite.takeDamage(this.damage);
        return true;
    }
    return false;
  }
  
  }