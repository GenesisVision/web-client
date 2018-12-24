import React from "react";
import Surface from "shared/components/surface/surface";

import ProgramsTable from "./programs-table";

const ProgramsContainer = ({ title, showSwitchView }) => (
  <Surface className="programs-table-container">
    <ProgramsTable showSwitchView={showSwitchView} title={title} />
  </Surface>
);
export default ProgramsContainer;
