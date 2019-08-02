import { ProgramsList } from "gv-api-web";
import { NextPage } from "next";
import React from "react";
import ProgramsPage from "shared/components/programs/programs.page";
import { composeFilters } from "shared/components/table/helpers/filtering.helpers";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { getFiltersFromContext } from "shared/modules/programs-table/components/programs-table/programs-table-ssr";
import { PROGRAMS_TABLE_FILTERS } from "shared/modules/programs-table/components/programs-table/programs.constants";
import programsApi from "shared/services/api-client/programs-api";

const Programs: NextPage<{
  programs: ProgramsList;
}> = ({ programs }) => {
  return <ProgramsPage programs={programs} />;
};

Programs.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx);

  // @ts-ignore
  const programs = await programsApi.v10ProgramsGet(filtering);
  return {
    programs
  };
};

export default withDefaultLayout(Programs);
