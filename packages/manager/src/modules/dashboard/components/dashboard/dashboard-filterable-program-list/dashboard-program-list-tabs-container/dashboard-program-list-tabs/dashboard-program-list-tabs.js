import React from "react";
import "./dashboard-program-list-tabs.css";
import classnames from "classnames";

const isActive = stateType => tabType => stateType === tabType;

const DashboardProgramListTab = ({ type, isActive, text, onFilterChange }) => (
  <span
    className={classnames("dashboard-program-tab", {
      "dashboard-program-tab--active": isActive(type)
    })}
    onClick={onFilterChange(type)}
  >
    {text}
  </span>
);

const DashboardProgramListTabs = ({ type, onFilterChange }) => {
  return (
    <div className="dashboard-program-list-tabs">
      <DashboardProgramListTab
        type="All"
        text="All Programs"
        isActive={isActive(type)}
        onFilterChange={onFilterChange}
      />
      <DashboardProgramListTab
        type="Active"
        text="Active Programs"
        isActive={isActive(type)}
        onFilterChange={onFilterChange}
      />
      <DashboardProgramListTab
        type="Finished"
        text="Finished Programs"
        isActive={isActive(type)}
        onFilterChange={onFilterChange}
      />
      <DashboardProgramListTab
        type="Pending"
        text="Pending Programs"
        isActive={isActive(type)}
        onFilterChange={onFilterChange}
      />
    </div>
  );
};

export default DashboardProgramListTabs;
