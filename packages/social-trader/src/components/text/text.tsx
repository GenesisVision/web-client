import clsx from "clsx";
import React from "react";
import { SizesType } from "utils/types";

import styles from "./text.module.scss";

export type TextColor =
  | "#00ff00"
  | "#ff0000"
  | "white"
  | "red"
  | "green"
  | "yellow";
export type TextWeight = "thin" | "normal" | "bold" | "bolder";

interface Props {
  sizeValue?: string;
  weight?: TextWeight;
  size?: SizesType;
  color?: TextColor;
  muted?: boolean;
  wrap?: boolean;
}

export const Text: React.FC<Props> = ({
  sizeValue,
  weight = "normal",
  size = "middle",
  color,
  muted,
  wrap = true,
  children
}) => {
  return (
    <span
      style={{ fontSize: sizeValue }}
      className={clsx(styles["text"], {
        [styles["text--thin"]]: weight === "thin",
        [styles["text--normal"]]: weight === "normal",
        [styles["text--bold"]]: weight === "bold",
        [styles["text--bolder"]]: weight === "bolder",
        [styles["text--xsmall"]]: size === "xsmall",
        [styles["text--small"]]: size === "small",
        [styles["text--middle"]]: size === "middle",
        [styles["text--large"]]: size === "large",
        [styles["text--xlarge"]]: size === "xlarge",
        [styles["text--white"]]: color === "white",
        [styles["text--red"]]: color === "red" || color === "#ff0000",
        [styles["text--green"]]: color === "green" || color === "#00ff00",
        [styles["text--yellow"]]: color === "yellow",
        [styles["text--wrap"]]: wrap,
        [styles["text--muted"]]: muted
      })}
    >
      {children}
    </span>
  );
};
