import "./statistic-item.scss";

import classNames from "classnames";
import * as React from "react";
import { getRandomInteger, getRandomText } from "shared/utils/helpers";

const _StatisticItemTextLoader: React.FC<Props> = ({
  className,
  label,
  value
}) => (
  <div className={classNames("statistics-item", className)}>
    <div className="statistics-item__top statistics-item__label statistics-item__top statistics-item__label--loader">
      {label ||
        getRandomText({
          length: getRandomInteger(5, 9),
          charset: "alphabetic"
        })}
    </div>
    <div className="statistics-item__value">
      {value ||
        getRandomText({ length: getRandomInteger(3, 5), charset: "numeric" })}
    </div>
  </div>
);

interface Props {
  label?: string;
  value?: string | JSX.Element;
  className?: string;
}

const StatisticItemTextLoader = React.memo(_StatisticItemTextLoader);
export default StatisticItemTextLoader;
