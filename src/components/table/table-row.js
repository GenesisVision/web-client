import classnames from "classnames";
import React from "react";

const TableRow = ({ className, children }) => {
  return <div className={classnames("table__row", className)}>{children}</div>;
};

export default TableRow;
