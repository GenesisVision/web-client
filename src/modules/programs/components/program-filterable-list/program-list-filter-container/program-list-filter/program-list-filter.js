import { translate } from "react-i18next";
import React from "react";
import "rc-slider/assets/index.css";
import "shared/components/form/gv-range/gv-range.css";

import LevelFilter from "./program-filters/level-filter";
import AvgProfitFilter from "./program-filters/avg-profit-filter";
import TotalProfitFilter from "./program-filters/total-profit-filter";

export const TRADER_LEVEL_FILTER_FORM = "traderLevel";
export const PROFIT_AVG_FILTER_FORM = "profitAvg";

// const sortingOptions = [
//   { value: "ByTitle", label: "Name" },
//   { value: "ByLevel", label: "Level" },
//   { value: "ByProfit", label: "Profit" },
//   { value: "ByEndOfPeriod", label: "End Of Period" }
// ];
// const sortingDirectionOptions = [
//   { value: "Asc", label: "Ascending" },
//   { value: "Desc", label: "Descending" }
// ];

const ProgramListFilter = ({ t, filtering, onChangeComplete }) => {
  return (
    <div className="filter-list">
      <div className="filter-item">
        <div className="filter-header">Add filters</div>
        <div className="filter-clear">
          <button className="gv-btn gv-btn-secondary">1</button>
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
    </div>
  );
};

export default translate()(ProgramListFilter);
