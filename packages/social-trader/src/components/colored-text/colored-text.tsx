import classNames from "classnames";
import React from "react";

import styles from "./colored-text.module.scss";

export type ColoredTextColor = "red" | "green" | "yellow";

interface Props {
  color?: ColoredTextColor;
}

export const ColoredText: React.FC<Props> = ({ color, children }) => {
  return (
    <span
      className={classNames(styles["colored-text"], {
        [styles["colored-text--green"]]: color === "green",
        [styles["colored-text--red"]]: color === "red"
      })}
    >
      {children}
    </span>
  );
};
