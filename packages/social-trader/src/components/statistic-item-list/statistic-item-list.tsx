import "./statistic-item-list.scss";

import classNames from "classnames";
import * as React from "react";

const _StatisticItemList: React.FC<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ children, className, vertical }) => (
  <div
    className={classNames("statistics-item-list", className, {
      "statistics-item-list--vertical": vertical
    })}
  >
    {children}
  </div>
);

interface Props {
  vertical?: boolean;
  className?: string;
}

export const StatisticItemList = React.memo(_StatisticItemList);
