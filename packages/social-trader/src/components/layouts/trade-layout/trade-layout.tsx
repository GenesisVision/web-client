import AlertMessageList from "modules/alert-message/components/alert-message-list/alert-message-list";
import React, { ComponentType } from "react";

import styles from "./trade-layout.module.scss";

export const TradeLayout: ComponentType = ({ children }) => {
  return (
    <div className={styles["trade-layout__wrapper"]}>
      <div id="modal-root" />
      <div className={styles["trade-layout__main"]}>{children}</div>
      <AlertMessageList />
    </div>
  );
};
