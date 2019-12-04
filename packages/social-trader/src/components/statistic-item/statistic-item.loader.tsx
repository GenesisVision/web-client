import "./statistic-item.scss";

import classNames from "classnames";
import SvgLoader from "components/svg-loader/svg-loader";
import * as React from "react";

const StatisticItemLoader: React.FC<{ className?: string }> = ({
  className
}) => (
  <div className={classNames("statistics-item", className)}>
    <div
      className="statistics-item__top statistics-item__label statistics-item__top statistics-item__label--loader"
      style={{ width: 70 }}
    >
      <SvgLoader height={13} width={70}>
        <rect x="0" y="0" rx="5" ry="5" width="70" height="13" />
      </SvgLoader>
    </div>
    <div className="statistics-item__value" style={{ width: 50 }}>
      <SvgLoader height={15} width={50}>
        <rect x="0" y="0" rx="6" ry="6" width="30" height="15" />
        <rect x="35" y="0" rx="6" ry="6" width="15" height="15" />
      </SvgLoader>
    </div>
  </div>
);

export default StatisticItemLoader;
