import React from "react";

import DashboardInfoContainer from "./dashboard-info-container/dashboard-info-container";
import DashboardFilterableProgramList from "./dashboard-filterable-program-list/dashboard-filterable-program-list";

import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashboardInfoContainer />
      <DashboardFilterableProgramList />
    </div>
  );
};

export default Dashboard;
