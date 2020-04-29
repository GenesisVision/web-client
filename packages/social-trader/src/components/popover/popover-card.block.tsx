import classNames from "classnames";
import React from "react";

import "./popover-content.block.scss";

export const PopoverContentCardBlock: React.FC<IPopoverContentCardBlockProps> = ({
  children,
  dark,
  className,
  size = "middle",
  stretched,
  fixed
}) => {
  return (
    <div
      className={classNames("popover-content__block", className, {
        "popover-content__block--fixed": fixed,
        "popover-content__block--stretched": stretched,
        "popover-content__block--dark": dark,
        "popover-content__block--small": size === "small",
        "popover-content__block--middle": size === "middle",
        "popover-content__block--big": size === "big"
      })}
    >
      {children}
    </div>
  );
};
interface IPopoverContentCardBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  dark?: boolean;
  className?: string;
  size?: "small" | "middle" | "big" | null;
  stretched?: boolean;
  fixed?: boolean;
}

export const PopoverContentCardBlockItem: React.FC = ({ children }) => {
  return <div className="popover-content__block-item">{children}</div>;
};
