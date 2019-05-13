import "./profitability.scss";

import * as React from "react";

import BaseProfitability from "./base-profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT,
  composeProfitabilityPrefix
} from "./profitability.helper";

const renderPrefix = (value: number | string, prefix: PROFITABILITY_PREFIX) => {
  if (value > 0) return composeProfitabilityPrefix(prefix).positive;
  if (value < 0) return composeProfitabilityPrefix(prefix).negative;
};

const _Profitability: React.FC<Props> = props => {
  const {
    className,
    value,
    variant = PROFITABILITY_VARIANT.TEXT,
    prefix = PROFITABILITY_PREFIX.NO_PREFIX,
    children
  } = props;

  return (
    <BaseProfitability
      className={className}
      variant={variant}
      isPositive={value > 0}
      isNegative={value < 0}
    >
      <>
        {renderPrefix(value, prefix)}
        {children}
      </>
    </BaseProfitability>
  );
};

const Profitability = React.memo(_Profitability);

export default Profitability;

interface Props {
  className?: string;
  value: number | string;
  prefix?: PROFITABILITY_PREFIX;
  variant?: PROFITABILITY_VARIANT;
}
