import "./profitability.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const PREFIXES = {
  ARROWS: {
    NEGATIVE: String.fromCharCode(8595),
    POSITIVE: String.fromCharCode(8593)
  },
  SCIENCE: {
    NEGATIVE: "-",
    POSITIVE: "+"
  },
  DEFAULT: {
    NEGATIVE: "",
    POSITIVE: ""
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
  let isPositiveLocal;
  let isNegativeLocal;

  if (value !== undefined) {
    isPositiveLocal = isPositive || value > 0;
    isNegativeLocal = isNegative || value < 0;
  }

  const getPrefix = (value, prefix) => {
    return (
      value !== undefined &&
      ((isPositiveLocal && `${PREFIXES[prefix].POSITIVE} `) ||
        (isNegativeLocal && `${PREFIXES[prefix].NEGATIVE} `))
    );
  };

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
            {getPrefix(value, prefix)}
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
          {getPrefix(value, prefix)}
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
  prefix: PropTypes.oneOf(Object.keys(PREFIXES)),
  positiveSymbol: PropTypes.string,
  negativeSymbol: PropTypes.string
};

export default Profitability;
