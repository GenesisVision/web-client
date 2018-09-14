import "./chart-tooltip.scss";

import classnames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";

const ChartTooltip = ({ active = true, heading, body, date, className }) => {
  if (!active) return null;

  return (
    <div className={classnames("gv-tooltip", className)}>
      <div className="gv-tooltip__heading">{heading}</div>
      <div className="gv-tooltip__body">{body}</div>
      <div className="gv-tooltip__date">{moment(date).format("ll")}</div>
    </div>
  );
};

ChartTooltip.propTypes = {
  active: PropTypes.bool,
  heading: PropTypes.string,
  body: PropTypes.node,
  date: PropTypes.instanceOf(Date),
  className: PropTypes.string
};

export default ChartTooltip;
