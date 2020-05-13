import classNames from "classnames";
import React from "react";

import styles from "./mobile-burger.module.scss";

interface Props {
  onClick(): void;
  menuOpen: boolean;
}

export const MobileBurger: React.FC<Props> = ({ onClick, menuOpen }) => (
  <button
    aria-label="Menu"
    onClick={onClick}
    className={classNames(styles["mobile-burger"], {
      [styles["mobile-burger--open-menu"]]: menuOpen
    })}
  >
    <span className={styles["mobile-burger__item"]} />
    <span className={styles["mobile-burger__item"]} />
  </button>
);
