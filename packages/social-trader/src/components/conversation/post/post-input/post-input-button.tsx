import React from "react";

import styles from "./post-input.module.scss";

const _PostInputButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div className={styles["post-input__button"]} onClick={onClick}>
      {children}
    </div>
  );
};

interface Props {
  children?: string | JSX.Element;
  onClick?: VoidFunction;
}

export const PostInputButton = React.memo(_PostInputButton);
