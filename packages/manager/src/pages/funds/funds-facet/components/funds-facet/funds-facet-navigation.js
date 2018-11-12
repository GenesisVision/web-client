import { GVButton } from "gv-react-components";
import React from "react";

const FundsFacetNavigation = ({ facet, goBack }) => {
  return (
    <div>
      <GVButton variant="text" onClick={goBack}>
        &larr; Back
      </GVButton>
    </div>
  );
};

export default FundsFacetNavigation;
