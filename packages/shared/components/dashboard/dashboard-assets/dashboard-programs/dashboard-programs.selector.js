import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";

const dashboardProgramsSelector = state => state.dashboard.programs;
const dashboardProgramsTableSelector = tableSelectorCreator(
  dashboardProgramsSelector,
  "programs"
);

export default dashboardProgramsTableSelector;
