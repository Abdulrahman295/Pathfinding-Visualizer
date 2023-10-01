import { Edge } from "./edge";

export default class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(edge) {
    let contains = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].weight > edge.weight) {
        this.items.splice(i, 0, edge);
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
