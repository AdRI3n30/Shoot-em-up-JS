export default class BossBullet {
  constructor(x, y, speed, damage) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.damage = damage;
      this.width = 390;
      this.height = 230;
     this.spriteGogeta = {
        spriteAttack: "/src/gogeta/tire.png"
      };
      this.spriteGoku = {
        spriteAttack1: "/src/Goku/gokuATTACK1.png",
        spriteAttack2: "/src/Goku/gokuATTACK2.png",
        spriteAttack3: "/src/Goku/gokuATTACK3.png",
        spriteAttack4: "/src/Goku/gokuATTACK4.png",
        spriteAttack5: "/src/Goku/gokuATTACK5.png",
        spriteAttack6: "/src/Goku/gokuATTACK6.png",
      };
      this.spriteVegeta = {
        spriteAttack1: "/src/Vegeta/VegetaATTACK1.png",
        spriteAttack2: "/src/Vegeta/VegetaATTACK2.png",
        spriteAttack3: "/src/Vegeta/VegetaATTACK3.png",
        spriteAttack4: "/src/Vegeta/VegetaATTACK4.png",
        spriteAttack5: "/src/Vegeta/VegetaATTACK5.png",
        spriteAttack6: "/src/Vegeta/VegetaATTACK6.png",
      };
      this.attack = new Image();
      this.attack.src = this.spriteGogeta.spriteAttack;
  }


  draw(ctx) {
      this.x -= this.speed;
      ctx.drawImage(this.attack, this.x, this.y, this.width, this.height);
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