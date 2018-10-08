import "./profitability.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const PREFIXES = {
  ARROW: {
    NEGATIVE: String.fromCharCode(8595),
    POSITIVE: String.fromCharCode(8593)
  },
  SIGN: {
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
  prefix
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
  return (
    <div
      className={classNames("profitability", className, {
        positive: isPositiveLocal,
        negative: isNegativeLocal
      })}
    >
      {getPrefix(value, prefix)}
      {children}
    </div>
  );
};

Profitability.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  value: PropTypes.number,
  isPositive: PropTypes.bool,
  isNegative: PropTypes.bool,
  prefix: PropTypes.oneOf(Object.keys(PREFIXES))
};

export default Profitability;
