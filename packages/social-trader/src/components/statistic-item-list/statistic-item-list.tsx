import "./statistic-item-list.scss";

import classNames from "classnames";
import * as React from "react";

const _StatisticItemList: React.FC<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ children, className }) => (
  <div className={classNames("statistics-item-list", className)}>
    {children}
  </div>
);

interface Props {
  className?: string;
}

export const StatisticItemList = React.memo(_StatisticItemList);
