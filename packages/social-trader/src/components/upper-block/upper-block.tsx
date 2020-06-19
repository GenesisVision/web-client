import React, { useCallback } from "react";

import styles from "./upper-block.module.scss";

export const UpperBlock: React.FC = () => {
  const handleClick = useCallback(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <div onClick={handleClick} className={styles["upper-block"]}>
      <div className={styles["upper-block__arrow"]}>&uarr;</div>
    </div>
  );
};
