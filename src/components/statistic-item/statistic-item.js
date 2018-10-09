import "./statistic-item.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import NumberFormat from "react-number-format";

const StatisticItem = ({
  heading,
  value,
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
          value={value}
          thousandSeparator={" "}
          decimalScale={8}
          displayType="text"
          suffix={" GVT"}
        />
      </div>
      <div
        className={classnames(
          "statistic-item__equivalent",
          equivalentClassName
        )}
      >
        <NumberFormat
          value={equivalent}
          thousandSeparator={" "}
          decimalScale={8}
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
