import * as React from "react";

import styles from "./spinner.module.scss";

interface ISpinnerProps {
  isShown?: boolean;
}

const Spinner: React.FC<ISpinnerProps> = React.memo(({ isShown }) =>
  isShown ? (
    <div className={styles["gv-spinner__wrapper"]}>
      <div className={styles["gv-spinner"]}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  ) : null
);

export default Spinner;
