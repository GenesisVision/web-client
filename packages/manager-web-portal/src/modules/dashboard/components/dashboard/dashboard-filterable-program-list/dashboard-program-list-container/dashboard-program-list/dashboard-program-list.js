import React from "react";

import DashboardProgram from "./dashboard-program/dashboard-program";

import "./dashboard-program-list.css";

const DashboardProgramList = ({
  programs,
  openInvestPopup,
  openWithdrawPopup,
  openEditProgramPage
}) => {
  return (
    <div className="dashboard-program-list">
      {programs.length === 0 && <div>There are no programs.</div>}
      {programs.map(x => (
        <DashboardProgram
          key={x.id}
          program={x}
          openInvestPopup={openInvestPopup}
          openWithdrawPopup={openWithdrawPopup}
          openEditProgramPage={openEditProgramPage}
        />
      ))}
    </div>
  );
};

export default DashboardProgramList;
