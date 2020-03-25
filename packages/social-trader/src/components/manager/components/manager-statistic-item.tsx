import { Row } from "components/row/row";
import React from "react";

const _ManagerStatisticItem: React.FC<Props> = ({ label, value }) => {
  return (
    <div>
      <Row>
        <h3>{label}</h3>
      </Row>
      <Row>{value}</Row>
    </div>
  );
};

interface Props {
  label: string;
  value: string | number;
}

export const ManagerStatisticItem = React.memo(_ManagerStatisticItem);
