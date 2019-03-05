import classNames from "classnames";
import * as React from "react";

import { PROFITABILITY_VARIANT } from "./profitability.helper";

interface IBaseProfitabilityProps {
  className?: string;
  children: JSX.Element | string;
  isPositive: boolean;
  isNegative: boolean;
  variant?: PROFITABILITY_VARIANT;
}
class BaseProfitability extends React.Component<IBaseProfitabilityProps> {
  render() {
    const { className, variant, isPositive, isNegative, children } = this.props;

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
  }
}

export default BaseProfitability;
