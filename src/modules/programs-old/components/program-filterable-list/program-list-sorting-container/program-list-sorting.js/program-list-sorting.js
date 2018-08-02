import "./program-list-sorting.css";

import classnames from "classnames";
import React from "react";
import Select from "react-select";

import { SORTING_OPTIONS } from "../../../../programs.constants";

const ProgramListSorting = ({ sorting, onSortingChange }) => {
  const fullValue = sorting.value || sorting.defaultValue;
  const value = (sorting.value || sorting.defaultValue).replace(
    /(.*)Asc|Desc$/,
    "$1"
  );
  const isAsc = /.*Asc$/.test(fullValue);
  const isDesc = /.*Desc$/.test(fullValue);
  const handleSortingChange = option => {
    if (value === option.value) return;
    onSortingChange(option.value + (isAsc ? "Asc" : "Desc"));
  };
  const handleDirectionChange = () => {
    onSortingChange(value + (isDesc ? "Asc" : "Desc"));
  };
  return (
    <div className="program-list-sorting">
      <div className="sorting__label">Order by</div>
      <Select
        className="sorting__container"
        value={value}
        onChange={handleSortingChange}
        options={SORTING_OPTIONS}
        clearable={false}
        searchable={false}
        valueRenderer={v => {
          return <span className="sorting__value">{v.label}</span>;
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
        onClick={() => handleDirectionChange()}
      >
        <i
          className={classnames("fas", {
            "fa-sort-amount-up": isAsc,
            "fa-sort-amount-down": isDesc
          })}
        />
      </div>
    </div>
  );
};

export default ProgramListSorting;
