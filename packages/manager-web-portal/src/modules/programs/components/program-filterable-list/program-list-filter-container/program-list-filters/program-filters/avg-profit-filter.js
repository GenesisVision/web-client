import { Handle, Range } from "rc-slider";
import React from "react";
import { translate } from "react-i18next";

import FilterItem from "../../../../../../filter-pane/components/filter-item/filter-item";
import { RANGE_FILTER_TYPE } from "../../../../../../filtering/filtering.constants";
import { AVG_PROFIT_FILTER_NAME } from "../../../../../programs.constants";

const AvgProfitFilter = ({
  t,
  filtering,
  onFilterChange,
  maxValue,
  minValue
}) => {
  const handleFilterChange = value => {
    return onFilterChange(AVG_PROFIT_FILTER_NAME, RANGE_FILTER_TYPE)(value);
  };

  return (
    <FilterItem
      name={t(`programs-filtering.${AVG_PROFIT_FILTER_NAME}.name`)}
      description={t(
        `programs-filtering.${AVG_PROFIT_FILTER_NAME}.description`
      )}
      value={filtering.filters[AVG_PROFIT_FILTER_NAME]}
      defaultValue={filtering.defaultFilters[AVG_PROFIT_FILTER_NAME]}
      onFilterChange={handleFilterChange}
    >
      {(value, onChange) => (
        <Range
          value={value}
          onChange={onChange}
          min={filtering.defaultFilters[AVG_PROFIT_FILTER_NAME][0]}
          max={filtering.defaultFilters[AVG_PROFIT_FILTER_NAME][1]}
          pushable
          handle={props => (
            <div key={props.index}>
              <span
                className="gv-hangle__text"
                style={{
                  left: `${props.offset - 5}%`
                }}
              >
                {`${props.value}%`}
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
