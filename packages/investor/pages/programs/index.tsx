import { ProgramsList } from "gv-api-web";
import { NextPage } from "next";
import React from "react";
import ProgramsPage from "shared/components/programs/programs.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { getFiltersFromContext } from "shared/modules/programs-table/components/programs-table/programs-table-ssr";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";

const Programs: NextPage<{
  programs: ProgramsList;
}> = ({ programs }) => {
  return <ProgramsPage programs={programs} />;
};

Programs.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx);
  const authorization = authService.getAuthArg(ctx);
  // @ts-ignore
  const programs = await programsApi.v10ProgramsGet({
    ...filtering,
    authorization
  });
  return {
    programs
  };
};

export default withDefaultLayout(Programs);
