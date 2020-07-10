import { Row } from "components/row/row";
import React from "react";
import { OptionalClickable } from "utils/types";

import styles from "./manager-statistic-item.module.scss";

const _ManagerStatisticItem: React.FC<Props> = ({ onClick, label, value }) => {
  return (
    <div className={styles["manager-statistic-item"]} onClick={onClick}>
      <Row>
        <h3>{label}</h3>
      </Row>
      <Row>{value}</Row>
    </div>
  );
};

interface Props extends OptionalClickable {
  label: string;
  value: string | number;
}

export const ManagerStatisticItem = React.memo(_ManagerStatisticItem);
