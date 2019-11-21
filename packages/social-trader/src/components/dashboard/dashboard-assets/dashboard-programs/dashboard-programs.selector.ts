import { tableSelectorCreator } from "components/table/helpers/table.selector";
import { RootState } from "reducers/root-reducer";

const dashboardProgramsSelector = (state: RootState) =>
  //@ts-ignore
  state.dashboard.programs;
const dashboardProgramsTableSelector = tableSelectorCreator(
  dashboardProgramsSelector,
  "programs"
);

export default dashboardProgramsTableSelector;
