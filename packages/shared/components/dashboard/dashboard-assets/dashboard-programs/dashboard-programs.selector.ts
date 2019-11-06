import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";
import { RootState } from "shared/reducers/root-reducer";

const dashboardProgramsSelector = (state: RootState) =>
  //@ts-ignore
  state.dashboard.programs;
const dashboardProgramsTableSelector = tableSelectorCreator(
  dashboardProgramsSelector,
  "programs"
);

export default dashboardProgramsTableSelector;
