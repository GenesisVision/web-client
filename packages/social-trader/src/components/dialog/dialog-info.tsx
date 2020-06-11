import { Row } from "components/row/row";
import { Text } from "components/text/text";
import * as React from "react";

import styles from "./dialog.module.scss";

export const DialogInfo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => (
  <Row large className={styles["dialog__info"]}>
    <Text muted size={"small"}>
      {children}{" "}
    </Text>
  </Row>
);
