import {
  OrderClosedSignalSlaveModel,
  TradesHistorySignalSlaveViewModel
} from "gv-api-web";
import { InvestorRootState } from "reducers";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";

const copytradingOpenTradesSelector = (state: InvestorRootState) =>
  state.copytradingTables.openTrades;

export const dashboardOpenTradesTableSelector = tableSelectorCreator<
  InvestorRootState,
  TradesHistorySignalSlaveViewModel,
  OrderClosedSignalSlaveModel
>(copytradingOpenTradesSelector, "trades");

const copytradingTradesHistorySelector = (state: InvestorRootState) =>
  state.copytradingTables.tradesHistory;
export const dashboardTradesHistoryTableSelector = tableSelectorCreator<
  InvestorRootState,
  TradesHistorySignalSlaveViewModel,
  OrderClosedSignalSlaveModel
>(copytradingTradesHistorySelector, "trades");
