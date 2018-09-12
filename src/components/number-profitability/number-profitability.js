import "./number-profitability.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const NumberProfitability = ({ className, children, value, ...rest }) => {
  const rootClassName = classNames("number-profitability", className, {
    "number-profitability--positive": value > 0,
    "number-profitability--negative": value < 0
  });

  return (
    <span className={rootClassName} {...rest}>
      {children}
    </span>
  );
};

NumberProfitability.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired
};

export default NumberProfitability;
