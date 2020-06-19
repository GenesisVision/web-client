import * as React from "react";

import styles from "./add-button.module.scss";

const AddButton: React.FC = () => {
  return (
    <div className={styles["add-button"]}>
      <div className={styles["add-button__button"]}>+</div>
    </div>
  );
};
export default AddButton;
