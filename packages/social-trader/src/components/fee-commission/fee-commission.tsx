import "./fee-commission.scss";

import classNames from "classnames";
import { DEFAULT_DECIMAL_SCALE } from "constants/constants";
import * as React from "react";
import { formatValue } from "utils/formatter";

export const _FeeCommission: React.FC<Props> = ({
  title,
  value,
  currency,
  className
}) => (
  <div className={classNames("fee-commission", className)}>
    <span className="fee-commission__title">{title}</span>
    <span className="fee-commission__value">
      {formatValue(value, DEFAULT_DECIMAL_SCALE)}{" "}
      <span className="fee-commission__currency">{currency}</span>
    </span>
  </div>
);

const FeeCommission = React.memo(_FeeCommission);
export default FeeCommission;

interface Props {
  className?: string;
  title: string;
  value: number | string;
  currency: string;
}
