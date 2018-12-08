import "./statistic-item.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import NumberFormat from "react-number-format";

import { formatValue } from "../../utils/formatter";

const LABEL = "LABEL";
const VALUE = "VALUE";

const StatisticItem = ({
  invert,
  large,
  big,
  small,
  label,
  children,
  accent,
  half,
  className,
  equivalent,
  equivalentCurrency
}) => {
  const generateClasses = (item, invert) => {
    switch ((item === VALUE && !invert) || (item === LABEL && invert)) {
      case true:
        return classnames("statistics-item__value", {
          "statistics-item__value--accent": accent,
          "statistics-item__value--small": small,
          "statistics-item__value--big": big,
          "statistics-item__value--large": large
        });
      case false:
      default:
        return "statistics-item__label";
    }
  };

  return (
    <div
      className={classnames(
        "statistics-item",
        {
          "statistics-item--half": half,
          "statistics-item--small": small
        },
        className
      )}
    >
      <div className={"statistics-item__top " + generateClasses(LABEL, invert)}>
        {label}
      </div>
      <div className={generateClasses(VALUE, invert)}>{children}</div>
      {equivalent ? (
        <div className="statistics-item__equivalent">
          {
            <NumberFormat
              value={formatValue(equivalent)}
              thousandSeparator={" "}
              displayType="text"
              suffix={` ${equivalentCurrency}`}
            />
          }
        </div>
      ) : null}
    </div>
  );
};

StatisticItem.propTypes = {
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  equivalent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  equivalentCurrency: PropTypes.string,
  small: PropTypes.bool,
  big: PropTypes.bool,
  large: PropTypes.bool,
  accent: PropTypes.bool,
  half: PropTypes.bool,
  className: PropTypes.string
};

export default StatisticItem;
