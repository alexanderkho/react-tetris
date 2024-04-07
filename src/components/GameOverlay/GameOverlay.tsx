import { FC, PropsWithChildren } from "react";

export const GameOverlay: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="fixed left-0 top-0 w-full h-full backdrop-blur-md z-10 text-center">
      <div className="mt-80">{children}</div>
    </div>
  );
};
