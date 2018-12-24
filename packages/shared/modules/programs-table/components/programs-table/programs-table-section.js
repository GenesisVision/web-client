import React from "react";
import Surface from "shared/components/surface/surface";

import ProgramsTableContainer from "./programs-table-container";

const ProgramsTableSection = ({ title, showSwitchView }) => (
  <Surface className="programs-table-container">
    <ProgramsTableContainer showSwitchView={showSwitchView} title={title} />
  </Surface>
);
export default ProgramsTableSection;
