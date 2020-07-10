import clsx from "clsx";
import React from "react";
import { Childrenable, Clickable, Sizeable } from "utils/types";

import styles from "./post-input.module.scss";

const _PostInputButton: React.FC<Props> = ({
  size = "middle",
  children,
  onClick
}) => {
  return (
    <div
      className={clsx(styles["post-input__button"], {
        [styles["post-input__button--small"]]: size === "small",
        [styles["post-input__button--middle"]]: size === "middle"
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface Props extends Sizeable, Clickable, Childrenable {}

export const PostInputButton = React.memo(_PostInputButton);
