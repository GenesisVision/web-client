import classNames from "classnames";
import * as React from "react";

const TableCell: React.FC<{ className?: string }> = ({
  className = "",
  children
}) => {
  return <td className={classNames("table__cell", className)}>{children}</td>;
};

export default TableCell;
