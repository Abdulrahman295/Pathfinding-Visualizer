"use strict";
import Cell from "./cell";
import PriorityQueue from "./priorityQueue";
import { ROWS, COLUMNS, DR, DC, SIZE } from "./config";
import Maze from "./maze";
import Drawer from "./drawer";

const reloadBtn = document.getElementById("reload");
const solveBtn = document.getElementById("solve");
const clearBtn = document.getElementById("clear");
const drawer = new Drawer();
let maze;

const getHeuristic = function (cellPos, goalPos) {
  return Math.abs(cellPos[0] - goalPos[0]) + Math.abs(cellPos[1] - goalPos[1]);
};

const setWeight = function (currentCell, neighbor, endCell) {
  neighbor.G = currentCell.G + 1;
  neighbor.H = getHeuristic(neighbor.position, endCell.position);
  neighbor.F = neighbor.G + neighbor.H;
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

const addCellNeighbors = function (visited, pq, currentCell, endCell) {
  if (
    currentCell.top &&
    visited[currentCell.neighbours.north.position[0]][
      currentCell.neighbours.north.position[1]
    ] !== 1
  ) {
    setWeight(currentCell, currentCell.neighbours.north, endCell);
    currentCell.neighbours.north.parent = currentCell;
    pq.enqueue(currentCell.neighbours.north);
  }

  if (
    currentCell.bottom &&
    visited[currentCell.neighbours.south.position[0]][
      currentCell.neighbours.south.position[1]
    ] !== 1
  ) {
    setWeight(currentCell, currentCell.neighbours.south, endCell);
    currentCell.neighbours.south.parent = currentCell;
    pq.enqueue(currentCell.neighbours.south);
  }

  if (
    currentCell.right &&
    visited[currentCell.neighbours.east.position[0]][
      currentCell.neighbours.east.position[1]
    ] !== 1
  ) {
    setWeight(currentCell, currentCell.neighbours.east, endCell);
    currentCell.neighbours.east.parent = currentCell;
    pq.enqueue(currentCell.neighbours.east);
  }

  if (
    currentCell.left &&
    visited[currentCell.neighbours.west.position[0]][
      currentCell.neighbours.west.position[1]
    ] !== 1
  ) {
    setWeight(currentCell, currentCell.neighbours.west, endCell);
    currentCell.neighbours.west.parent = currentCell;
    pq.enqueue(currentCell.neighbours.west);
  }
};

const shortestPath = function (maze) {
  const pq = new PriorityQueue();

  const visited = Array(ROWS)
    .fill(0)
    .map(() => new Array(COLUMNS).fill(0));

  pq.enqueue(maze.startCell);

  while (!pq.isEmpty()) {
    const currentCell = pq.dequeue();
    visited[currentCell.position[0]][currentCell.position[1]] = 1;
    if (
      currentCell.position[0] === maze.endCell.position[0] &&
      currentCell.position[1] === maze.endCell.position[1]
    ) {
      maze.solved = true;
      return tracePath(currentCell);
    }

    addCellNeighbors(visited, pq, currentCell, maze.endCell);
  }
  return [];
};

reloadBtn.addEventListener("click", function () {
  maze = new Maze(SIZE);
  maze.generate();
  drawer.drawMaze(maze);
});

solveBtn.addEventListener("click", function () {
  if (!maze || maze.solved) return;
  const path = shortestPath(maze);
  if (path.length === 0) return;
  drawer.drawPath(path);
});

clearBtn.addEventListener("click", function () {
  maze = null;
  drawer.clear();
});
