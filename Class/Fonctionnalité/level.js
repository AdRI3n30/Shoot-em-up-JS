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
    new Level(1, 20, 1, "Saibaman","Sbire", "/src/fond/Fond1.png", 10),
    new Level(2, 1, 3, "Vegeta","Boss", "/src/fond/Fond1.png", 1), 
    new Level(3, 20, 2, "Sbire","Sbire", "/src/fond/Continent_de_Glace.webp", 20),
    new Level(4, 1, 3, "Goku","Boss", "/src/fond/Continent_de_Glace.webp", 1)
  ];

  static currentLevelIndex = 0;

  static getCurrentLevel() {
    if (Level.currentLevelIndex < Level.levels.length) {
      return Level.levels[Level.currentLevelIndex];
    } else {
      return null;
    }
  }
  static nextLevel() {
    Level.currentLevelIndex++;
    if (Level.currentLevelIndex < Level.levels.length) {
      console.log(Level.currentLevelIndex)
      return Level.levels[Level.currentLevelIndex];
    } else {
      console.log("Jeu terminé");
        return null;

    }
  }

}