import React from "react";

import "./Node.css";

export interface Cell {
  row: number;
  col: number;
}

export enum NodeType {
  Start,
  Finish,
  Wall,
  Visited,
  Blank,
}

interface NodeProps {
  position: Cell;
  type: NodeType;
  onMouseUp: () => void;
  onMouseDown: (position: Cell) => void;
  onMouseEnter: (position: Cell) => void;
}

const Node = (props: NodeProps) => {
  const { position, type, onMouseUp, onMouseDown, onMouseEnter } = props;
  const { row, col } = position;
  const extraClassName: string =
    type === NodeType.Start
      ? "-start"
      : type === NodeType.Finish
      ? "-finish"
      : type === NodeType.Wall
      ? "-wall"
      : "";
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node${extraClassName}`}
      onMouseUp={() => onMouseUp()}
      onMouseDown={() => onMouseDown(position)}
      onMouseEnter={() => onMouseEnter(position)}
    />
  );
};

export default Node;
