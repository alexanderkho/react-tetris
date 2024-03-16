import React, { FC } from "react";
import "./Block.css";

interface BlockProps {
  value: 0 | 1;
  // TODO: how to manage this better
  color?: string;
}

export const Block: FC<BlockProps> = ({ color, value }) => {
  const style: React.CSSProperties = {};
  if (color) {
    style.background = color;
  }

  const className = `block ${value ? "filled" : ""}`;
  return <div className={className} style={style} />;
};
