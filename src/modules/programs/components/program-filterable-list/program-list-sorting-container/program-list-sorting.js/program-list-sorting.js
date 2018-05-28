import React from "react";
import Select from "react-select";
import classnames from "classnames";

import "./program-list-sorting.css";

const ProgramListSorting = () => {
  setTimeout(() => {
    this.select.state.isOpen = true;
  }, 0);
  return (
    <div className="program-list-sorting">
      <Select
        ref={r => {
          this.select = r;
        }}
        className="sorting__container"
        optionClassName="option__container"
        value="Total Profit"
        options={options}
        clearable={false}
        searchable={false}
        valueRenderer={v => {
          //console.log(v);
          return <span>Order by {v.label}</span>;
        }}
        arrowRenderer={a => {
          //console.log(a);
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
      <button type="button" className="btn btn-secondary">
        1
      </button>
      <button type="button" className="btn btn-secondary">
        2
      </button>
    </div>
  );
};

export default ProgramListSorting;

const options = [
  {
    value: "level",
    label: "Level"
  },
  {
    value: "Avg. Profit",
    label: "Avg. Profit"
  },
  {
    value: "Total Profit",
    label: "Total Profit"
  },
  {
    value: "Balance",
    label: "Balance"
  }
];
