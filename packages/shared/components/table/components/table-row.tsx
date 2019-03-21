import classNames from "classnames";
import * as React from "react";
import { ReactNode } from "react";

const TableRow: React.FC<Props> = ({ className = "", children, ...other }) => (
  <tr className={classNames("table__row", className)} {...other}>
    {children}
  </tr>
);

interface Props {
  onClick?(e: any): void;
  className?: string;
  children: ReactNode;
}

export default React.memo(TableRow);
