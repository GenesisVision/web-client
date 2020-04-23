import { Row } from "components/row/row";
import React from "react";

import "./manager-statistic-item.scss";

const _ManagerStatisticItem: React.FC<Props> = ({ onClick, label, value }) => {
  return (
    <div className="manager-statistic-item" onClick={onClick}>
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
