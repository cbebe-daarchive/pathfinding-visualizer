// maybe later
// import BinaryHeap from "./minheap";
import { NodeType, Cell } from "../Node/Node";

export interface GridNode {
  position: Cell;
  type: NodeType;
  distance: number;
  previousNode: GridNode | null;
}

export type Grid = GridNode[][];

const dijkstra = (
  grid: Grid,
  startNode: GridNode,
  finishNode: GridNode
): GridNode[] => {
  const searchTree: GridNode[] = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift() as GridNode;
    // skip if a wall is encountered
    if (closestNode.type === NodeType.Wall) continue;
    // couldn't find path
    if (closestNode.distance === Infinity) {
      console.log("path not found :(");
      break;
    }
    closestNode.type = NodeType.Visited;
    searchTree.push(closestNode);
    if (closestNode === finishNode) break;
    updateUnvisitedNeighbors(closestNode, grid);
  }
  return searchTree;
};

function sortNodesByDistance(unvisitedNodes: GridNode[]) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getAllNodes(grid: Grid): GridNode[] {
  const nodes = [];
  for (const row of grid) for (const node of row) nodes.push(node);
  return nodes;
}

function updateUnvisitedNeighbors(node: GridNode, grid: Grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node: GridNode, grid: Grid) {
  const neighbors = [];
  const { row, col } = node.position;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => neighbor.type !== NodeType.Visited);
}

export const getNodesInShortestPathOrder = (
  finishNode: GridNode
): GridNode[] => {
  const nodesInShortestPathOrder: GridNode[] = [];
  let currentNode: GridNode | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
};

export default dijkstra;
