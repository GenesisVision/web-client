import "./statistic-item.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import NumberFormat from "react-number-format";

import { formatValue } from "../../utils/formatter";

const StatisticItem = ({
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
      <div className="statistics-item__label">{label}</div>
      <div
        className={classnames("statistics-item__value", {
          "statistics-item__value--accent": accent,
          "statistics-item__value--small": small,
          "statistics-item__value--big": big,
          "statistics-item__value--large": large
        })}
      >
        {children}
      </div>
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
  label: PropTypes.string.isRequired,
  accent: PropTypes.bool,
  half: PropTypes.bool,
  className: PropTypes.string
};

export default StatisticItem;
