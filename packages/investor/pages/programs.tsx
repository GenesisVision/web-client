import { ProgramsList } from "gv-api-web";
import { NextPage } from "next";
import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";
import programsApi from "shared/services/api-client/programs-api";

import ProgramsPage from "../src/pages/programs/programs/programs.page";

const Programs: NextPage<{
  programs: ProgramsList;
}> = ({ programs }) => {
  return <ProgramsPage programs={programs} />;
};

Programs.getInitialProps = async () => {
  const programs = await programsApi.v10ProgramsGet({
    take: 32,
    skip: 20
  });
  return {
    namespacesRequired: ["translation"],
    programs
  };
};

export default withDefaultLayout(Programs);
