import classNames from "classnames";
import React from "react";
import { SizesType } from "utils/types";

import styles from "./text.module.scss";

export type TextColor = "white" | "red" | "green" | "yellow";
export type TextWeight = "thin" | "normal" | "bold" | "bolder";

interface Props {
  weight?: TextWeight;
  size?: SizesType;
  color?: TextColor;
  muted?: boolean;
  wrap?: boolean;
}

export const Text: React.FC<Props> = ({
  weight = "normal",
  size = "middle",
  color,
  muted,
  wrap = true,
  children
}) => {
  return (
    <span
      className={classNames(styles["text"], {
        [styles["text--thin"]]: weight === "thin",
        [styles["text--normal"]]: weight === "normal",
        [styles["text--bold"]]: weight === "bold",
        [styles["text--bolder"]]: weight === "bolder",
        [styles["text--xsmall"]]: size === "xsmall",
        [styles["text--small"]]: size === "small",
        [styles["text--middle"]]: size === "middle",
        [styles["text--large"]]: size === "large",
        [styles["text--white"]]: color === "white",
        [styles["text--red"]]: color === "red",
        [styles["text--green"]]: color === "green",
        [styles["text--yellow"]]: color === "yellow",
        [styles["text--wrap"]]: wrap,
        [styles["text--muted"]]: muted
      })}
    >
      {children}
    </span>
  );
};
