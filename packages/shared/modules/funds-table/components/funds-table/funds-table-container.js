import React from "react";
import FundsTable from "./funds-table";
import Surface from "shared/components/surface/surface";

const FundsTableContainer = ({ title }) => (
  <Surface className="funds-table-container">
    <FundsTable title={title} />
  </Surface>
);

export default FundsTableContainer;
