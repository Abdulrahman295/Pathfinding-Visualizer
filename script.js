"use strict";
import Edge from "./edge";
import PriorityQueue from "./priorityQueue";
const OO = 1e6;

const generateWeight = function (node1, node2) {
  return Math.abs(node1[0] - node2[0]) + Math.abs(node1[1] - node2[1]);
};
