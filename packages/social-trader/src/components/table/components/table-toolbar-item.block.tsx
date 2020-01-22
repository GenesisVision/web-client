import "./table.scss";
import React from "react";
import classNames from "classnames";

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
