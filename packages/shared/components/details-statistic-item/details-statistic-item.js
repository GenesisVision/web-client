import "./details-statistic-item.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { formatValue } from "../../utils/formatter";
import NumberFormat from "react-number-format";

const DetailsStatisticItem = ({
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
        "details-statistics-item",
        {
          "details-statistics-item--half": half,
          "details-statistics-item--small": small
        },
        className
      )}
    >
      <div className="details-statistics-item__label">{label}</div>
      <div
        className={classnames("details-statistics-item__value", {
          "details-statistics-item__value--accent": accent,
          "details-statistics-item__value--small": small,
          "details-statistics-item__value--big": big,
          "details-statistics-item__value--large": large
        })}
      >
        {children}
      </div>
      {equivalent ? (
        <div className="details-statistics-item__equivalent">
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

DetailsStatisticItem.propTypes = {
  label: PropTypes.string.isRequired,
  accent: PropTypes.bool,
  half: PropTypes.bool,
  className: PropTypes.string
};

export default DetailsStatisticItem;
