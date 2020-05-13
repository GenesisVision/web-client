import { CloseIcon } from "components/icon/close-icon";
import React from "react";

import styles from "./close-circle-button.module.scss";

const _CloseCircleButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div className={styles["close-circle-button"]} onClick={onClick}>
      <div className={styles["close-circle-button__icon"]}>
        <CloseIcon />
      </div>
    </div>
  );
};

interface Props {
  onClick: VoidFunction;
}

export const CloseCircleButton = React.memo(_CloseCircleButton);
