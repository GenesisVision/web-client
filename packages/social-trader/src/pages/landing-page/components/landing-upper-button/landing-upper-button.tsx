import clsx from "clsx";
import { IUpperButtonProps } from "components/upper-button/upper-button";
import React, { useCallback } from "react";

import styles from "./landing-upper-button.module.scss";

export const LandingUpperButton: React.FC<IUpperButtonProps> = ({
  visible
}) => {
  const handleClick = useCallback(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <>
      <div
        onClick={handleClick}
        className={clsx(styles["upper-button"], {
          [styles["upper-button--visible"]]: visible
        })}
      >
        <div className={styles["upper-button__arrow"]}>&uarr;</div>
      </div>
    </>
  );
};
