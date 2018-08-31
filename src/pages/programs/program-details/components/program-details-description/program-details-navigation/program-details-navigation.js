import { GVButton } from "gv-react-components";
import React from "react";

const ProgramDetailsNavigation = ({ goBack }) => {
  return (
    <div className="program-details-navigation">
      <GVButton variant="text" onClick={goBack} color="secondary">
        <span className="program-details-navigation__back-arrow">&larr;</span>
        Back
      </GVButton>
    </div>
  );
};

export default ProgramDetailsNavigation;
