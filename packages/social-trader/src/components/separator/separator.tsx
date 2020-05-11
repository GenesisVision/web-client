import classNames from "classnames";
import React from "react";

import styles from "./separator.module.scss";

interface Props {
  direction?: "horizontal" | "vertical";
}

export const Separator: React.FC<Props> = ({ direction = "horizontal" }) => {
  return (
    <div
      className={classNames(styles["separator"], {
        [styles["separator--horizontal"]]: direction === "horizontal",
        [styles["separator--vertical"]]: direction === "vertical"
      })}
    />
  );
};
