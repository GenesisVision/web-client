import React from "react";
import { LOGIN_ROUTE } from "pages/auth/login/login.routes";
import ProgramsTable from "./programs-table";
import Surface from "shared/components/surface/surface";

const ProgramsContainer = ({ title, enableFiltering, showSwitchView }) => (
  <Surface className="programs-table-container">
    <ProgramsTable
      showSwitchView={showSwitchView}
      enableFiltering={enableFiltering}
      title={title}
    />
  </Surface>
);
export default ProgramsContainer;
