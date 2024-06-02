export default class Level {
  constructor(number, enemyCount, enemySpeed, enemyImage, backgroundImageSrc, killCountTarget, title, displayDuration = 3000) {
      this.number = number;
      this.enemyCount = enemyCount;
      this.enemySpeed = enemySpeed;
      this.enemyImage = enemyImage;
      this.backgroundImage = new Image();
      this.backgroundImage.src = backgroundImageSrc;
      this.killCountTarget = killCountTarget; 
      this.killCount = 0;
      this.title = title;
        this.displayDuration = displayDuration; // Duration to display the level title
    }
  }