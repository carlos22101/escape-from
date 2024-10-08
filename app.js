const player = document.getElementById("player");
const cookie = document.getElementById("cookie");
const gamearea = document.getElementById("game-area");

let playerPosition = { x: 100, y: 100 };
let cookiePosition = { x: 300, y: 300 };

const playerSpeed = 40;
const touchThreshold = 50; 


window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (playerPosition.y > 0) playerPosition.y -= playerSpeed;
      break;
    case 'ArrowDown':
      if (playerPosition.y < gamearea.clientHeight - 50) playerPosition.y += playerSpeed;
      break;
    case 'ArrowLeft':
      if (playerPosition.x > 0) playerPosition.x -= playerSpeed;
      break;
    case 'ArrowRight':
      if (playerPosition.x < gamearea.clientWidth - 50) playerPosition.x += playerSpeed;
      break;
  }
  updatePosition();
});


let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;


gamearea.addEventListener('touchstart', (event) => {
  const touch = event.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});


gamearea.addEventListener('touchend', (event) => {
  touchEndX = event.changedTouches[0].clientX;
  touchEndY = event.changedTouches[0].clientY;
  handleTouchMove();
});

function handleTouchMove() {
  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;


  if (Math.abs(diffX) > Math.abs(diffY)) {
    
    if (diffX > touchThreshold && playerPosition.x < gamearea.clientWidth - 50) {
     
      playerPosition.x += playerSpeed;
    } else if (diffX < -touchThreshold && playerPosition.x > 0) {
      playerPosition.x -= playerSpeed;
    }
  } else {
   
    if (diffY > touchThreshold && playerPosition.y < gamearea.clientHeight - 50) {
     
      playerPosition.y += playerSpeed;
    } else if (diffY < -touchThreshold && playerPosition.y > 0) {
     
      playerPosition.y -= playerSpeed;
    }
  }

  updatePosition();
}

const cookieSpeed = 1;

function moveCookie() {
  if (cookiePosition.x < playerPosition.x) {
    cookiePosition.x += cookieSpeed;
  } else if (cookiePosition.x > playerPosition.x) {
    cookiePosition.x -= cookieSpeed;
  }

  if (cookiePosition.y < playerPosition.y) {
    cookiePosition.y += cookieSpeed;
  } else if (cookiePosition.y > playerPosition.y) {
    cookiePosition.y -= cookieSpeed;
  }

  updatePosition();
  checkCollision();
}


function updatePosition() {
  player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
  cookie.style.transform = `translate(${cookiePosition.x}px, ${cookiePosition.y}px)`;
}

//
function checkCollision() {
  if (Math.abs(playerPosition.x - cookiePosition.x) < 50 &&
      Math.abs(playerPosition.y - cookiePosition.y) < 50) {
    alert('¡La cookie te atrapó!');
    playerPosition = { x: 100, y: 100 };
    cookiePosition = { x: 300, y: 300 };
  }
}


function gameLoop() {
  moveCookie();
  requestAnimationFrame(gameLoop);
}

gameLoop();
