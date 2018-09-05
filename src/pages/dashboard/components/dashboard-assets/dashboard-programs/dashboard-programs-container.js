import TableContainer from "modules/table/components/table-container";
import React from "react";

import dashboardProgramsService from "../../../services/dashboard-programs.service";
import DashboardPrograms from "./dashboard-programs";

const DashboardProgramsContainer = () => {
  return (
    <TableContainer
      component={DashboardPrograms}
      service={dashboardProgramsService}
    />
  );
};

export default DashboardProgramsContainer;
