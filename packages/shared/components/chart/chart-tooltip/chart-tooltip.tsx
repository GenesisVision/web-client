import "./chart-tooltip.scss";

import classNames from "classnames";
import moment from "moment";
import * as React from "react";

const ChartTooltip: React.FC<Props> = ({ heading, body, date, className }) => (
  <div className={classNames("gv-tooltip", className)}>
    <div className="gv-tooltip__heading">{heading}</div>
    <div className="gv-tooltip__body">{body}</div>
    <div className="gv-tooltip__date">{moment(date).format("lll")}</div>
  </div>
);

interface Props {
  body: JSX.Element;
  date: string | Date;
  className: string;
  heading?: string;
}

export default React.memo(ChartTooltip);
