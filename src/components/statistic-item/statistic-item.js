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
  valueClassName
}) => {
  return (
    <div className="statistic-item">
      <div className="statistic-item__heading">{heading}</div>
      <div className={classnames("statistic-item__value", valueClassName)}>
        <NumberFormat
          value={value}
          thousandSeparator={" "}
          displayType="text"
          suffix={" GVT"}
        />
      </div>
      <div className="statistic-item__equivalent">
        <NumberFormat
          value={equivalent}
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
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  equivalent: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  currency: PropTypes.string.isRequired,
  valueClassName: PropTypes.string
};

export default StatisticItem;
