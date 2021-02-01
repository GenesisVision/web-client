import AlertMessageList from "modules/alert-message/components/alert-message-list/alert-message-list";
import React, { ComponentType, useEffect } from "react";
import { logVersion } from "utils/version";

import styles from "./trade-layout.module.scss";

export const TradeLayout: ComponentType = ({ children }) => {
  useEffect(() => {
    logVersion();
  }, []);
  return (
    <div className={styles["trade-layout__wrapper"]}>
      <div id="modal-root" />
      <div className={styles["trade-layout__main"]}>{children}</div>
      <AlertMessageList />
    </div>
  );
};
