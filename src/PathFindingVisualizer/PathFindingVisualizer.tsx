import React, { useState, useEffect } from "react";
import Node, { NodeType, Cell } from "./Node/Node";

import "./PathFindingVisualizer.css";
import { Grid, GridNode } from "./algorithms/dijkstra";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const ROW_COUNT = 20;
const COL_COUNT = 50;

export default function PathFindingVisualizer(): JSX.Element {
  const [grid, setGrid] = useState<Grid>([]);
  const [placeWall, setPlaceWall] = useState(false);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  // empty array = componentDidMount
  // no dependency = componentDidMount AND componentDidUpdate
  // => using a setState function in a no-dependency useEffect is a no no
  useEffect(() => {
    setGrid(getInitialGrid());
  }, []);

  const handleMouseDown = (position: Cell) => {
    setGrid(getNewGridWithWallToggled(position));
    setMouseIsPressed(true);
  };

  const handleMouseUp = () => setMouseIsPressed(false);

  const handleMouseEnter = (position: Cell) => {
    if (!mouseIsPressed) return;
    setGrid(getNewGridWithWallToggled(position));
  };

  const getNewGridWithWallToggled = (position: Cell): Grid => {
    const { row, col } = position;
    const newGrid: Grid = grid.slice();
    const node: GridNode = newGrid[row][col];
    const newNode = {
      ...node,
      type: toggleWall(row, col) || node.type,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const toggleWall = (row: number, col: number): NodeType | undefined => {
    if (grid[row][col].type === NodeType.Blank && placeWall)
      return NodeType.Wall;
    if (grid[row][col].type === NodeType.Wall && !placeWall)
      return NodeType.Blank;
  };

  const createRow = (row: Array<GridNode>, rowIdx: number): JSX.Element => (
    <div key={rowIdx}>
      {row.map((node: GridNode, nodeIdx: number) => (
        <Node
          key={nodeIdx}
          position={node.position}
          type={node.type}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
        />
      ))}
    </div>
  );

  return (
    <>
      <button onClick={() => setGrid(getInitialGrid)}>Clear Grid</button>
      <button onClick={() => setPlaceWall(!placeWall)}>
        {placeWall ? "Remove" : "Place"} walls
      </button>
      <div className="grid">
        {grid.map((row: Array<GridNode>, rowIdx: number) =>
          createRow(row, rowIdx)
        )}
      </div>
    </>
  );
}

const getInitialGrid = (): Grid => {
  const grid: Grid = [];
  for (let row = 0; row < ROW_COUNT; row++) {
    const currentRow: Array<GridNode> = [];
    for (let col = 0; col < COL_COUNT; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (row: number, col: number): GridNode => {
  return {
    position: { row, col },
    type: createType(row, col),
    distance: Infinity,
    previousNode: null,
  };
};

const createType = (row: number, col: number): NodeType => {
  if (row === START_NODE_ROW && col === START_NODE_COL) return NodeType.Start;
  if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL)
    return NodeType.Finish;
  return NodeType.Blank;
};
