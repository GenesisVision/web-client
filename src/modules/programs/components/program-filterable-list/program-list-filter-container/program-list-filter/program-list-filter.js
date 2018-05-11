import { withFormik, Field } from "formik";
import React from "react";

import GVInputRange from "../../../../../../shared/components/form/gv-input-range/gv-input-range";
import GVSelect from "../../../../../../shared/components/form/gv-select/gv-select";

import {
  LEVEL_MAX_FILTER_VALUE,
  LEVEL_MIN_FILTER_VALUE,
  AVG_PROFIT_MAX_FILTER_VALUE,
  AVG_PROFIT_MIN_FILTER_VALUE,
  LEVEL_FILTER_NAME,
  AVG_PROFIT_FILTER_NAME
} from "../../../../programs.constants";
import { composeFormikFiltering } from "../../../../../filtering/helpers/filtering-helpers";
import { RANGE_FILTER_TYPE } from "../../../../../filtering/filtering.constants";

export const TRADER_LEVEL_FILTER_FORM = "traderLevel";
export const PROFIT_AVG_FILTER_FORM = "profitAvg";

const sortingOptions = [
  { value: "ByTitle", label: "Name" },
  { value: "ByLevel", label: "Level" },
  { value: "ByProfit", label: "Profit" },
  { value: "ByEndOfPeriod", label: "End Of Period" }
];
const sortingDirectionOptions = [
  { value: "Asc", label: "Ascending" },
  { value: "Desc", label: "Descending" }
];
const ProgramListFilter = ({
  values,
  setFieldValue,
  setFieldTouched,
  onChangeComplete
}) => {
  return (
    <form className="filter-list">
      <div className="filter-item">
        <div className="filter-item__title">Level</div>
        <div className="filter-item__description">Select Trader Level</div>
        <div className="filter-item__component">
          <Field
            minValue={LEVEL_MIN_FILTER_VALUE}
            maxValue={LEVEL_MAX_FILTER_VALUE}
            name={LEVEL_FILTER_NAME}
            value={values[LEVEL_FILTER_NAME]}
            onChangeComplete={onChangeComplete(LEVEL_FILTER_NAME)}
            setFieldValue={setFieldValue}
            component={GVInputRange}
          />
        </div>
      </div>
      <div className="filter-item">
        <div className="filter-item__title">Average Profit</div>
        <div className="filter-item__description">Select Average Profit</div>
        <div className="filter-item__component">
          <Field
            minValue={AVG_PROFIT_MIN_FILTER_VALUE}
            maxValue={AVG_PROFIT_MAX_FILTER_VALUE}
            name={AVG_PROFIT_FILTER_NAME}
            value={values[AVG_PROFIT_FILTER_NAME]}
            formatLabel={value => `${value}%`}
            onChangeComplete={onChangeComplete(AVG_PROFIT_FILTER_NAME)}
            setFieldValue={setFieldValue}
            component={GVInputRange}
          />
        </div>
      </div>
      <div className="filter-item">
        <div className="filter-item__title">Sorting</div>
        <div className="filter-item__description">Select column</div>
        <div className="filter-item__component">
          <Field
            name="sorting"
            value={values.sorting}
            onChange={onChangeComplete("sorting")}
            setFieldValue={setFieldValue}
            onBlur={setFieldTouched}
            component={GVSelect}
            options={sortingOptions}
          />
        </div>
      </div>
      <div className="filter-item">
        <div className="filter-item__title">Sorting direction</div>
        <div className="filter-item__description">Select sorting direction</div>
        <div className="filter-item__component">
          <Field
            name="sortingDirection"
            value={values.sortingDirection}
            onChange={onChangeComplete("sortingDirection")}
            setFieldValue={setFieldValue}
            onBlur={setFieldTouched}
            component={GVSelect}
            clearable={false}
            options={sortingDirectionOptions}
          />
        </div>
      </div>
    </form>
  );
};

export default withFormik({
  displayName: "programListFilterForm",
  mapPropsToValues: props => {
    return {
      [LEVEL_FILTER_NAME]: composeFormikFiltering(
        RANGE_FILTER_TYPE,
        LEVEL_FILTER_NAME,
        props.filtering
      ),
      [AVG_PROFIT_FILTER_NAME]: composeFormikFiltering(
        RANGE_FILTER_TYPE,
        AVG_PROFIT_FILTER_NAME,
        props.filtering
      ),
      sorting: "", //filters.sorting,
      sortingDirection: "" //filters.sortingDirection
    };
  }
})(ProgramListFilter);
