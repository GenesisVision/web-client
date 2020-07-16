import { CloseIcon } from "components/icon/close-icon";
import React from "react";
import { Clickable } from "utils/types";

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

interface Props extends Clickable {}

export const CloseCircleButton = React.memo(_CloseCircleButton);
