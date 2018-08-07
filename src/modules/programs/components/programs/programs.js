import "./programs.scss";

import React from "react";

import Program from "./program";

const Programs = ({ programs, openProgramDetail }) => {
  const renderPrograms = () => {
    if (programs.length === 0) return "There are no programs";

    return programs.map((program, idx) => {
      program.order = program.order || idx + 1;
      return (
        <Program
          key={program.id}
          program={program}
          openProgramDetail={openProgramDetail}
        />
      );
    });
  };

  return <div className="programs">{renderPrograms()}</div>;
};

export default Programs;
