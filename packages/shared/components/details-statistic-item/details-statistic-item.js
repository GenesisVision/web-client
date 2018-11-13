import "./details-statistic-item.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const DetailsStatisticItem = ({ label, children, accent, half, className }) => {
  return (
    <div
      className={classnames(
        "details-statistics-item",
        {
          "details-statistics-item--half": half
        },
        className
      )}
    >
      <span className="details-statistics-item__label">{label}</span>
      <span
        className={classnames("details-statistics-item__value", {
          "details-statistics-item__value--accent": accent
        })}
      >
        {children}
      </span>
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
