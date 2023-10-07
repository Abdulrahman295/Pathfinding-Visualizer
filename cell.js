export default class Cell {
  constructor(parent = null, position = null, F = 0, G = 0, H = 0) {
    this.parent = parent;
    this.position = position;
    this.neighbours = {};
    this.top = this.bottom = this.right = this.left = false;
    this.F = F;
    this.G = G;
    this.H = H;
  }

  tunnelTo(cell) {
    if (this.neighbours.north == cell) {
      this.top = true;
      this.neighbours.north.bottom = true;
    }

    if (this.neighbours.south == cell) {
      this.bottom = true;
      this.neighbours.south.top = true;
    }

    if (this.neighbours.west == cell) {
      this.left = true;
      this.neighbours.west.right = true;
    }

    if (this.neighbours.east == cell) {
      this.right = true;
      this.neighbours.east.left = true;
    }
  }
}
