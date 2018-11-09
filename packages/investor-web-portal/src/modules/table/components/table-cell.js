import classnames from "classnames";
import React from "react";

const TableCell = ({ className, children }) => {
  return <td className={classnames("table__cell", className)}>{children}</td>;
};

export default TableCell;
