import { Row } from "components/row/row";
import React from "react";
import styled from "styled-components";
import { OptionalClickable } from "utils/types";

interface Props extends OptionalClickable {
  label: string;
  value: string | number;
}

const Container = styled.div`
  cursor: pointer;
`;

const _ManagerStatisticItem: React.FC<Props> = ({ onClick, label, value }) => {
  return (
    <Container onClick={onClick}>
      <Row>
        <h3>{label}</h3>
      </Row>
      <Row>{value}</Row>
    </Container>
  );
};

export const ManagerStatisticItem = React.memo(_ManagerStatisticItem);
