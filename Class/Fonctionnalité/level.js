export default class Level {
  constructor(number, enemyCount, enemySpeed, enemyImage, backgroundImageSrc, killCountTarget,) {
      this.number = number;
      this.enemyCount = enemyCount;
      this.enemySpeed = enemySpeed;
      this.enemyImage = enemyImage;
      this.backgroundImage = new Image();
      this.backgroundImage.src = backgroundImageSrc;
      this.killCountTarget = killCountTarget; 
      this.killCount = 0;
      this.currentLevelIndex = 0;
      this.levels = [
        new Level(1, 5, 1,"/src/ennemy/Saibabam.png" , "/src/fond/Fond1.png", 5),
        new Level(2, 5, 1,"/src/ennemy/Saibabam.png" , "/src/fond/Fond1.png", 5),
        new Level(3, 5, 1,"/src/ennemy/Saibabam.png" , "/src/fond/Fond1.png", 5),
        new Level(4, 5, 1,"/src/ennemy/Saibabam.png" , "/src/fond/Fond1.png", 5),
        new Level(5, 5, 1,"/src/ennemy/Saibabam.png" , "/src/fond/Fond1.png", 5),
        new Level(7, 10, 2,"/src/ennemy/Sbire2.png" ,"/src/fond/Continent_de_Glace.webp", 5,"Level 2 - Défi"),
        new Level(8, 1, 3, Boss.currentSprite, "/src/fond/fond3.png", 1, "Level 2 - Défi")
      ];

    }


      niveauSuivant() {
        this.currentLevelIndex++;
        if (this.currentLevelIndex < levels.length) {
          initLevel(this.currentLevelIndex);
        // } else {
        //   console.log("terminé");
        //   currentLevelIndex = 0;
        //   Player.health = 100; 
        //   showWinMessage();
        //   clearInterval(gameLoopInterval);
        // }
      }
  }

}



  