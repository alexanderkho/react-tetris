import { FC } from "react";
import "./Block.css";

interface BaseBlockProps {
  variant?: "active" | "inactive" | "occupied" | "projection";
}

export const Block: FC<BaseBlockProps> = ({ variant = "inactive" }) => {
  // let className = "block";
  // switch (variant) {
  //   case "active":
  //     className += " block active";
  //     break;
  //   case "occupied":
  //     className += " block occupied";
  //     break;
  //   case "projection":
  //     claseName +=
  //   default:
  //     break;
  // }
  const className = `block ${variant}`;

  return <div className={className} />;
};

export const ActiveBlock: FC = () => {
  return <Block variant="active" />;
};

export const OccupiedBlock: FC = () => {
  return <Block variant="occupied" />;
};

export const ProjectionBlock: FC = () => {
  return <Block variant="projection" />;
};
