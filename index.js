import Player from "./Player.js";
import Enemy from "./Enemy.js";
import BulletControler from "./BulletControler.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

canvas.width = 550;
canvas.height = 550;

const bulletController = new BulletControler(canvas);
const player = new Player(canvas.width / 2.2, canvas.height / 1.3, bulletController);

let enemies = [];
const enemyCount = 5;
const enemyWidth = 50;
const enemyHeight = 50;
const enemySpeed = 1;

let backgroundX = 0;
const backgroundImage = new Image();
backgroundImage.src = "/src/Continent_de_Glace.webp";
const scrollSpeed = 2;


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
  if (player.isGameOver) {
    player.draw(ctx); 
    clearInterval(gameLoopInterval); 
    return;
  }
  
  backgroundX -= scrollSpeed; 
  if (backgroundX <= -canvas.width) {
    backgroundX = 0;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, backgroundX, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, backgroundX + canvas.width, 0, canvas.width, canvas.height);

  player.draw(ctx);
  player.bulletController.draw(ctx);

  enemies.forEach((enemy) => {
    enemy.update(canvas);
    enemy.draw(ctx);

    if (bulletController.collideWith(enemy)) {
      const index = enemies.indexOf(enemy);
      enemies.splice(index, 1);
    }


    if (player.collideWith(enemy)) {
      player.takeDamage(10); 
      const index = enemies.indexOf(enemy);
      enemies.splice(index, 1); 
    }
  });

  // Rajoute des ennemies s'il sont tué
  while (enemies.length < enemyCount) {
    const x = Math.random() * (canvas.width - enemyWidth);
    const y = Math.random() * (canvas.height - enemyHeight) - canvas.height;
    const enemy = new Enemy(x, y, enemyWidth, enemyHeight, '/src/Saibabam.png', enemySpeed);
    enemies.push(enemy);
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



