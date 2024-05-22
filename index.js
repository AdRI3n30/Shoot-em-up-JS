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

let enemies = [];
const enemyCount = 5;
const enemyWidth = 50;
const enemyHeight = 50;
const enemySpeed = 2;

for (let i = 0; i < enemyCount; i++) {
  const x = Math.random() * (canvas.width - enemyWidth);
  const y = Math.random() * (canvas.height - enemyHeight) - canvas.height;
  const enemy = new Enemy(x, y, enemyWidth, enemyHeight, '/src/Saibabam.png', enemySpeed);
  enemies.push(enemy);
}

let gameLoopInterval;

function startGame() {
  startButton.style.display = "none";
  canvas.style.display = "block";
  gameLoopInterval = setInterval(gameLoop, 1000 / 60);
}

function gameLoop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bulletController.draw(ctx);
  player.draw(ctx);

  enemies.forEach((enemy) => {
    enemy.update(canvas);
    enemy.draw(ctx);

    if (bulletController.collideWith(enemy)) {
      const index = enemies.indexOf(enemy);
      enemies.splice(index, 1);
    }
  });

  // Rajouter de nouveaux ennemis si nécessaire
  while (enemies.length < enemyCount) {
    const x = Math.random() * (canvas.width - enemyWidth);
    const y = Math.random() * (canvas.height - enemyHeight) - canvas.height;
    const enemy = new Enemy(x, y, enemyWidth, enemyHeight, '/src/Saibabam.png', enemySpeed);
    enemies.push(enemy);
  }
}


startButton.addEventListener("click", startGame);