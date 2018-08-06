import { Handle, Range } from "rc-slider";
import React from "react";
import { translate } from "react-i18next";

import FilterItem from "../../../../../../filter-pane/components/filter-item/filter-item";
import { RANGE_FILTER_TYPE } from "../../../../../../filtering/filtering.constants";
import { TOTAL_PROFIT_FILTER_NAME } from "../../../../../programs.constants";

const formatValue = value => {
  if (value === 0) return 0;
  const suffixes = ["", "k", "M"];
  const power = Math.floor(Math.log10(Math.abs(value)) / Math.log10(1000));
  let formattedValue = +(value / Math.pow(1000, power)).toFixed(2);
  formattedValue += suffixes[power];
  return formattedValue;
};

const AvgProfitFilter = ({ t, filtering, onFilterChange }) => {
  const handleFilterChange = value => {
    return onFilterChange(TOTAL_PROFIT_FILTER_NAME, RANGE_FILTER_TYPE)(value);
  };
  return (
    <FilterItem
      name={t(`programs-filtering.${TOTAL_PROFIT_FILTER_NAME}.name`)}
      description={t(
        `programs-filtering.${TOTAL_PROFIT_FILTER_NAME}.description`
      )}
      value={filtering.filters[TOTAL_PROFIT_FILTER_NAME]}
      defaultValue={filtering.defaultFilters[TOTAL_PROFIT_FILTER_NAME]}
      onFilterChange={handleFilterChange}
    >
      {(value, onChange) => (
        <Range
          value={value}
          onChange={onChange}
          min={filtering.defaultFilters[TOTAL_PROFIT_FILTER_NAME][0]}
          max={filtering.defaultFilters[TOTAL_PROFIT_FILTER_NAME][1]}
          pushable
          handle={props => (
            <div key={props.index}>
              <span
                className="gv-hangle__text"
                style={{
                  left: `${props.offset - 5}%`
                }}
              >
                {`${formatValue(props.value)}GVT`}
              </span>
              <Handle {...props} dragging="false" />
            </div>
          )}
        />
      )}
    </FilterItem>
  );
};

export default translate()(AvgProfitFilter);
