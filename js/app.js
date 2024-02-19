const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 16;
let count = 0;
let speedThreshold = 8;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0; // Retrieve high score from local storage or start with 0


let snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};

let apple = {
  x: 320,
  y: 320
};

window.wallCollisionEnabled = false;
function placeApple() {
  let applePlaced = false;
  while (!applePlaced) {
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;

    // Check if the apple is placed on the snake
    let appleOnSnake = snake.cells.some(segment => segment.x === apple.x && segment.y === apple.y);

    if (!appleOnSnake) {
      applePlaced = true;
    }
  }
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < speedThreshold) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  // Implement wrapping of snake position here
  if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
    if (window.wallCollisionEnabled) {
      snake.x = 160;
      snake.y = 160;
      snake.cells = [];
      snake.maxCells = 4;
      snake.dx = grid;
      snake.dy = 0;
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
      score = 0;
      document.getElementById('current-score').textContent = score;
      speedThreshold = 8;
      return; // Stop the game loop or implement your game over logic
    } else {
      // Existing wrapping logic
      if (snake.x < 0) {
        snake.x = canvas.width - grid;
      } else if (snake.x >= canvas.width) {
        snake.x = 0;
      }

      if (snake.y < 0) {
        snake.y = canvas.height - grid;
      } else if (snake.y >= canvas.height) {
        snake.y = 0;
      }
    }
  }

  // Update snake cells and length
  snake.cells.unshift({x: snake.x, y: snake.y});
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // Draw apple and snake
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  context.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid-1, grid-1);
  });

  // Check apple collision
  if (snake.x === apple.x && snake.y === apple.y) {
    snake.maxCells++;
    score++;
    placeApple();

    document.getElementById('current-score').textContent = score; // Update current score display
    speedThreshold = Math.max(8 - Math.floor(Math.sqrt(score) / 2), 1); // Ensures speedThreshold does not go below 1
    // Check for high score
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore); // Save new high score in local storage
      document.getElementById('high-score').textContent = highScore; // Update high score display
    }

  }

  // Check collision with the snake itself
  snake.cells.forEach(function(cell, index) {
    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
        score = 0;
        document.getElementById('current-score').textContent = score;
        speedThreshold = 8;
      }
    }
  });
}
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('high-score').textContent = highScore;
});
document.getElementById('wall-collision').addEventListener('change', function() {
  // When the checkbox changes, update a variable that tracks whether wall collisions are enabled
  window.wallCollisionEnabled = this.checked;
});
document.addEventListener('keydown', function(e) {
  if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowDown") {

    e.preventDefault();
  }
  if (e.key === "ArrowLeft" && snake.dy !== 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.key === "ArrowUp" && snake.dx !== 0) {
    snake.dx = 0;
    snake.dy = -grid;
  } else if (e.key === "ArrowRight" && snake.dy !== 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.key === "ArrowDown" && snake.dx !== 0) {
    snake.dx = 0;
    snake.dy = grid;
  }
});


requestAnimationFrame(loop);
