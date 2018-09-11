import { GVButton } from "gv-react-components";
import React from "react";

const GlobalSearchNavigation = ({ goBack }) => {
  return (
    <div>
      <GVButton
        variant="text"
        color="secondary"
        onClick={() => window.history.back()}
      >
        &larr; Back
      </GVButton>
    </div>
  );
};

export default GlobalSearchNavigation;
