import React from "react";
import { OptionalClickable } from "utils/types";

import styles from "./comment-input.module.scss";

const _CommentInputButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div className={styles["comment-input__button"]} onClick={onClick}>
      {children}
    </div>
  );
};

interface Props extends OptionalClickable {
  children?: string | JSX.Element;
}

export const CommentInputButton = React.memo(_CommentInputButton);
