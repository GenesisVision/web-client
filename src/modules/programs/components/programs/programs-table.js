import React from "react";

import Programs from "./programs";
import ProgramsHeader from "./programs-header";

const ProgramsTable = ({ data, sorting, updateSorting }) => {
  return (
    <div className="programs-table">
      <ProgramsHeader sorting={sorting} updateSorting={updateSorting} />
      <Programs data={data} />
    </div>
  );
};

export default ProgramsTable;
