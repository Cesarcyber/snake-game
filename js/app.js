const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 16;
let count = 0;

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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  // Implement wrapping of snake position here
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
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
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
  }

  // Check collision with the snake itself
  snake.cells.forEach(function(cell, index) {
    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}

document.addEventListener('keydown', function(e) {
  if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowDown") {

    e.preventDefault();
  }
  switch(e.key) {
    case "ArrowLeft":
      if (snake.dx === 0) {
        snake.dx = -grid; snake.dy = 0;
      }
      break;
    case "ArrowUp":
      if (snake.dy === 0) {
        snake.dy = -grid; snake.dx = 0;
      }
      break;
    case "ArrowRight":
      if (snake.dx === 0) {
        snake.dx = grid; snake.dy = 0;
      }
      break;
    case "ArrowDown":
      if (snake.dy === 0) {
        snake.dy = grid; snake.dx = 0;
      }
      break;
  }
});


requestAnimationFrame(loop);
