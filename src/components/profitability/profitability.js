import "./profitability.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Profitability = ({ className, children, value, ...rest }) => {
  let isPositive = rest.isPositive;
  let isNegative = rest.isNegative;

  if (value !== undefined) {
    isPositive = value > 0;
    isNegative = value < 0;
  }

  const rootClassName = classNames("profitability", className, {
    "profitability--positive": isPositive,
    "profitability--negative": isNegative
  });

  return (
    <span className={rootClassName} {...rest}>
      {isPositive && value !== undefined && "+ "}
      {isNegative && value !== undefined && "- "}
      {children}
    </span>
  );
};

Profitability.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  value: PropTypes.number,
  isPositive: PropTypes.bool,
  isNegative: PropTypes.bool
};

export default Profitability;
