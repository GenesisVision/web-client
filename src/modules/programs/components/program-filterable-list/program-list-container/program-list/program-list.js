import React from "react";

import ProgramItem from "./program-item/program-item";

const ProgramList = ({ programs, isAuthenticated, openInvestPopup }) => {
  const renderProgramList = () => {
    if (programs.length === 0) return <div>There are no traders</div>;
    return programs.map(program => (
      <ProgramItem
        key={program.id}
        program={program}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
      />
    ));
  };
  return renderProgramList();
};

export default ProgramList;
