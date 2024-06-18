// Setup grid
const walkable = 0;
const grid = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Prepare to render
const canvas = document.getElementById("canvas");
const canvasRect = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");
const cellSize = (canvas.width / grid.length);
const startX = 1;
const startY = 1;
const goalX = 8;
const goalY = 8;

function renderGrid () {
	// Fill each cell as a rectangle
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

	// Render the path
	var path = findPath(grid, startX, startY, goalX, goalY, walkable);
	if (path) {
		ctx.fillStyle = "yellow";
		for (var i = 0; i < path.length; ++i) {
			var position = path[i];
			ctx.fillRect(position[0] * cellSize, position[1] * cellSize, cellSize, cellSize);
		}
	}
}

renderGrid();

// Update the grid on click
var lastTile = null;
function drawTile (e) {
	var x = Math.floor((e.x - canvasRect.x) / cellSize);
	var y = Math.floor((e.y - canvasRect.y) / cellSize);
	if (lastTile && lastTile.x == x && lastTile.y == y) { return; }

	grid[y][x] = grid[y][x] == 0 ? 1 : 0;

	renderGrid();

	lastTile = {
		x: x,
		y: y
	};
}

canvas.addEventListener("mousedown", drawTile);

canvas.addEventListener("mousemove", function (e) {
	if (lastTile) {
		drawTile(e);
	}
});

canvas.addEventListener("mouseup", function (e) {
	lastTile = null;
});