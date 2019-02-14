import { InvestorRootState } from "reducers";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";

const dashboardOpenTradesSelector = (state: InvestorRootState) =>
  state.dashboard.programs;
export const dashboardOpenTradesTableSelector = tableSelectorCreator(
  dashboardOpenTradesSelector,
  "items"
);
