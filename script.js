const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.height = 200;
canvas.width = 800;
const TILE = 20;
const TILE_V = 10;
let bottomLine = 180;
let dinoX = TILE, dinoY = bottomLine, obstacleY = bottomLine;
let obstacleX = [800, 1100, 1300];
let jumps = 5;
const JUMPS = 5;
let yAxe = [bottomLine - TILE_V, bottomLine - TILE, bottomLine - TILE - TILE_V, bottomLine - TILE, bottomLine - TILE_V];
let boardUpdateInterval;
dinoY = 180
let spacePress = 0;

function createBoard() {
    context.fillStyle = "green";
    context.fillRect(dinoX, dinoY, TILE_V, TILE);
    document.addEventListener("keyup", keyIsPressed);
}

function keyIsPressed(e) {
    if (e.code == "Space" && spacePress == 0) {
        ++spacePress;
        boardUpdateInterval = setInterval(updateBoard, 100);
        document.getElementById("press").innerHTML = "Press arrow up to jump";
    } else if (e.code == "ArrowUp" && jumps >= JUMPS) {
        yAxe = [bottomLine - TILE_V, bottomLine - TILE, bottomLine - TILE - TILE_V, bottomLine - TILE, bottomLine - TILE_V];
        jumps = 0;
        dinoY = yAxe[jumps];
    }
}

function updateBoard() {
    context.clearRect(0, 0, canvas.width, canvas.width);
    placeObstacles();
    checkCollision();
    if (jumps < JUMPS) {
        context.fillStyle = "green";
        context.fillRect(dinoX, yAxe[jumps], TILE_V, TILE);
        ++jumps;
    } else {
        context.fillStyle = "green";
        context.fillRect(dinoX, bottomLine, TILE_V, TILE);
    }
}

function placeObstacles() {
    if (obstacleX.includes(0)) {
        let i = obstacleX.indexOf(0);
        obstacleX[i] = canvas.width;
    } else {
        for (let i = 0; i < obstacleX.length; ++i) {
            obstacleX[i] -= TILE;
        }    
    } 
    context.fillStyle = "black";
    for(let i = 0; i < obstacleX.length; ++i) {
        context.fillRect(obstacleX[i], obstacleY, TILE_V, TILE);
    }    
}

function checkCollision() {
    if(jumps >= JUMPS && obstacleX.includes(dinoX) && (obstacleY == dinoY || obstacleY - TILE_V == dinoY)) {
        gameOver();
    } else if (jumps < JUMPS && obstacleX.includes(dinoX) && yAxe[jumps] >= bottomLine - TILE_V) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(boardUpdateInterval);
    document.getElementById("reloadButton").innerHTML += `<button type="button" class="btn btn-light" onclick="window.location.reload()">Play again</button>`;
}
