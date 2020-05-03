import classNames from "classnames";
import * as React from "react";
import { ReactNode } from "react";
import { SizesType } from "utils/types";

import styles from "./table.module.scss";

const TableCell: React.FC<Props> = ({
  height = "medium",
  className = "",
  children
}) => {
  return (
    <td
      className={classNames(styles["table__cell"], className, {
        [styles["table__cell--low"]]: height === "small"
      })}
    >
      {children}
    </td>
  );
};

interface Props {
  height?: SizesType;
  className?: string;
  children?: ReactNode; // TODO fix React.memo type
}

export default React.memo<React.FC<Props>>(TableCell);
