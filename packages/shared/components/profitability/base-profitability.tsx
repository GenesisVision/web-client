import classNames from "classnames";
import * as React from "react";

import { PROFITABILITY_VARIANT } from "./profitability.helper";

const BaseProfitability: React.FC<Props> = ({
  className,
  variant,
  isPositive,
  isNegative,
  children
}) => {
  return (
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
  // }
};

export default BaseProfitability;

interface Props {
  className?: string;
  children: JSX.Element | string;
  isPositive: boolean;
  isNegative: boolean;
  variant?: PROFITABILITY_VARIANT;
}
