import { translate } from "react-i18next";
import React from "react";
import { Range, Handle } from "rc-slider";
import "rc-slider/assets/index.css";
import "shared/components/form/gv-range/gv-range.css";

import {
  LEVEL_MAX_FILTER_VALUE,
  LEVEL_MIN_FILTER_VALUE,
  LEVEL_FILTER_NAME,
  AVG_PROFIT_FILTER_NAME
} from "../../../../programs.constants";
import FilterItem from "../../../../../filter-pane/components/filter-item/filter-item";

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

const marks = {
  "-10": "-10%",
  "0": "0%",
  "10": "10%",
  "100": "100%",
  "1000": "1k%"
};

const ProgramListFilter = ({ t, filtering, onChangeComplete }) => {
  return (
    <div className="filter-list">
      <div className="filter-item">
        <div className="filter-header">Add filters</div>
        <div className="filter-clear">
          <button className="gv-btn gv-btn-secondary">1</button>
        </div>
      </div>
      <FilterItem
        name={t("programs-filtering.LEVEL_FILTER_NAME.name")}
        description={t("programs-filtering.LEVEL_FILTER_NAME.description")}
        value={filtering.filters[LEVEL_FILTER_NAME]}
        defaultValue={filtering.defaultFilters[LEVEL_FILTER_NAME]}
        onFilterChange={onChangeComplete(LEVEL_FILTER_NAME)}
      >
        {(value, onChange) => (
          <Range
            dots
            min={LEVEL_MIN_FILTER_VALUE}
            max={LEVEL_MAX_FILTER_VALUE}
            marks={new Array(LEVEL_MAX_FILTER_VALUE)
              .fill(0)
              .reduce((prev, curr, idx) => {
                prev[idx + 1] = idx + 1;
                return prev;
              }, {})}
            value={value}
            onChange={onChange}
            pushable
          />
        )}
      </FilterItem>

      <FilterItem
        name={t("programs-filtering.AVG_PROFIT_FILTER_NAME.name")}
        description={t("programs-filtering.AVG_PROFIT_FILTER_NAME.description")}
        value={filtering.filters[AVG_PROFIT_FILTER_NAME]}
        defaultValue={[-10, 1000]}
        onFilterChange={onChangeComplete(AVG_PROFIT_FILTER_NAME)}
      >
        {(value, onChange) => (
          <Range
            min={-10}
            max={1000}
            marks={marks}
            value={value}
            onChange={onChange}
            pushable
            handle={props => (
              <div key={props.index}>
                <span
                  className="gv-hangle__text"
                  style={{
                    left: `${props.offset - 5}%`
                  }}
                >
                  {props.value}
                </span>
                <Handle {...props} dragging="false" />
              </div>
            )}
          />
        )}
      </FilterItem>
    </div>
  );
};

export default translate()(ProgramListFilter);
