import "./icon.scss";

import classNames from "classnames";
import * as React from "react";

export interface IIconProps {
  type?: string;
  primary?: boolean;
  secondary?: boolean;
  rotate?: boolean;
  selected?: boolean;
  className?: string;
  onClick?(event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
}

export const Icon: React.FC<IIconProps> = ({
  type,
  className,
  onClick,
  primary,
  secondary,
  children,
  rotate,
  selected
}) => {
  return (
    <span
      className={classNames("icon", `icon--${type}`, className, {
        "icon--primary": primary,
        "icon--secondary": secondary,
        "icon--rotate": rotate,
        "icon--selected": selected
      })}
      onClick={onClick}
    >
      {children}
    </span>
  );
};
