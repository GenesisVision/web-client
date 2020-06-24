import classNames from "classnames";
import * as React from "react";
import { ReactNode } from "react";

import styles from "./table.module.scss";

const TableRow: React.FC<Props> = ({
  className = "",
  stripy,
  children,
  ...other
}) => (
  <tr
    className={classNames(
      styles["table__row"],
      {
        [styles["table__row--stripy"]]: stripy
      },
      className
    )}
    {...other}
  >
    {children}
  </tr>
);

interface Props {
  onClick?(e: React.MouseEvent<HTMLTableRowElement>): void;
  className?: string;
  stripy?: boolean;
  children: ReactNode;
}

export default React.memo(TableRow);
