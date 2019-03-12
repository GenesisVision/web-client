import classNames from "classnames";
import * as React from "react";

const TableRow: React.FC<{ className?: string }> = ({
  className = "",
  children,
  ...other
}) => {
  return (
    <tr className={classNames("table__row", className)} {...other}>
      {children}
    </tr>
  );
};

export default TableRow;
