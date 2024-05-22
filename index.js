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
}

function setCommonStyle() {
  ctx.shadowColor = "#d53";
  ctx.shadowBlur = 20;
  ctx.lineJoin = "bevel";
  ctx.lineWidth = 5;
}

startButton.addEventListener("click", startGame);