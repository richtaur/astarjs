var Node = function (index, x, y, parent) {
	this.index = index;
	this.x = x;
	this.y = y;
	this.parent = parent || null;
	this.f = 0;
	this.g = 0;
};

Node.prototype.getDistance = function (node) {
	return (Math.abs(this.x - node.x) + Math.abs(this.y - node.y));
};

var Map = function (grid, walkable) {
	this.grid = grid;
	this.width = grid[0].length;
	this.height = grid.length;
	this.walkable = walkable || [0];
};

Map.prototype.isWalkable = function (x, y) {
	if (
		x < 0 || y < 0 ||
		x >= this.width || y >= this.height
	) {
		// Outside the map. Totally NOT walkable!
		return false;
	}
	return this.walkable.indexOf(this.grid[y][x]) > -1;
};

Map.prototype.makeNode = function (x, y, parent) {
	return new Node(
		x + (y * this.width),
		x, y, parent
	);
};

Map.prototype.getAdjacent = function (n) {
	var a = [];
	// North
	if (this.isWalkable(n.x, n.y - 1)) {
		a.push(this.makeNode(n.x, n.y - 1, n));
	}
	// South
	if (this.isWalkable(n.x, n.y + 1)) {
		a.push(this.makeNode(n.x, n.y + 1, n));
	}
	// West
	if (this.isWalkable(n.x - 1, n.y)) {
		a.push(this.makeNode(n.x - 1, n.y, n));
	}
	// East
	if (this.isWalkable(n.x + 1, n.y)) {
		a.push(this.makeNode(n.x + 1, n.y, n));
	}
	return a;
};

var findPath = function (grid, startX, startY, goalX, goalY, walkable) {
	// The search area
	var map = new Map(grid, walkable);

	// The start and goal nodes
	var startNode = map.makeNode(startX, startY);
	var goalNode = map.makeNode(goalX, goalY);

	// List to keep track of open and closed nodes
	var openList = [startNode];
	var closedList = [];

	var length = 0;
	while (length = openList.length) {
		var minF = {
			index: -1,
			f: Infinity
		};

		// Find the node on the open list with the lowest F
		for (var i = 0; i < length; ++i) {
			if (openList[i].f < minF.f) {
				minF.f = openList[i].f;
				minF.index = i;
			}
		}

		// Remove this node from the open list
		var currentNode = openList.splice(minF.index, 1)[0];

		// Did we find the goal node?
		if (currentNode.index === goalNode.index) {
			// Create the final path
			var path = [];
			do {
				path.push([currentNode.x, currentNode.y]);
			} while (currentNode = currentNode.parent);

			// ...and flip it so it's in the right order
			path.reverse();

			return path;
		} else {
			// Haven't found the goal node yet...
			var adjacentList = map.getAdjacent(currentNode);

			// Calculate values for adjacent nodes and add them to the open list if
			// they aren't already closed
			for (var i = 0, j = adjacentList.length; i < j; ++i) {
				var adjacentNode = adjacentList[i];
				if (!closedList[adjacentNode.index]) {
					adjacentNode.g = currentNode.g + adjacentNode.getDistance(currentNode);
					adjacentNode.f = adjacentNode.g + adjacentNode.getDistance(goalNode);
					openList.push(adjacentNode);
					closedList[adjacentNode.index] = true;
				}
			}
		}
	}

	// We didn't find a path to the goal :(
	return null;
};
