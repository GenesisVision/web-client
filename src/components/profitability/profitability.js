import "./profitability.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const prefixes = {
  ARROWS: {
    NEGATIVE: String.fromCharCode(8595),
    POSITIVE: String.fromCharCode(8593)
  },
  MATH: {
    NEGATIVE: "-",
    POSITIVE: "+"
  }
};
const Profitability = ({
  className,
  children,
  value,
  isPositive,
  isNegative,
  prefix,
  form,
  ...rest
}) => {
  let isPositiveLocal = isPositive;
  let isNegativeLocal = isNegative;

  if (value !== undefined) {
    isPositiveLocal = value > 0;
    isNegativeLocal = value < 0;
  }

  switch (form) {
    case "ellipse":
      return (
        <div
          className={classNames("ellipse", className, {
            "ellipse--positive": isPositiveLocal,
            "ellipse--negative": isNegativeLocal
          })}
        >
          <span {...rest}>
            {isPositiveLocal &&
              value !== undefined &&
              `${prefixes[prefix].POSITIVE} `}
            {isNegativeLocal &&
              value !== undefined &&
              `${prefixes[prefix].NEGATIVE} `}
            {children}
          </span>
        </div>
      );
    default:
      return (
        <span
          className={classNames("default", className, {
            "default--positive": isPositiveLocal,
            "default--negative": isNegativeLocal
          })}
          {...rest}
        >
          {isPositiveLocal &&
            value !== undefined &&
            `${prefixes[prefix].POSITIVE} `}
          {isNegativeLocal &&
            value !== undefined &&
            `${prefixes[prefix].NEGATIVE} `}
          {children}
        </span>
      );
  }
};

Profitability.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  value: PropTypes.number,
  isPositive: PropTypes.bool,
  isNegative: PropTypes.bool,
  form: PropTypes.string,
  prefix: PropTypes.string,
  positiveSymbol: PropTypes.string,
  negativeSymbol: PropTypes.string
};

export default Profitability;
