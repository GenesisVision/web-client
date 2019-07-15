import React from "react";

import ProgramsPage from "../src/pages/programs/programs/programs.page";

const Programs = () => {
  return <ProgramsPage />;
};

Programs.getInitialProps = async () => {
  return {
    namespacesRequired: ["translation"]
  };
};

export default Programs;
