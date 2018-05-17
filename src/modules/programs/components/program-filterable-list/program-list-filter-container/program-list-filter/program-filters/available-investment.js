import { translate } from "react-i18next";
import React from "react";

import FilterItem from "../../../../../../filter-pane/components/filter-item/filter-item";
import GVCheckbox from "../../../../../../../shared/components/form/gv-checkbox/gv-checkbox";

import { AVAILABLE_INVESTMENT_FILTER_NAME } from "../../../../../programs.constants";

const AvailableInvestment = ({ t, filtering, onFilterChange }) => {
  const handleFilterChange = value =>
    onFilterChange(AVAILABLE_INVESTMENT_FILTER_NAME, null)(value);
  return (
    <FilterItem
      name={t(`programs-filtering.${AVAILABLE_INVESTMENT_FILTER_NAME}.name`)}
      description={t(
        `programs-filtering.${AVAILABLE_INVESTMENT_FILTER_NAME}.description`
      )}
      value={filtering.filters[AVAILABLE_INVESTMENT_FILTER_NAME]}
      defaultValue={filtering.defaultFilters[AVAILABLE_INVESTMENT_FILTER_NAME]}
      onFilterChange={handleFilterChange}
    >
      {(value, onChange) => (
        <GVCheckbox
          name={AVAILABLE_INVESTMENT_FILTER_NAME}
          label={t(
            `programs-filtering.${AVAILABLE_INVESTMENT_FILTER_NAME}.label`
          )}
          value={value}
          onChange={onChange}
        />
      )}
    </FilterItem>
  );
};

export default translate()(AvailableInvestment);
