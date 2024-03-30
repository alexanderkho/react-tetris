import { FC } from "react";
import "./Block.css";

interface BlockProps extends BaseBlockProps {
  variant?: "active" | "inactive" | "occupied" | "projection";
}

interface BaseBlockProps {
  color?: string;
}

export const Block: FC<BlockProps> = ({ variant = "inactive", color }) => {
  const className = `block ${variant}`;
  const style = color ? { background: color } : {};

  return <div className={className} style={style} />;
};

export const ActiveBlock: FC<BaseBlockProps> = ({ color }) => {
  return <Block variant="active" color={color} />;
};

export const OccupiedBlock: FC<BaseBlockProps> = ({ color }) => {
  return <Block variant="occupied" color={color} />;
};

export const ProjectionBlock: FC<BaseBlockProps> = ({ color }) => {
  return <Block variant="projection" color={color} />;
};
