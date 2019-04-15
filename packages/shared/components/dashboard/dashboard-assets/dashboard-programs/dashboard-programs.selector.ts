import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";

const dashboardProgramsSelector = (state: any) => state.dashboard.programs; // TODO realize common auth state
const dashboardProgramsTableSelector = tableSelectorCreator(
  dashboardProgramsSelector,
  "programs"
);

export default dashboardProgramsTableSelector;
