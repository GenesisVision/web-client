import "./statistic-item.scss";

import classnames from "classnames";
import React from "react";
import NumberFormat from "react-number-format";

const StatisticItem = ({
  header,
  value,
  equivalent,
  currency,
  valueClassName
}) => {
  return (
    <div className="statistic-item">
      <div className="statistic-item__heading">{header}</div>
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

StatisticItem.propTypes = {};

export default StatisticItem;
