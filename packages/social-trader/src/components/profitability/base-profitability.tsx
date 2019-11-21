import classNames from "classnames";
import * as React from "react";

import { PROFITABILITY_VARIANT } from "./profitability.helper";

const _BaseProfitability: React.FC<Props> = ({
  className,
  variant,
  isPositive,
  isNegative,
  children
}) => (
  <div
    className={classNames("profitability", className, {
      "profitability--positive": isPositive,
      "profitability--negative": isNegative,
      "profitability--chips": variant === PROFITABILITY_VARIANT.CHIPS
    })}
  >
    {children}
  </div>
);

const BaseProfitability = React.memo(_BaseProfitability);

export default BaseProfitability;

interface Props {
  className?: string;
  children: JSX.Element | string;
  isPositive: boolean;
  isNegative: boolean;
  variant?: PROFITABILITY_VARIANT;
}
