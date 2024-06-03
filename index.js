import Player from "./Class/Player/Player.js";
import Enemy from "./Class/Ennemy/Enemy.js";
import BulletControler from "./Class/Player/BulletControler.js";
import Level from './Class/Fonctionnalité/level.js';
import Boss from './Class/Ennemy/EnnemyBoss.js';
import BulletControllerBoss from "./Class/Ennemy/BulletControlerBoss.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const winMessage = document.getElementById("winMessage");
const restartButton = document.getElementById("restartButton");

canvas.width = 1050;
canvas.height = 550;

const bulletController = new BulletControler(canvas);
const player = new Player(canvas.width / 2.2, canvas.height / 1.3, bulletController);



let player2;
let enemies = [];
const enemyCount = 5;
const enemyWidth = 50;
const enemyHeight = 50;
let boss;
const bulletControllerBoss = new BulletControllerBoss(canvas);

let backgroundX = 0;
const scrollSpeed = 2;


function initLevel(levelIndex) {
  const level = Level.levels[levelIndex];
  backgroundX = 0;
  player2 = new Player(canvas.width / 2.2, canvas.height / 1.3, bulletController);
  enemies = [];
  
  // Créez les ennemis pour les niveaux
  if (levelIndex === 2) { 
    boss = new Boss(canvas.width - 200, canvas.height / 2 - 100, bulletControllerBoss);
  } else {
    while (enemies.length < level.enemyCount) {
      const y = Math.random() * (canvas.height - enemyHeight);
      const x = canvas.width + Math.random() * canvas.width;
      const enemy = new Enemy(x, y, enemyWidth, enemyHeight, level.enemyImage, level.enemySpeed);
      enemies.push(enemy);
    }
  }
}

let gameLoopInterval;

function startGame() {
  player.reset();
  winMessage.style.visibility = 'hidden';
  startButton.style.display = "none";
  winMessage.classList.add("hidden");
  canvas.style.display = "block";
  initLevel(0);
  gameLoopInterval = setInterval(gameLoop, 1000 / 60);
}



function gameLoop() {
  if (player.isGameOver) {
    console.log(player.isGameOver);
    player.draw(ctx); 
    clearInterval(gameLoopInterval); 
    return;
  }
  const level = Level.levels[currentLevelIndex];
  backgroundX -= scrollSpeed; 
  if (backgroundX <= -canvas.width) {
    backgroundX = 0;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(level.backgroundImage, backgroundX, 0, canvas.width, canvas.height);
  ctx.drawImage(level.backgroundImage, backgroundX + canvas.width, 0, canvas.width, canvas.height);

  do{
    player.playTransformation(ctx);
  }while (Player.isTransfo == false);
  player.draw(ctx);
  player.bulletController.draw(ctx);

  if (currentLevelIndex === 2) {  // Niveau du Boss
    if (boss && boss.alive) {
      boss.move(canvas);
      boss.draw(ctx);

      if (bulletController.collideWith(boss)) {
        boss.takeDamage(10);
        if (!boss.alive) {
          niveauSuivant();
        }
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
        niveauSuivant();
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
restartButton.addEventListener("click", startGame);



