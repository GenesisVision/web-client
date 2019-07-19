import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";

import ProgramsPage from "../src/pages/programs/programs/programs.page";

const Programs = () => {
  return <ProgramsPage />;
};

export default withDefaultLayout(Programs);
