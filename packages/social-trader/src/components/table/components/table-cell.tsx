import classNames from "classnames";
import * as React from "react";
import { ReactNode } from "react";

import styles from "./table.module.scss";

const TableCell: React.FC<Props> = ({ className = "", children }) => {
  return (
    <td className={classNames(styles["table__cell"], className)}>{children}</td>
  );
};

interface Props {
  className?: string;
  children?: ReactNode; // TODO fix React.memo type
}

export default React.memo<React.FC<Props>>(TableCell);
