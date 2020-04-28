import HeaderContainer from "components/header/header.container";
import { Row } from "components/row/row";
import AlertMessageList from "modules/alert-message/components/alert-message-list/alert-message-list";
import React, { ComponentType } from "react";

import styles from "./trade-layout.module.scss";

export const TradeLayout: ComponentType = ({ children }) => {
  return (
    <div className={styles["trade-layout__wrapper"]}>
      <Row className={styles["trade-layout__header"]}>
        <div id="modal-root" />
        <HeaderContainer />
      </Row>
      <div className={styles["trade-layout__main"]}>{children}</div>
      <AlertMessageList />
    </div>
  );
};
