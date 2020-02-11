import classNames from "classnames";
import React from "react";

export const TableToolbarItemBlock: React.FC<Props> = ({
  children,
  className
}) => {
  return (
    <div className={classNames("table-toolbar-item-block", className)}>
      {children}
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
