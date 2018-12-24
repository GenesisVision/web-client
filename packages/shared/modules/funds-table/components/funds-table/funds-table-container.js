import React from "react";
import Surface from "shared/components/surface/surface";

import FundsTable from "./funds-table";

const FundsTableContainer = ({ title }) => (
  <Surface className="funds-table-container">
    <FundsTable title={title} />
  </Surface>
);

export default FundsTableContainer;
