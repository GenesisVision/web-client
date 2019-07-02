import { SignalTradingEvents, TradesSignalViewModel } from "gv-api-web";
import { InvestorRootState } from "reducers";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";

const copytradingOpenTradesSelector = (state: InvestorRootState) =>
  state.copytradingTables.openTrades;

export const dashboardOpenTradesTableSelector = tableSelectorCreator<
  InvestorRootState,
  TradesSignalViewModel,
  TradesSignalViewModel
>(copytradingOpenTradesSelector, "trades");

const copytradingTradesHistorySelector = (state: InvestorRootState) =>
  state.copytradingTables.tradesHistory;

const copytradingTradesLogSelector = (state: InvestorRootState) =>
  state.copytradingTables.tradesLog;

export const dashboardTradesHistoryTableSelector = tableSelectorCreator<
  InvestorRootState,
  TradesSignalViewModel,
  TradesSignalViewModel
>(copytradingTradesHistorySelector, "trades");

export const dashboardTradesLogTableSelector = tableSelectorCreator<
  InvestorRootState,
  SignalTradingEvents,
  SignalTradingEvents
>(copytradingTradesLogSelector, "events");
