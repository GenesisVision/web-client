import classnames from "classnames";
import React from "react";

const TableRow = ({ className, children, ...other }) => {
  return (
    <tr className={classnames("table__row", className)} {...other}>
      {children}
    </tr>
  );
};

export default TableRow;
