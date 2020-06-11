import styles from "pages/social/social/social-page.module.scss";
import React, { useCallback } from "react";

export const UpperBlock = () => {
  const handleClick = useCallback(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <div onClick={handleClick} className={styles["upper-block"]}>
      <div className={styles["upper-block__arrow"]}>&uarr;</div>
    </div>
  );
};
