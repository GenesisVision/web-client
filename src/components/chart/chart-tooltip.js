import "./chart-tooltip.scss";

import moment from "moment";
import React from "react";

const ChartTooltip = ({ active = true, heading, body, date }) => {
  if (!active) return null;

  return (
    <div className="gv-tooltip">
      <div className="gv-tooltip__heading">{heading}</div>
      <div className="gv-tooltip__body">{body}</div>
      <div className="gv-tooltip__date">{moment(date).format("ll")}</div>
    </div>
  );
};

export default ChartTooltip;
