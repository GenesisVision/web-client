import FacetCardsContainer from "modules/programs/components/facet-cards/faset-cards-container";
import ProgramsTabsContainer from "modules/programs/components/programs-tabs/programs-tabs-container";
import ProgramsContainer from "modules/programs/components/programs/programs-container";
import React, { Fragment } from "react";

const ProgramsPage = () => {
  return (
    <Fragment>
      <ProgramsTabsContainer />
      <FacetCardsContainer />
      <ProgramsContainer />
    </Fragment>
  );
};

export default ProgramsPage;
