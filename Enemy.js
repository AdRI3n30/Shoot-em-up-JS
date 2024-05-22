// js/enemy.js

export default class Enemy {
    constructor(x, y, width, height, spriteSrc, speed) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
      this.image = new Image();
      this.image.src = spriteSrc;
      this.imageLoaded = false;
  
      this.image.onload = () => {
        this.imageLoaded = true;
      };
    }
  
    draw(ctx) {
      if (this.imageLoaded) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else {
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
  
    update(canvas) {
      this.y += this.speed;
      if (this.y > canvas.height) {
        this.y = -this.height;
        this.x = Math.random() * (canvas.width - this.width);
      }
    }
  
    takeDamage(damage) {
      // Logique pour gérer les dégâts subis par l'ennemi
    }
  }