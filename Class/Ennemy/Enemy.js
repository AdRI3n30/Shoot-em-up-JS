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
      this.x -= this.speed; // Déplacer vers la gauche
      if (this.x + this.width < 0) { // Réinitialiser l'ennemi s'il sort de l'écran
        this.x = canvas.width + Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
      }
    }
  
    takeDamage(damage) {
      // Logique pour gérer les dégâts subis par l'ennemi
    }
  }