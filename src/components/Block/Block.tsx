import { FC } from "react";
import "./Block.css";

interface BaseBlockProps {
  variant?: "active" | "inactive" | "occupied";
}

export const Block: FC<BaseBlockProps> = ({ variant = "inactive" }) => {
  let className = "block";
  switch (variant) {
    case "active":
      className += " block active";
      break;
    case "occupied":
      className += " block occupied";
      break;
    default:
      break;
  }

  return <div className={className} />;
};

export const ActiveBlock: FC = () => {
  return <Block variant="active" />;
};

export const OccupiedBlock: FC = () => {
  return <Block variant="occupied" />;
};
