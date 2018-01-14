// Setup grid
var walkable = 0;
var grid = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Prepare to render
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cellSize = canvas.width / grid.length;

// Render the grid
for (var y = 0; y < grid.length; ++y) {
  for (var x = 0; x < grid[y].length; ++x) {
    if (grid[y][x] == 1) {
      ctx.fillStyle = "black";
    } else {
      ctx.fillStyle = "gray";
    }
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  }
}

// Find the path
var startX = 1;
var startY = 1;
var goalX = 8;
var goalY = 8;
var path = findPath(grid, startX, startY, goalX, goalY, walkable);

// Render the path
ctx.fillStyle = "yellow";
for (var i = 0; i < path.length; ++i) {
  var position = path[i];
  ctx.fillRect(position[0] * cellSize, position[1] * cellSize, cellSize, cellSize);
}
