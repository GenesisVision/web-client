import "./statistic-item.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import NumberFormat from "react-number-format";
import { formatValue } from "utils/formatter";

const StatisticItem = ({
  heading,
  value,
  adornment,
  equivalent,
  currency,
  className,
  headingClassName,
  valueClassName,
  equivalentClassName
}) => {
  return (
    <div className={classnames("statistic-item", className)}>
      <div className={classnames("statistic-item__heading", headingClassName)}>
        {heading}
      </div>
      <div className={classnames("statistic-item__value", valueClassName)}>
        <NumberFormat
          value={formatValue(value)}
          thousandSeparator={" "}
          displayType="text"
          suffix={" GVT"}
        />
        {adornment}
      </div>
      <div
        className={classnames(
          "statistic-item__equivalent",
          equivalentClassName
        )}
      >
        <NumberFormat
          value={formatValue(equivalent)}
          thousandSeparator={" "}
          displayType="text"
          suffix={` ${currency}`}
        />
      </div>
    </div>
  );
};

StatisticItem.propTypes = {
  heading: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  equivalent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currency: PropTypes.string,
  className: PropTypes.string,
  headingClassName: PropTypes.string,
  valueClassName: PropTypes.string,
  equivalentClassName: PropTypes.string
};

export default StatisticItem;
