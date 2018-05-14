import { withFormik, Field } from "formik";
import React from "react";
import Slider, { Range, Handle } from "rc-slider";
import "rc-slider/assets/index.css";
import "shared/components/form/gv-range/gv-range.css";

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
import FilterItem from "../../../../../filter-pane/components/filter-item/filter-item";

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
// const style = { width: 400, margin: 50 };
const values2 = [0, 1, 2];
const powerOfTen = n => Math.pow(10, n);
const generateMarks = values => {
  const result = {};
  values.forEach(value => {
    result[powerOfTen(value)] = value;
  });
  return result;
};
function log(value) {
  console.log(value); //eslint-disable-line
}

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
            defaultValue={[LEVEL_MIN_FILTER_VALUE, LEVEL_MAX_FILTER_VALUE]}
            onAfterChange={log}
            pushable
            handle={props => {
              return (
                <div key={props.index}>
                  <span
                    style={{
                      position: "absolute",
                      top: "-20px",
                      left: `${props.offset - 3}%`
                    }}
                  >
                    {props.value}
                  </span>
                  <Handle {...props} dragging="false" />
                </div>
              );
            }}
          />
        </div>
      </div>
      <div className="filter-item">
        <div className="filter-item__title">Average Profit</div>
        <div className="filter-item__description">Select Average Profit</div>
        <div className="filter-item__component">
          <Slider
            min={values2[0]}
            max={powerOfTen(values2[values2.length - 1])}
            marks={generateMarks(values2)}
            included={false}
            onChange={log}
            handle={props => (
              <div>
                <span
                  style={{
                    position: "absolute",
                    top: "-20px",
                    left: `${props.offset}%`
                  }}
                >
                  {props.value}
                </span>
                <Slider.Handle {...props} dragging="false" />
              </div>
            )}
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
