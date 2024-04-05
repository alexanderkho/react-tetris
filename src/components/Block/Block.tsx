import { FC } from "react";

interface BlockProps extends BaseBlockProps {
  variant?: "active" | "inactive" | "occupied" | "projection";
}

interface BaseBlockProps {
  color?: string;
}

// TODO: we shouldn't need 4 variants of `Block`.
export const Block: FC<BlockProps> = ({ variant = "inactive", color }) => {
  let className = "border border-gray-400 grow";
  if (variant === "projection") {
    className += " opacity-40";
  }

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
