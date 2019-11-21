import { tableSelectorCreator } from "components/table/helpers/table.selector";

const dashboardFundsSelector = (state: any) => state.dashboard.funds; // TODO realize common auth state
const dashboardFundsTableSelector = tableSelectorCreator(
  dashboardFundsSelector,
  "funds"
);

export default dashboardFundsTableSelector;
