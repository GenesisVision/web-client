import { withFormik, Field } from "formik";
import React from "react";

import GVInputRange from "../../../../../../shared/components/form/gv-input-range/gv-input-range";
import GVSelect from "../../../../../../shared/components/form/gv-select/gv-select";

import "./trader-list-filter.css";
const sortingOptions = [
  { value: "Name", label: "Name" },
  { value: "DaysLeft", label: "Days Left" }
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
    <form className="trader-list-filter">
      <div className="filter-item">
        <div className="filter-item__title">Level</div>
        <div className="filter-item__description">Select Trader Level</div>
        <div className="filter-item__component">
          <Field
            minValue={1}
            maxValue={7}
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
            minValue={0}
            maxValue={100}
            name="profitAvg"
            value={values.profitAvg}
            formatLabel={value => `${value}%`}
            onChangeComplete={onChangeComplete("profitAvg")}
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
            options={sortingDirectionOptions}
          />
        </div>
      </div>
    </form>
  );
};

export default withFormik({
  displayName: "traderListFilterForm",
  mapPropsToValues: () => ({
    traderLevel: { min: 1, max: 7 },
    profitAvg: 20,
    sorting: ""
  })
})(TraderListFilter);
