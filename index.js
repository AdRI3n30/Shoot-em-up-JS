import Player from "./Player.js";
import Enemy from "./Enemy.js";
import BulletControler from "./BulletControler.js";
import Level from './level.js';


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

canvas.width = 550;
canvas.height = 550;

const bulletController = new BulletControler(canvas);
const player = new Player(canvas.width / 2.2, canvas.height / 1.3, bulletController);


let player2;
let enemies = [];
const enemyCount = 5;
const enemyWidth = 50;
const enemyHeight = 50;
const enemySpeed = 3;

let backgroundX = 0;
const scrollSpeed = 2;


let currentLevelIndex = 0;
const levels = [
  new Level(1, 5, 2,"/src/Saibabam.png" , "/src/Fond1.png", 5),
  new Level(2, 10, 3,"/src/Sbire2.png" ,"/src/Continent_de_Glace.webp", 5),
];


function initLevel(levelIndex) {
  const level = levels[levelIndex];
  backgroundX = 0;
  player2 = new Player(canvas.width / 2.2, canvas.height / 1.3, bulletController);
  enemies = [];
  console.log(level.enemyImage);
  
  // Créez les ennemis pour ce niveau
  while (enemies.length < level.enemyCount) {
    const y = Math.random() * (canvas.height - enemyHeight);
    const x = canvas.width + Math.random() * canvas.width;
    const enemy = new Enemy(x, y, enemyWidth, enemyHeight, level.enemyImage, level.enemySpeed);
    enemies.push(enemy);
  }
}
let gameLoopInterval;

function startGame() {
  startButton.style.display = "none";
  canvas.style.display = "block";
  initLevel(0);
  gameLoopInterval = setInterval(gameLoop, 1000 / 60);
}




function gameLoop() {
  if (player.isGameOver) {
    player.draw(ctx); 
    clearInterval(gameLoopInterval); 
    return;
  }

  if (player.isWin) {
    player.draw(ctx); 
    clearInterval(gameLoopInterval); 
    return;
  }
  
  
  const level = levels[currentLevelIndex];
  backgroundX -= scrollSpeed; 
  if (backgroundX <= -canvas.width) {
    backgroundX = 0;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(level.backgroundImage, backgroundX, 0, canvas.width, canvas.height);
  ctx.drawImage(level.backgroundImage, backgroundX + canvas.width, 0, canvas.width, canvas.height);

  player.draw(ctx);
  player.bulletController.draw(ctx);

  enemies.forEach((enemy) => {
    enemy.update(canvas);
    enemy.draw(ctx);

    if (bulletController.collideWith(enemy)) {
      const index = enemies.indexOf(enemy);
      enemies.splice(index, 1);
      level.killCount++;
    }


    if (player.collideWith(enemy)) {
      player.takeDamage(10); 
      const index = enemies.indexOf(enemy);
      enemies.splice(index, 1); 
    }

    console.log(level.killCount);
    if (level.killCount >= level.killCountTarget) {
      advanceToNextLevel();
      level.killCount = 0;
    }
  });

  // Rajoute des ennemies s'il sont tué
  while (enemies.length < enemyCount) {
    const x = Math.random() * (canvas.width - enemyWidth);
    const y = Math.random() * (canvas.height - enemyHeight) - canvas.height;
    const enemy = new Enemy(x, y, enemyWidth, enemyHeight, level.enemyImage, level.enemySpeed);
    enemies.push(enemy);
  }
}



function advanceToNextLevel() {
  currentLevelIndex++;
  if (currentLevelIndex < levels.length) {
    initLevel(currentLevelIndex);
  } else {
    // Le jeu est terminé
    Player.isWin = true;
    clearInterval(gameLoopInterval);
  }
}

// Fonction permettant la vérification des collisions
Player.prototype.collideWith = function (sprite) {
  return (
    this.x < sprite.x + sprite.width &&
    this.x + this.width > sprite.x &&
    this.y < sprite.y + sprite.height &&
    this.y + this.height > sprite.y
  );
};


startButton.addEventListener("click", startGame);



