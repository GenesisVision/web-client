import classNames from "classnames";
import * as React from "react";
import { ReactNode } from "react";

const TableCell: React.FC<Props> = ({ className = "", children }) => {
  return <td className={classNames("table__cell", className)}>{children}</td>;
};

interface Props {
  className?: string;
  children?: ReactNode; // TODO fix React.memo type
}

export default React.memo<React.FC<Props>>(TableCell);
