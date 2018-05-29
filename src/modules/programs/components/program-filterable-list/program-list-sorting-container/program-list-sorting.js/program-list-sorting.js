import React, { Fragment } from "react";
import Select from "react-select";
import classnames from "classnames";

import "./program-list-sorting.css";

const ProgramListSorting = ({ sorting, onSortingChange }) => {
  const fullValue = sorting.value || sorting.defaultValue;
  const value = (sorting.value || sorting.defaultValue).replace(
    /(.*)Asc|Desc$/,
    "$1"
  );
  const isAsc = /.*Asc$/.test(fullValue);
  const isDesc = /.*Desc$/.test(fullValue);
  const handleSortingChange = option => {
    onSortingChange(option.value + (isAsc ? "Asc" : "Desc"));
  };
  const handleDirectionChange = isAsc => {
    onSortingChange(value + (isAsc ? "Asc" : "Desc"));
  };
  return (
    <div className="program-list-sorting">
      <Select
        className="sorting__container"
        value={value}
        onChange={handleSortingChange}
        options={options}
        clearable={false}
        searchable={false}
        valueRenderer={v => {
          return (
            <Fragment>
              Order by <span className="sorting__value">{v.label}</span>
            </Fragment>
          );
        }}
        arrowRenderer={a => {
          return (
            <span
              className={classnames(
                "fas",
                a.isOpen ? "fa-angle-up" : "fa-angle-down"
              )}
            />
          );
        }}
      />
      <div
        className={classnames("sorting__order", {
          "sorting__order--selected": isAsc
        })}
        onClick={() => handleDirectionChange(true)}
      >
        Asc
      </div>
      <div
        className={classnames("sorting__order", {
          "sorting__order--selected": isDesc
        })}
        onClick={() => handleDirectionChange(false)}
      >
        Desc
      </div>
    </div>
  );
};

export default ProgramListSorting;

const options = [
  {
    value: "ByLevel",
    label: "Level"
  },
  {
    value: "ByAvgProfit",
    label: "Avg. Profit"
  }
];
