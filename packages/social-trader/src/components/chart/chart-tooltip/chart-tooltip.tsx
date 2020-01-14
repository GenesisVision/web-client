import "./chart-tooltip.scss";

import classNames from "classnames";
import * as React from "react";
import { formatDate } from "utils/dates";

const ChartTooltip: React.FC<Props> = ({ heading, body, date, className }) => (
  <div className={classNames("gv-tooltip", className)}>
    <div className="gv-tooltip__heading">{heading}</div>
    <div className="gv-tooltip__body">{body}</div>
    <div className="gv-tooltip__date">{formatDate(date)}</div>
  </div>
);

interface Props {
  body: JSX.Element;
  date: string | Date;
  className?: string;
  heading?: string;
}

export default React.memo(ChartTooltip);
