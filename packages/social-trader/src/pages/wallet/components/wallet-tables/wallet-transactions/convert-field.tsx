import "./convert-fields.scss";

import React from "react";

const _ConvertField: React.FC<Props> = ({ first, second }) => {
  return (
    <div className="convert-field">
      {first}
      {second && <span className="convert-field__arrow">&rarr;</span>}
      {second}
    </div>
  );
};

interface Props {
  first: JSX.Element | string;
  second?: JSX.Element | string;
}

const ConvertField = React.memo(_ConvertField);
export default ConvertField;
