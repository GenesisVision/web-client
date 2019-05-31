import "./statistic-item.scss";

import classNames from "classnames";
import * as React from "react";

export const StatisticItemLoader: React.FC<{ className?: string }> = ({
  className
}) => (
  <div className={classNames("statistics-item", className)}>
    <div className="statistics-item__top statistics-item__label">123</div>
    <div className="statistics-item__value">123</div>
  </div>
);
