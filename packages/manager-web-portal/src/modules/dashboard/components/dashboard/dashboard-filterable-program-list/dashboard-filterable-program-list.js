import React from "react";
import DashboardProgramListContainer from "./dashboard-program-list-container/dashboard-program-list-container";
import DashboardProgramListTabsContainer from "./dashboard-program-list-tabs-container/dashboard-program-list-tabs-container";

const DashboardFilterableProgramList = () => {
  return (
    <div>
      <div className="dashboard-subheader">Programs</div>
      <DashboardProgramListTabsContainer />
      <DashboardProgramListContainer />
    </div>
  );
};

export default DashboardFilterableProgramList;
