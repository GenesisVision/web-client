import "./programs.scss";

import React from "react";

import Program from "./program";

const Programs = ({ data }) => {
  if (!data) return null;
  if (data.total === 0) return "There are no programs";

  return data.programs.map((program, idx) => {
    program.order = program.order || idx + 1;
    return <Program key={program.id} program={program} />;
  });
};

export default Programs;
