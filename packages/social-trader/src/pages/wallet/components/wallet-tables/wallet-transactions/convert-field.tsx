import "./convert-fields.scss";

import { Row } from "components/row/row";
import React from "react";

const _ConvertField: React.FC<Props> = ({ first, second }) => {
  return (
    <Row>
      {first}
      {second && <span className="convert-field__arrow">&rarr;</span>}
      {second}
    </Row>
  );
};

interface Props {
  first: JSX.Element | string;
  second?: JSX.Element | string;
}

const ConvertField = React.memo(_ConvertField);
export default ConvertField;
