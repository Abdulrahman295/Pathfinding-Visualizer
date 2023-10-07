import UnionFind from "./UnionFind";
import Cell from "./cell";
export default class Maze {
  constructor(size) {
    this.size = size;
    this.grid = [];
    this.startCell = {};
    this.endCell = {};
    this.#initializeGrid();
  }

  #initializeGrid() {
    for (let row = 0; row < this.size; row++) {
      this.grid.push([]);
      for (let column = 0; column < this.size; column++) {
        this.grid[this.grid.length - 1].push(new Cell(null, [row, column]));
      }
    }

    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        this.grid[row][column].neighbours = {
          north: row === 0 ? null : this.grid[row - 1][column],
          south:
            row === this.grid.length - 1 ? null : this.grid[row + 1][column],
          east:
            column === this.grid.length - 1 ? null : this.grid[row][column + 1],
          west: column === 0 ? null : this.grid[row][column - 1],
        };
      }
    }
  }

  MST_Kruskal() {
    // create a list of all walls.
    let walls = [];
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        let cell = this.grid[row][column];
        if (cell.neighbours.north != null) {
          walls.push([cell, cell.neighbours.north]);
        }

        if (cell.neighbours.east != null) {
          walls.push([cell, cell.neighbours.east]);
        }

        if (cell.neighbours.south != null) {
          walls.push([cell, cell.neighbours.south]);
        }

        if (cell.neighbours.west != null) {
          walls.push([cell, cell.neighbours.west]);
        }
      }
    }

    // shuffle the walls
    for (let i = walls.length - 1; i > 0; i--) {
      let n = Math.floor(Math.random() * i);
      [walls[i], walls[n]] = [walls[n], walls[i]];
    }

    const uf = new UnionFind(this.size);
    for (let i = 0; i < walls.length; ++i) {
      let [cell1, cell2] = walls[i];

      if (
        uf.unionSets(
          cell1.position[0],
          cell1.position[1],
          cell2.position[0],
          cell2.position[1]
        )
      ) {
        cell1.tunnelTo(cell2);
      }
    }
  }

  generateRandomMaze() {}
}
