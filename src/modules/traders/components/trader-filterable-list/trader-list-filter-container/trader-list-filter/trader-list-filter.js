import { withFormik, Field } from "formik";
import React from "react";

import GVInputRange from "../../../../../../shared/components/form/gv-input-range/gv-input-range";
import GVSelect from "../../../../../../shared/components/form/gv-select/gv-select";

import {
  LEVEL_MAX,
  LEVEL_MIN,
  PROFIT_PROGRAM_PROCENT_MAX,
  PROFIT_PROGRAM_PROCENT_MIN
} from "../../../../traders.constants";

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
const TraderListFilter = ({
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
            minValue={LEVEL_MIN}
            maxValue={LEVEL_MAX}
            name="traderLevel"
            value={values.traderLevel}
            onChangeComplete={onChangeComplete("traderLevel")}
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
            minValue={PROFIT_PROGRAM_PROCENT_MIN}
            maxValue={PROFIT_PROGRAM_PROCENT_MAX}
            name="profitAvgPercent"
            value={values.profitAvgPercent}
            formatLabel={value => `${value}%`}
            onChangeComplete={onChangeComplete("profitAvgPercent")}
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
  displayName: "traderListFilterForm",
  mapPropsToValues: props => {
    const { filtering } = props;
    return {
      traderLevel: { min: filtering.levelMin, max: filtering.levelMax },
      profitAvgPercent: {
        min: filtering.profitAvgPercentMin,
        max: filtering.profitAvgPercentMax
      },
      sorting: filtering.sorting,
      sortingDirection: filtering.sortingDirection
    };
  }
})(TraderListFilter);
