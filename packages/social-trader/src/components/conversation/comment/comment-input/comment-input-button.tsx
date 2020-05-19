import React from "react";

import styles from "./comment-input.module.scss";

const _CommentInputButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div className={styles["comment-input__button"]} onClick={onClick}>
      {children}
    </div>
  );
};

interface Props {
  children?: string | JSX.Element;
  onClick?: VoidFunction;
}

export const CommentInputButton = React.memo(_CommentInputButton);
