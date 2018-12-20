import React from "react";
import Surface from "shared/components/surface/surface";

import FundsTable from "./funds-table";

const FundsTableContainer = ({ title, enableFiltering }) => (
  <Surface className="funds-table-container">
    <FundsTable title={title} enableFiltering={enableFiltering} />
  </Surface>
);

export default FundsTableContainer;
