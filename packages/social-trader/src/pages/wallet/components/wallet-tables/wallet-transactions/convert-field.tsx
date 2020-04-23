import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _ConvertField: React.FC<Props> = ({ first, second }) => {
  return (
    <Row>
      <RowItem small>{first}</RowItem>
      {second && <RowItem small>&rarr;</RowItem>}
      <RowItem small>{second}</RowItem>
    </Row>
  );
};

interface Props {
  first: JSX.Element | string;
  second?: JSX.Element | string;
}

const ConvertField = React.memo(_ConvertField);
export default ConvertField;
