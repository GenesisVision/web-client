import classNames from "classnames";
import { Text } from "components/text/text";
import * as React from "react";
import { formatDate } from "utils/dates";

import styles from "./chart-tooltip.module.scss";

const ChartTooltip: React.FC<Props> = ({ heading, body, date, className }) => (
  <div className={classNames(styles["gv-tooltip"], className)}>
    <Text muted>{heading}</Text>
    <div className={styles["gv-tooltip__body"]}>{body}</div>
    <Text muted size={"small"}>
      {formatDate(date)}
    </Text>
  </div>
);

interface Props {
  body: JSX.Element;
  date: string | Date;
  className?: string;
  heading?: string;
}

export default React.memo(ChartTooltip);
