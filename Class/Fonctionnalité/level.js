export default class Level {
  constructor(number, enemyCount, enemySpeed, enemyName,enemyType, backgroundImageSrc, killCountTarget) {
    this.number = number;
    this.enemyCount = enemyCount;
    this.enemySpeed = enemySpeed;
    this.enemyName = enemyName;
    this.enemyType = enemyType; 
    this.backgroundImage = new Image();
    this.backgroundImage.src = backgroundImageSrc;
    this.killCountTarget = killCountTarget;
    this.killCount = 0;
  }

  static levels = [
    new Level(1, 1, 3, "Gogeta","Boss", "/src/fond/fond3.png", 1) ,
    new Level(2, 5, 1, "Saibaman","Sbire", "/src/fond/Fond1.png", 10),
    new Level(3, 10, 2, "Sbire","Sbire", "/src/fond/Continent_de_Glace.webp", 20), 
    new Level(4, 1, 3, "Gogeta","Boss", "/src/fond/fond3.png", 1) 
  ];

  static currentLevelIndex = 0;

  static getCurrentLevel() {
    return Level.levels[Level.currentLevelIndex];
  }

  static nextLevel() {
    Level.currentLevelIndex++;
    if (Level.currentLevelIndex < Level.levels.length) {
      return Level.levels[Level.currentLevelIndex];
    } else {
      console.log("Jeu terminé");
      Level.currentLevelIndex = 0;
      return null;
    }
  }
}