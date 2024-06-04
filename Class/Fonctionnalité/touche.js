document.addEventListener("keydown", function(event) {
  const key = event.key.toLowerCase();
  const validKeys = ['z', 'q', 's', 'd', ' '];

  if (validKeys.includes(key)) {
    if (key === ' ') {
      document.getElementById("space").style.backgroundColor = "yellow"; 
    } else {
      document.getElementById(key).style.backgroundColor = "yellow";
    }
  }
});

document.addEventListener("keyup", function(event) {
  const key = event.key.toLowerCase();
  const validKeys = ['z', 'q', 's', 'd', ' ']; 

  if (validKeys.includes(key)) {
    if (key === ' ') {
      document.getElementById("space").style.backgroundColor = "#FF0000"; 
    } else {
      document.getElementById(key).style.backgroundColor = "#FF0000"; 
    }
  }
});

function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Score: ${player.points}`;
}
  