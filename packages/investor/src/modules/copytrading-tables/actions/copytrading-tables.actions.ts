import { SignalTradingEvents, TradesSignalViewModel } from "gv-api-web";
import {
  ComposeFiltersAllType,
  FilteringType
} from "shared/components/table/components/filtering/filter.type";
import signalApi from "shared/services/api-client/signal-api";
import { ApiAction } from "shared/utils/types";

export const CLEAR_COPYTRADING_TABLE = "CLEAR_COPYTRADING_TABLE";
export const COPYTRADING_OPEN_TRADES = "DASHBOARD_OPEN_TRADES";
export const COPYTRADING_TRADES_HISTORY = "DASHBOARD_TRADES_HISTORY";
export const COPYTRADING_TRADES_LOG = "COPYTRADING_TRADES_LOG";

export const clearCopytradingTable = () => ({
  type: CLEAR_COPYTRADING_TABLE
});

export const fetchCopytradingTradesLogAction = (
  auth: string,
  filters: FilteringType
): ApiAction<SignalTradingEvents> => ({
  type: COPYTRADING_TRADES_LOG,
  payload: signalApi.getSignalTradingLog(auth, filters)
});

export const fetchCopytradingOpenTradesAction = (
  auth: string,
  filters: FilteringType
): ApiAction<TradesSignalViewModel> => ({
  type: COPYTRADING_OPEN_TRADES,
  payload: signalApi.getOpenSignalTrades(auth, filters)
});

export const fetchCopytradingTradesHistoryAction = (
  auth: string,
  filters: ComposeFiltersAllType
): ApiAction<TradesSignalViewModel> => ({
  type: COPYTRADING_TRADES_HISTORY,
  payload: signalApi.getSignalTrades(auth, filters)
});
