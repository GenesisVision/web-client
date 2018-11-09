import "rc-slider/assets/index.css";

import "../../../../../../shared/components/form/gv-range/gv-range.css";

import React from "react";
import { translate } from "react-i18next";

import Button from "../../../../../../components/button/button";
// import AvailableInvestmentFilter from "./program-filters/available-investment-filter";
import AvgProfitFilter from "./program-filters/avg-profit-filter";
import BalanceFilter from "./program-filters/balance-filter";
import LevelFilter from "./program-filters/level-filter";
import TotalProfitFilter from "./program-filters/total-profit-filter";

export const TRADER_LEVEL_FILTER_FORM = "traderLevel";
export const PROFIT_AVG_FILTER_FORM = "profitAvg";

const ProgramFilters = ({ t, filtering, onChangeComplete, onClearFilters }) => {
  return (
    <div className="filter-list">
      <div className="filter-item">
        <div className="filter-item__header-wrapper filter-pane__header-wrapper">
          <div className="filter-item__header">
            <div className="filter-pane__header">Add filters</div>
          </div>
          <div className="filter-item__handler">
            <Button
              secondary
              className="filter-item__button"
              onClick={onClearFilters}
              label="Clear All"
            />
          </div>
        </div>
      </div>
      <LevelFilter filtering={filtering} onFilterChange={onChangeComplete} />
      <AvgProfitFilter
        filtering={filtering}
        onFilterChange={onChangeComplete}
      />
      <TotalProfitFilter
        filtering={filtering}
        onFilterChange={onChangeComplete}
      />
      <BalanceFilter filtering={filtering} onFilterChange={onChangeComplete} />
      {/* <AvailableInvestmentFilter
        filtering={filtering}
        onFilterChange={onChangeComplete}
      /> */}
    </div>
  );
};

export default translate()(ProgramFilters);
