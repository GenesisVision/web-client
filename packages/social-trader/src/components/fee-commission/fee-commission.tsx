import "./fee-commission.scss";

import classNames from "classnames";
import * as React from "react";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatValue } from "utils/formatter";

export const FeeCommission: React.FC<Props> = ({
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

export default FeeCommission;

interface Props {
  className?: string;
  title: string;
  value: number | string;
  currency: string;
}
