import "./statistic-rating-item.scss";

import classNames from "classnames";
import * as React from "react";

interface IStatisticRatingItemProps {
  label: string;
  className?: string;
  ellipse?: boolean;
}

const StatisticRatingItem: React.FC<IStatisticRatingItemProps> = ({
  label,
  children,
  className,
  ellipse
}) => {
  return (
    <div className={classNames("statistics-rating-item", className)}>
      <div className="statistics-rating-item__label">{label}:</div>
      <div
        className={classNames("statistics-rating-item__value", {
          "statistics-rating-item__value--ellipse": ellipse
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default StatisticRatingItem;
