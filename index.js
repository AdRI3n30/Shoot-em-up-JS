import Player from "./Class/Player/Player.js";
import Enemy from "./Class/Enemy/Enemy.js";
import BulletControler from "./Class/Player/BulletControler.js";
import Level from './Class/Fonctionnalité/level.js';
import EnemyBoss from './Class/Enemy/EnemyBoss.js';
import BulletControllerBoss from "./Class/Enemy/BulletControlerBoss.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const winMessage = document.getElementById("winMessage");
const restartButton = document.getElementById("restartButton");

canvas.width = 1050;
canvas.height = 550;

const bulletController = new BulletControler(canvas);
const player = new Player(canvas.width / 2.2, canvas.height / 1.3, bulletController);


let enemies = [];
const enemyWidth = 50;
const enemyHeight = 50;
let boss;
const bulletControllerBoss = new BulletControllerBoss(canvas);

let backgroundX = 0;
const scrollSpeed = 2;


function initLevel(levelIndex) {
  const level = Level.levels[levelIndex];
  backgroundX = 0;
  enemies = [];

  if (level.enemyType === "Boss") { 
    if(level.enemyName !="Gogeta"){
      console.log("BOSSmini")
      boss = new EnemyBoss(canvas.width - 200, canvas.height / 2 - 100,80, 80, bulletControllerBoss, level.enemyName, 150);
    }else{
      boss = new EnemyBoss(canvas.width - 200, canvas.height / 2 - 100,100,100, bulletControllerBoss, level.enemyName, 200);
      console.log("BOSS")
    }
} else {
    console.log("SBIRE")
    while (enemies.length < level.enemyCount) {
        const y = Math.random() * (canvas.height - enemyHeight);
        const x = canvas.width + Math.random() * canvas.width;
        const enemy = new Enemy(x, y, enemyWidth, enemyHeight, level.enemySpeed, level.enemyName);
        enemies.push(enemy);
    }
}
}

let gameLoopInterval;

function startGame() {
  player.reset();
  player.transform();
  winMessage.style.visibility = 'hidden';
  startButton.style.display = "none";
  winMessage.classList.add("hidden");
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
  const level = Level.getCurrentLevel();
  if (level === null) {
    console.log('Terminé')
    clearInterval(gameLoopInterval); 
    winMessage.style.visibility = 'visible'; 
    return;
  }
  backgroundX -= scrollSpeed; 
  if (backgroundX <= -canvas.width) {
    backgroundX = 0;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(level.backgroundImage, backgroundX, 0, canvas.width, canvas.height);
  ctx.drawImage(level.backgroundImage, backgroundX + canvas.width, 0, canvas.width, canvas.height);
  player.draw(ctx);
  player.bulletController.draw(ctx);

  if (level.enemyType == "Boss") { 
    if (boss && boss.alive) {
      boss.draw(ctx, canvas);
      boss.bulletControllerBoss.draw(ctx);

      if (bulletController.collideWith(boss)) {
        boss.takeDamage(10);
        if (!boss.alive) {
          Level.nextLevel();
        }
      }

      if (bulletControllerBoss.collideWith(player)) {
        player.takeDamage(30);
      }

      if (player.collideWith(boss)) {
        player.takeDamage(10);
      }
    }
  } else {
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
      if (level.killCount >= level.killCountTarget) {
        Level.nextLevel();
        level.killCount = 0;
        initLevel(Level.currentLevelIndex);

      }
    });
    while (enemies.length < level.enemyCount) {
      const y = Math.random() * (canvas.height - enemyHeight);
      const x = canvas.width + Math.random() * canvas.width;
      const enemy = new Enemy(x, y,enemyWidth, enemyHeight,level.enemySpeed,level.enemyName);
      enemies.push(enemy);
    }
  }
}

Player.prototype.collideWith = function (sprite) {
  return (
    this.x < sprite.x + sprite.width &&
    this.x + this.width > sprite.x &&
    this.y < sprite.y + sprite.height &&
    this.y + this.height > sprite.y
  );
};


startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", () => {
  Level.currentLevelIndex = 0; 
  startGame(); 
});



