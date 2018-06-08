import React from "react";
import ProgramAvatar from "components/program-avatar/program-avatar";
import { Link } from "react-router-dom";

import "./program-search-program.css";
import replaceParams from "utils/replace-params";
import { PROGRAM_ROUTE } from "../../../../program/program.constants";

const ProgramSearchProgram = ({ program, onProgramClick }) => {
  const programRoute = replaceParams(PROGRAM_ROUTE, {
    ":programId": program.id
  });
  return (
    <Link
      className="program-search-program"
      to={programRoute}
      onClick={onProgramClick}
    >
      <ProgramAvatar
        url={program.logo}
        className="program-search-program__avatar"
      />
      <div className="program-search-program__info">
        <div>{program.title}</div>
        <div>{program.profitAvgPercent}</div>
      </div>
    </Link>
  );
};

export default ProgramSearchProgram;
