import React from "react";
import Select from "react-select";

import "react-select/dist/react-select.min.css";

import "./program-list-sorting.css";

const ProgramListSorting = () => {
  return (
    <div className="program-list-sorting">
      <div className="soring-control">
        <Select
          className="sorting__container"
          optionClassName="option__container"
          value="australian-capital-territory"
          options={options}
        />
      </div>
    </div>
  );
};

export default ProgramListSorting;

const options = [
  {
    value: "australian-capital-territory",
    label: "Australian Capital Territory",
    className: "State-ACT"
  },
  {
    value: "new-south-wales",
    label: "New South Wales",
    className: "State-NSW"
  },
  { value: "victoria", label: "Victoria", className: "State-Vic" },
  { value: "queensland", label: "Queensland", className: "State-Qld" },
  {
    value: "western-australia",
    label: "Western Australia",
    className: "State-WA"
  },
  {
    value: "south-australia",
    label: "South Australia",
    className: "State-SA"
  },
  { value: "tasmania", label: "Tasmania", className: "State-Tas" },
  {
    value: "northern-territory",
    label: "Northern Territory",
    className: "State-NT"
  }
];
