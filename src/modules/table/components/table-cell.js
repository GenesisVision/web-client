import classnames from "classnames";
import React from "react";

const TableCell = ({ className, children }) => {
  return <div className={classnames("table__cell", className)}>{children}</div>;
};

export default TableCell;
