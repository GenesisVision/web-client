import "./fee-commission.scss";

import * as React from "react";

export const FeeCommission: React.FC<Props> = ({ title, value, currency }) => (
  <div className={"fee-commission"}>
    <span className={"fee-commission__title"}>{title}</span>
    <span className={"fee-commission__value"}>
      {value} <span className={"fee-commission__currency"}>{currency}</span>
    </span>
  </div>
);

export default FeeCommission;

interface Props {
  title: string;
  value: number | string;
  currency: string;
}
