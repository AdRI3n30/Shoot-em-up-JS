document.addEventListener("keydown", function(event) {
    const key = event.key.toLowerCase();
    const validKeys = ['z', 'q', 's', 'd'];
  
    if (validKeys.includes(key)) {
      document.getElementById(key).style.backgroundColor = "yellow";
    }
  });
  
  document.addEventListener("keyup", function(event) {
    const key = event.key.toLowerCase();
    const validKeys = ['z', 'q', 's', 'd'];
  
    if (validKeys.includes(key)) {
      document.getElementById(key).style.backgroundColor = "black";
    }
  });
  