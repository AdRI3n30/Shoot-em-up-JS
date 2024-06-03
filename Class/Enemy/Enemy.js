export default class Enemy {
    constructor(x, y, width, height, speed, name) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
      this.name = name;
      this.enemy1 = new Image();
      this.enemy1.src = "/src/enemy/Saibabam.png";
      this.enemy2 = new Image();
      this.enemy2.src = "/src/enemy/Sbire2.png";
      this.imageLoaded = false;

    }
  
    draw(ctx) {
      switch (this.name) {
        case "Saibaman":
          ctx.drawImage(this.enemy1 , this.x, this.y, this.width, this.height);
          break; 
        case "Sbire":
          ctx.drawImage(this.enemy2, this.x, this.y, this.width, this.height);
          break; 
        default:
      }
    }
  
    update(canvas) {
      this.x -= this.speed; 
      if (this.x + this.width < 0) { 
        this.x = canvas.width + Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
      }
    }

    
  }