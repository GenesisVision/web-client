import classnames from "classnames";
import React from "react";

const TableRow = ({ className, children, ...other }) => {
  return (
    <div className={classnames("table__row", className)} {...other}>
      {children}
    </div>
  );
};

export default TableRow;
