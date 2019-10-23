import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";
import { AuthRootState } from "shared/utils/types";

const dashboardProgramsSelector = (state: AuthRootState) =>
  state.dashboard.programs;
const dashboardProgramsTableSelector = tableSelectorCreator(
  dashboardProgramsSelector,
  "programs"
);

export default dashboardProgramsTableSelector;
