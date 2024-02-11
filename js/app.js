const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity=0;
let yVelocity=0;

function drawGame(){
  changeSnakePosition();
  let result = isGameOver();
  if(result){
    return;
  }

  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();

  setTimeout(drawGame, 1000/ speed);
}

function isGameOver(){
  let gameOver = false;

  // TODO: Add conditions for game over, like hitting the wall or the snake itself

  return gameOver;
}

function clearScreen(){
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
  ctx.fillStyle = 'green';
  for(let i=0; i<snakeParts.length; i++){
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  snakeParts.push({x: headX, y: headY}); //put an item at the end of the list next to the head
  if(snakeParts.length > tailLength){
    snakeParts.shift(); // remove the furthest item from the snake parts if we have more than our tail size
  }

  ctx.fillStyle = 'orange';
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple(){
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision(){
  if(appleX === headX && appleY === headY){
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
  }
}

// Start game loop
drawGame();
