import "./statistic-item.scss";

import classNames from "classnames";
import * as React from "react";
import { getRandomInteger, getRandomText } from "shared/utils/helpers";

const _StatisticItemTxtLoader: React.FC<{ className?: string }> = ({
  className
}) => (
  <div className={classNames("statistics-item", className)}>
    <div
      className="statistics-item__top statistics-item__label statistics-item__top statistics-item__label--loader"
      style={{ width: 70 }}
    >
      {getRandomText({ length: getRandomInteger(5, 9), charset: "alphabetic" })}
    </div>
    <div className="statistics-item__value" style={{ width: 50 }}>
      {getRandomText({ length: getRandomInteger(3, 5), charset: "numeric" })}
    </div>
  </div>
);

const StatisticItemTxtLoader = React.memo(_StatisticItemTxtLoader);
export default StatisticItemTxtLoader;
