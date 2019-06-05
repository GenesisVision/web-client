import "./currency-select.scss";

import * as React from "react";
import SvgLoader from "shared/components/svg-loader/svg-loader";
import FilterArrowIcon from "shared/components/table/components/filtering/filter-arrow-icon";

export const CurrencySelectLoader: React.FC = React.memo(() => (
  <div className="select header__currency currency-select">
    <button className="select__value">
      <span className="select__text">
        <div style={{ width: 30 }}>
          <SvgLoader height={13} width={30}>
            <rect x="0" y="0" rx="5" ry="5" width="30" height="13" />
          </SvgLoader>
        </div>
      </span>
      <span className="select__icon">
        <FilterArrowIcon />
      </span>
    </button>
  </div>
));
