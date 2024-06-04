export default class Bullet {
    constructor(x, y, speed, damage) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.damage = damage;
        this.color = "yellow";
        this.sprites = [
            this.loadSprite("/src/Broly/blazt1.png"),
            this.loadSprite("/src/Broly/blazt2.png"),
            this.loadSprite("/src/Broly/blazt3.png")
        ];

        this.currentSprite = this.sprites[Math.floor(Math.random() * this.sprites.length)];

        this.width = 15;  
        this.height = 30; 
    }

    loadSprite(src) {
        const img = new Image();
        img.src = src;
        return img;
    }

    draw(ctx) {
        this.x += this.speed;
        ctx.drawImage(this.currentSprite, this.x, this.y, this.width, this.height);
      }

      collideWith(sprite) {
        if (
            this.x < sprite.x + sprite.width &&
            this.x + this.width > sprite.x &&
            this.y < sprite.y + sprite.height &&
            this.y + this.height > sprite.y
        ) {
            if (typeof sprite.takeDamage === 'function') {
                sprite.takeDamage(this.damage);
            }
            return true;
        }
        return false;
    }
}
