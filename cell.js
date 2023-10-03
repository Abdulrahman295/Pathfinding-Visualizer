export default class Cell {
  constructor(parent = null, position = null, F = 0, G = 0, H = 0) {
    this.parent = parent;
    this.position = position;
    this.F = F;
    this.G = G;
    this.H = H;
  }
}
