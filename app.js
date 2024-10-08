const player = document.getElementById("player");
const cookie = document.getElementById("cookie");
const gamearea = document.getElementById("game-area");

let playerPosition = { x: 100, y: 100 };
let cookiePosition = { x: 300, y: 300 };

const playerSpeed = 65;
const touchSpeed = 4.5;

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

const cookieSpeed = 2;

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

function checkCollision() {
    if (Math.abs(playerPosition.x - cookiePosition.x) < 50 &&
        Math.abs(playerPosition.y - cookiePosition.y) < 50) {
        alert('Cookie te atrapó');
        playerPosition = { x: 100, y: 100 };
        cookiePosition = { x: 300, y: 300 };
    }
}

function gameLoop() {
    moveCookie();
    requestAnimationFrame(gameLoop);
}
gameLoop();

let touchStartX, touchStartY;

window.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

window.addEventListener('touchmove', (event) => {
    const touchEndX = event.touches[0].clientX;
    const touchEndY = event.touches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            if (playerPosition.x < gamearea.clientWidth - 50) playerPosition.x += touchSpeed;
        } else {
            if (playerPosition.x > 0) playerPosition.x -= touchSpeed;
        }
    } else {
        if (deltaY > 0) {
            if (playerPosition.y < gamearea.clientHeight - 50) playerPosition.y += touchSpeed;
        } else {
            if (playerPosition.y > 0) playerPosition.y -= touchSpeed;
        }
    }
    
    updatePosition();
});
