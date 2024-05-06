import Player from "./Player.js";
import Enemy from "./Enemy.js";
import BulletControler from "./BulletControler.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

canvas.width = 550;
canvas.height = 600;

const bulletController = new BulletControler(canvas);
const player = new Player(canvas.width / 2.2, canvas.height / 1.3, bulletController);


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomEnemy() {
  var x = getRandomNumber(0, (canvas.width- 50));
  var y = getRandomNumber(0,0); 
  var colors = ["green", "yellow", "red", "blue"]; 
  var color = colors[getRandomNumber(0, colors.length - 1)]; 

  return new Enemy(x, y, color, 1);
}

const enemies = [];

for (var i = 0; i < 3; i++) {
  enemies.push(generateRandomEnemy());
}

let gameLoopInterval;

function startGame() {
  startButton.style.display = "none";
  canvas.style.display = "block";
  gameLoopInterval = setInterval(gameLoop, 1000 / 60);
}

function gameLoop() {
  setCommonStyle();
  ctx.fillStyle = "black";
;  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bulletController.draw(ctx);
  player.draw(ctx);
  enemies.forEach(enemy => {
    if (bulletController.collideWith(enemy)) {
      if (enemy.health <= 0) {
        const index = enemies.indexOf(enemy);
        enemies.splice(index, 1);
      }
    } else {
      enemy.draw(ctx);
    }
    if(enemy.y >= 600){
      const index = enemies.indexOf(enemy);
      enemies.splice(index, 1);
    }
    enemy.draw(ctx);
  })
}

function setCommonStyle() {
  ctx.shadowColor = "#d53";
  ctx.shadowBlur = 20;
  ctx.lineJoin = "bevel";
  ctx.lineWidth = 5;
}

startButton.addEventListener("click", startGame);