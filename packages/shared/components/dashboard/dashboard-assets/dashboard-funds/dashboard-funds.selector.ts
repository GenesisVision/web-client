import { FundDetails, FundsList } from "gv-api-web";
import { OutputSelector, Selector } from "reselect";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";

import { IDataModel } from "../../../table/helpers/mapper";
import { ITableState } from "../../../table/reducers/table.reducer";

const dashboardFundsSelector = (state: any) =>
  state.dashboard.funds as ITableState<FundsList>; // TODO realize common auth state
const dashboardFundsTableSelector: Selector<
  any,
  ITableState<IDataModel<FundDetails>>
> = tableSelectorCreator(dashboardFundsSelector, "funds");

export default dashboardFundsTableSelector;
