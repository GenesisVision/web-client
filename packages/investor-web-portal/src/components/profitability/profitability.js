import "./profitability.scss";

import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import BaseProfitability from "./base-profitability";
import {
  ProfitabilityPrefix,
  ProfitabilityVariant,
  composeProfitabilityPrefix
} from "./profitability.helper";

class Profitability extends PureComponent {
  renderPrefix() {
    const { value, prefix } = this.props;
    if (value > 0) return composeProfitabilityPrefix(prefix).positive;
    if (value < 0) return composeProfitabilityPrefix(prefix).negative;
  }

  render() {
    const { className, value, variant, children } = this.props;

    return (
      <BaseProfitability
        className={className}
        variant={variant}
        isPositive={value > 0}
        isNegative={value < 0}
      >
        {this.renderPrefix()}
        {children}
      </BaseProfitability>
    );
  }
}

Profitability.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  prefix: PropTypes.oneOf(Object.values(ProfitabilityPrefix)),
  variant: PropTypes.oneOf(Object.values(ProfitabilityVariant))
};

Profitability.defaultProps = {
  prefix: "noPrefix",
  variant: "text"
};

export default Profitability;
