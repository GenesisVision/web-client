import "./statistic-rating-item.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const StatisticRatingItem = ({ label, children, className, ellipse }) => {
  return (
    <div className={classnames("statistics-rating-item", className)}>
      <div className="statistics-rating-item__label">{label}:</div>
      <div
        className={classnames("statistics-rating-item__value", {
          "statistics-rating-item__value--ellipse": ellipse
        })}
      >
        {children}
      </div>
    </div>
  );
};

StatisticRatingItem.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  ellipse: PropTypes.bool
};

export default StatisticRatingItem;
