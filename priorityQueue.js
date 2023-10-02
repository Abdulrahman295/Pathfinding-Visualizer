import Cell from "./cell";

export default class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(cell) {
    let contains = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].F > cell.F) {
        this.items.splice(i, 0, cell);
        contains = true;
        break;
      }
    }

    if (!contains) this.items.push(edge);
  }

  dequeue() {
    if (this.isEmpty()) return;
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
