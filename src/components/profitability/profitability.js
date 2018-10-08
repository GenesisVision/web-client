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

const FORMS = {
  CHIPS: "CHIPS",
  TEXT: "TEXT"
};

const Profitability = ({
  className,
  children,
  value,
  isPositive,
  isNegative,
  prefix,
  form
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
    case "CHIPS":
      return (
        <div
          className={classNames("ellipse", className, {
            "ellipse--positive": isPositiveLocal,
            "ellipse--negative": isNegativeLocal
          })}
        >
          <span>
            {getPrefix(value, prefix)}
            {children}
          </span>
        </div>
      );
    case "TEXT":
    default:
      return (
        <span
          className={classNames("default", className, {
            "default--positive": isPositiveLocal,
            "default--negative": isNegativeLocal
          })}
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
  form: PropTypes.oneOf(Object.keys(FORMS)),
  prefix: PropTypes.oneOf(Object.keys(PREFIXES))
};

export default Profitability;
