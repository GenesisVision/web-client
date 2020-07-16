import { Row } from "components/row/row";
import * as React from "react";

import styles from "./dialog.module.scss";

export const _DialogButtons: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => (
  <Row size={"xlarge"} className={styles["dialog__buttons"]}>
    {children}
  </Row>
);

export const DialogButtons = React.memo(_DialogButtons);
