export default class UnionFind {
  constructor(n) {
    this.parent = new Array(n);
    this.rank = new Array(n);
    for (let i = 0; i < n; i++) {
      this.parent[i] = new Array(n);
      this.rank[i] = new Array(n);
    }

    for (let row = 0; row < n; row++) {
      for (let column = 0; column < n; column++) {
        this.parent[row][column] = [row, column];
        this.rank[row][column] = 1;
      }
    }
  }

  link(r1, c1, r2, c2) {
    if (this.rank[r1][c1] > this.rank[r2][c2]) {
      [r1, r2] = [r2, r1];
      [c1, c2] = [c2, c2];
    }

    this.parent[r1][c1] = [r2, c2];
    if (this.rank[r1][c1] === this.rank[r2][c2]) this.rank[r2][c2]++;
  }

  findSet(row, column) {
    if (
      this.parent[row][column][0] === row &&
      this.parent[row][column][1] === column
    ) {
      return [row, column];
    }

    return (this.parent[row][column] = this.findSet(
      this.parent[row][column][0],
      this.parent[row][column][1]
    ));
  }

  unionSets(r1, c1, r2, c2) {
    [r1, c1] = this.findSet(r1, c1);
    [r2, c2] = this.findSet(r2, c2);

    if (r1 !== r2 || c1 !== c2) {
      this.link(r1, c1, r2, c2);
    }

    return r1 !== r2 || c1 !== c2;
  }
}
