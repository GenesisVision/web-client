import clsx from "clsx";
import React from "react";
import { Clickable } from "utils/types";

import styles from "./mobile-burger.module.scss";

interface Props extends Clickable {
  menuOpen: boolean;
}

export const MobileBurger: React.FC<Props> = ({ onClick, menuOpen }) => (
  <button
    aria-label="Menu"
    onClick={onClick}
    className={clsx(styles["mobile-burger"], {
      [styles["mobile-burger--open-menu"]]: menuOpen
    })}
  >
    <span className={styles["mobile-burger__item"]} />
    <span className={styles["mobile-burger__item"]} />
  </button>
);
