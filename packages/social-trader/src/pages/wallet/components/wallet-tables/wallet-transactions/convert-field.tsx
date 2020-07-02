import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _ConvertField: React.FC<Props> = ({ first, second }) => {
  return (
    <Row>
      <RowItem size={"small"}>{first}</RowItem>
      {second && <RowItem size={"small"}>&rarr;</RowItem>}
      <RowItem size={"small"}>{second}</RowItem>
    </Row>
  );
};

interface Props {
  first: JSX.Element | string;
  second?: JSX.Element | string;
}

const ConvertField = React.memo(_ConvertField);
export default ConvertField;
