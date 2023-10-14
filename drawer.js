export default class Drawer {
  #canvas = document.getElementById("canvas");
  #ctx = this.#canvas.getContext("2d");

  constructor() {
    this.#ctx.fillStyle = "skyblue";
    this.#ctx.fillRect(0, 0, 500, 500);
  }

  drawMaze(maze) {
    this.clear();
    this.setLineStyle("black", 7);

    for (let row = 0; row < maze.size; ++row) {
      for (let column = 0; column < maze.size; ++column) {
        this.drawWall(maze.grid[row][column]);
      }
    }

    this.drawStartEndPoints(maze);
  }

  drawWall(cell) {
    if (!cell.left) {
      this.#ctx.moveTo(cell.position[1] * 50, cell.position[0] * 50);
      this.#ctx.lineTo(cell.position[1] * 50, cell.position[0] * 50 + 50);
    }

    if (!cell.bottom) {
      this.#ctx.moveTo(cell.position[1] * 50, cell.position[0] * 50 + 50);
      this.#ctx.lineTo(cell.position[1] * 50 + 50, cell.position[0] * 50 + 50);
    }

    if (!cell.right) {
      this.#ctx.moveTo(cell.position[1] * 50 + 50, cell.position[0] * 50 + 50);
      this.#ctx.lineTo(cell.position[1] * 50 + 50, cell.position[0] * 50);
    }

    if (!cell.top) {
      this.#ctx.moveTo(cell.position[1] * 50 + 50, cell.position[0] * 50);
      this.#ctx.lineTo(cell.position[1] * 50, cell.position[0] * 50);
    }

    this.#ctx.stroke();
  }

  drawStartEndPoints(maze) {
    // draw start point
    let startColumn = Math.floor(Math.random() * maze.size);
    this.#ctx.beginPath();
    this.#ctx.arc(25 + startColumn * 50, 25, 15, 0, 2 * Math.PI);
    this.#ctx.fillStyle = "green";
    this.#ctx.fill();

    // draw end point
    let endColumn = Math.floor(Math.random() * maze.size);
    this.#ctx.beginPath();
    this.#ctx.arc(25 + endColumn * 50, 475, 15, 0, 2 * Math.PI);
    this.#ctx.fillStyle = "red";
    this.#ctx.fill();

    // set start and end points for tha maze
    maze.startCell = maze.grid[0][startColumn];
    maze.endCell = maze.grid[9][endColumn];
  }

  async drawPath(points) {
    // set path start point
    let currentPoint = [25 + points[0][1] * 50, 25 + points[0][0] * 50];
    let newX, newY;

    // begin path
    this.#ctx.beginPath();
    this.#ctx.moveTo(currentPoint[0], currentPoint[1]);

    // draw path
    for (let i = 1; i < points.length; i++) {
      newX = currentPoint[0] + (points[i][1] - points[i - 1][1]) * 50;
      newY = currentPoint[1] + (points[i][0] - points[i - 1][0]) * 50;
      this.#ctx.lineTo(newX, newY);
      currentPoint[0] = newX;
      currentPoint[1] = newY;
    }

    this.setLineStyle("yellow", 3);
    this.#ctx.stroke();
  }

  clear() {
    this.#ctx.reset();
    this.#ctx.fillStyle = "skyblue";
    this.#ctx.fillRect(0, 0, 500, 500);
  }

  setLineStyle(color, width) {
    this.#ctx.strokeStyle = color;
    this.#ctx.lineWidth = width;
  }
}
