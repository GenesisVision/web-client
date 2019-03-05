import "./profitability.scss";

import * as React from "react";

import BaseProfitability from "./base-profitability";
import {
  composeProfitabilityPrefix,
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "./profitability.helper";

interface IProfitabilityProps {
  className?: string;
  value: number | string;
  prefix?: PROFITABILITY_PREFIX;
  variant?: PROFITABILITY_VARIANT;
}

class Profitability extends React.Component<IProfitabilityProps> {
  renderPrefix() {
    const { value, prefix = PROFITABILITY_PREFIX.NO_PREFIX } = this.props;
    if (value > 0) return composeProfitabilityPrefix(prefix).positive;
    if (value < 0) return composeProfitabilityPrefix(prefix).negative;
  }

  render() {
    const {
      className,
      value,
      variant = PROFITABILITY_VARIANT.TEXT,
      children
    } = this.props;

    return (
      <BaseProfitability
        className={className}
        variant={variant}
        isPositive={value > 0}
        isNegative={value < 0}
      >
        <React.Fragment>
          {this.renderPrefix()}
          {children}
        </React.Fragment>
      </BaseProfitability>
    );
  }
}

export default Profitability;
