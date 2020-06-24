import { Row } from "components/row/row";
import React from "react";

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

interface Props {
  onClick?: VoidFunction;
  label: string;
  value: string | number;
}

export const ManagerStatisticItem = React.memo(_ManagerStatisticItem);
