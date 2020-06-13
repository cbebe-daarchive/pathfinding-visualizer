import React from "react";

import "./Node.css";

export interface Position {
  row: number;
  col: number;
}

interface NodeProps {
  position: Position;
  isFinish: boolean;
  isStart: boolean;
  isWall: boolean;
  onMouseUp: () => void;
  onMouseDown: (position: Position) => void;
  onMouseEnter: (position: Position) => void;
}

export default function Node(props: NodeProps): JSX.Element {
  const {
    position,
    isFinish,
    isStart,
    isWall,
    onMouseUp,
    onMouseDown,
    onMouseEnter,
  } = props;
  const { row, col } = position;
  const extraClassName: string = isFinish
    ? "-finish"
    : isStart
    ? "-start"
    : isWall
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
}
