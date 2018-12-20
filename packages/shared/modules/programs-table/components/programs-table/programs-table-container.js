import React from "react";
import Surface from "shared/components/surface/surface";

import ProgramsTable from "./programs-table";

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
