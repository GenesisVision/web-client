import clsx from "clsx";
import React from "react";
import { Sizeable } from "utils/types";

import style from "./li.module.scss";

interface Props extends Sizeable {}

export const Li: React.FC<Props> = ({ size = "small", children }) => {
  return (
    <li
      className={clsx(style["li"], {
        [style["li--small"]]: size === "small"
      })}
    >
      {children}
    </li>
  );
};
