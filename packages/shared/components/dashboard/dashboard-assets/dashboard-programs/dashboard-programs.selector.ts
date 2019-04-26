import { ProgramDetails, ProgramsList } from "gv-api-web";
import { Selector } from "reselect";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";
import { ITableState } from "shared/components/table/reducers/table.reducer";

import { IDataModel } from "../../../table/helpers/mapper";

const dashboardProgramsSelector = (state: any) =>
  state.dashboard.programs as ITableState<ProgramsList>; // TODO realize common auth state
const dashboardProgramsTableSelector: Selector<
  any,
  ITableState<IDataModel<ProgramDetails>>
> = tableSelectorCreator<any, ProgramsList, ProgramDetails>(
  dashboardProgramsSelector,
  "programs"
);

export default dashboardProgramsTableSelector;
