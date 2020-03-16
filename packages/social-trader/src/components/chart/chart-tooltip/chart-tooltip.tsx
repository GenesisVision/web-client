import "./chart-tooltip.scss";

import classNames from "classnames";
import { MutedText } from "components/muted-text/muted-text";
import * as React from "react";
import { formatDate } from "utils/dates";

const ChartTooltip: React.FC<Props> = ({ heading, body, date, className }) => (
  <div className={classNames("gv-tooltip", className)}>
    <MutedText>{heading}</MutedText>
    <div className="gv-tooltip__body">{body}</div>
    <MutedText small>{formatDate(date)}</MutedText>
  </div>
);

interface Props {
  body: JSX.Element;
  date: string | Date;
  className?: string;
  heading?: string;
}

export default React.memo(ChartTooltip);
