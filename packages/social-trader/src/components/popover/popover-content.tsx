import classNames from "classnames";
import React from "react";

export const PopoverContent: React.FC<Props &
  React.HTMLAttributes<HTMLDivElement>> = ({
  type,
  children,
  className,
  leftAlign
}) => {
  return (
    <div
      className={classNames("popover-content", className, {
        "popover-content__list--left-align": leftAlign,
        "popover-content__list": type === "list"
      })}
    >
      {children}
    </div>
  );
};

interface Props {
  leftAlign?: boolean;
  className?: string;
  type?: "list";
}

export const PopoverContentListItem: React.FC = ({ children }) => {
  return <div className="popover-content__list-item">{children}</div>;
};
