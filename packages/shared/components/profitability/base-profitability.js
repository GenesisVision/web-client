import classnames from "classnames";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import { ProfitabilityVariant } from "./profitability.helper";

class BaseProfitability extends PureComponent {
  render() {
    const { className, variant, isPositive, isNegative, children } = this.props;

    return (
      <div
        className={classnames("profitability", className, {
          "profitability--positive": isPositive,
          "profitability--negative": isNegative,
          "profitability--chips": variant === ProfitabilityVariant.chips
        })}
      >
        {children}
      </div>
    );
  }
}

BaseProfitability.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  isPositive: PropTypes.bool.isRequired,
  isNegative: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(Object.values(ProfitabilityVariant))
};

export default BaseProfitability;
