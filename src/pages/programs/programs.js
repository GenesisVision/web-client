import FacetCardsContainer from "modules/programs/components/facet-cards/faset-cards-container";
import ProgramsTabsContainer from "modules/programs/components/programs-tabs/programs-tabs-container";
import ProgramsContainer from "modules/programs/components/programs/programs-container";
import React from "react";

const Programs = () => {
  return (
    <div>
      <ProgramsTabsContainer />
      <FacetCardsContainer />
      <ProgramsContainer />
    </div>
  );
};

export default Programs;
