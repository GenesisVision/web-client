import { Row } from "components/row/row";
import { Text } from "components/text/text";
import * as React from "react";

import styles from "./dialog.module.scss";

export const _DialogListItem: React.FC<React.HTMLAttributes<HTMLDivElement> &
  Props> = ({ label, children }) => (
  <Row className={styles["dialog-list__item"]}>
    <Text muted>{label}</Text>
    <span>{children}</span>
  </Row>
);

interface Props {
  label: string;
}

export const DialogListItem = React.memo(_DialogListItem);
