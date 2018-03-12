import { withFormik, Field } from "formik";
import React from "react";

import GVInputRange from "../../../../../../shared/components/form/gv-input-range/gv-input-range";

import "./trader-list-filter.css";

const TraderListFilter = ({ values, setFieldValue, onChangeComplete }) => {
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
    </form>
  );
};

export default withFormik({
  displayName: "traderListFilterForm",
  mapPropsToValues: () => ({
    traderLevel: { min: 1, max: 7 },
    profitAvg: 20
  })
})(TraderListFilter);
