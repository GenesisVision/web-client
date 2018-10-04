import "./profitability.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Profitability = ({
  className,
  children,
  value,
  isPositive,
  isNegative,
  positiveSymbol,
  negativeSymbol,
  ...rest
}) => {
  let isPositiveLocal = isPositive;
  let isNegaitveLocal = isNegative;

  if (value !== undefined) {
    isPositiveLocal = value > 0;
    isNegaitveLocal = value < 0;
  }

  const rootClassName = classNames("profitability", className, {
    "profitability--positive": isPositiveLocal,
    "profitability--negative": isNegaitveLocal
  });

  return (
    <span className={rootClassName} {...rest}>
      {isPositiveLocal && value !== undefined && `${positiveSymbol || "+"} `}
      {isNegaitveLocal && value !== undefined && `${negativeSymbol || "-"} `}
      {children}
    </span>
  );
};

Profitability.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  value: PropTypes.number,
  isPositive: PropTypes.bool,
  isNegative: PropTypes.bool,
  positiveSymbol: PropTypes.string,
  negativeSymbol: PropTypes.string
};

export default Profitability;
