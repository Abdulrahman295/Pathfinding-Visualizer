"use strict";
import Cell from "./cell";
import PriorityQueue from "./priorityQueue";
import { ROWS, COLUMNS, DR, DC } from "./config";

const getHeuristic = function (cellPos, goalPos) {
  return Math.abs(cellPos[0] - goalPos[0]) + Math.abs(cellPos[1] - goalPos[1]);
};

const isValid = function (row, column) {
  if (row < 0 || row >= ROWS) return false;
  if (column < 0 || column >= COLUMNS) return false;

  return true;
};

const getNeighbors = function (maze, cell) {
  const neighbors = [];
  const currentRow = cell.position[0];
  const currentColumn = cell.position[1];

  for (let i = 0; i < 4; i++) {
    let newRow = currentRow + DR[i];
    let newColumn = currentColumn + DC[i];
    if (isValid(newRow, newColumn) && maze[newRow][newColumn] !== 0)
      neighbors.push(new Cell(cell, [newRow, newColumn]));
  }

  return neighbors;
};

const tracePath = function (cell) {
  const path = [];
  let currentCell = cell;
  while (currentCell !== null) {
    path.push(currentCell.position);
    currentCell = currentCell.parent;
  }

  return path.reverse();
};

const shortestPath = function (maze, startPos, goalPos) {
  const startCell = new Cell();
  const endCell = new Cell();
  startCell.position = startPos;
  endCell.position = goalPos;

  const pq = new PriorityQueue();

  const visited = Array(ROWS)
    .fill(0)
    .map(() => new Array(COLUMNS).fill(0));

  pq.enqueue(startCell);

  while (!pq.isEmpty()) {
    const currentCell = pq.dequeue();
    visited[currentCell.position[0]][currentCell.position[1]] = 1;
    if (
      currentCell.position[0] === goalPos[0] &&
      currentCell.position[1] === goalPos[1]
    ) {
      return tracePath(currentCell);
    }

    const neighbors = getNeighbors(maze, currentCell);

    neighbors.forEach((neighbor) => {
      if (visited[neighbor.position[0]][neighbor.position[1]] === 1) return;
      neighbor.G = currentCell.G + 1;
      neighbor.H = getHeuristic(neighbor.position, goalPos);
      neighbor.F = neighbor.G + neighbor.H;
      pq.enqueue(neighbor);
    });
  }
  return [];
};

const maze = [
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
