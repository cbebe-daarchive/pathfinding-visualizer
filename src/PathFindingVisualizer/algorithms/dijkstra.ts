import BinaryHeap from "./minheap";
import { NodeType, Cell } from "../Node/Node";

export interface GridNode {
  position: Cell;
  type: NodeType;
  distance: number;
  previousNode: GridNode | null;
}

export type Grid = Array<Array<GridNode>>;

interface SearchProps {
  grid: Grid;
  startNode: GridNode;
  finishNode: GridNode;
}

export const dijkstra = (props: SearchProps) => {
  const { grid, startNode, finishNode } = props;
  const visitedNodesInOrder = [];
};
