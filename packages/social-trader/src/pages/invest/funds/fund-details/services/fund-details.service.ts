import { TGetChartFunc } from "components/details/details-statistic-section/details.chart.types";
import { FilteringType } from "components/table/components/filtering/filter.type";
import { composeRequestFiltersByTableState } from "components/table/services/table.service";
import { TradingScheduleInfo } from "gv-api-web";
import { fundHistoryTableTableSelector } from "pages/invest/funds/fund-details/reducers/fund-history-table.reducer";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import Token from "services/api-client/token";
import {
  CurrencyEnum,
  MiddlewareDispatch,
  NextPageWithReduxContext,
  TGetState
} from "utils/types";

import {
  fetchFundAbsoluteProfitChartAction,
  fetchFundBalanceChartAction,
  fetchFundDescriptionAction,
  fetchFundProfitChartAction,
  fundHistoryTableAction,
  fundReallocateHistoryAction
} from "../actions/fund-details.actions";

const correctMinuteString = (minute: number): string =>
  minute < 10 ? `0${minute}` : String(minute);

export const generateScheduleText = (
  schedule?: TradingScheduleInfo
): string => {
  if (!schedule) return "";
  const {
    dayEnd,
    dayStart,
    hourEnd,
    hourStart,
    minuteEnd,
    minuteStart
  } = schedule;
  const hourStartInPM = hourStart > 12 ? hourStart - 12 : hourStart;
  const hourEndInPM = hourEnd > 12 ? hourEnd - 12 : hourEnd;
  return `${dayStart} - ${dayEnd}, ${hourStartInPM}:${correctMinuteString(
    minuteStart
  )} p.m. - ${hourEndInPM}:${correctMinuteString(minuteEnd)} p.m. (UTC)`;
};

export const dispatchFundDescriptionWithId = (
  id: string,
  auth = Token.create(),
  currency: CurrencyEnum = "GVT"
) => async (dispatch: MiddlewareDispatch) =>
  await dispatch(fetchFundDescriptionAction(id, auth, currency));

export const dispatchFundDescription = (
  ctx?: NextPageWithReduxContext,
  currency?: CurrencyEnum
) => async (dispatch: MiddlewareDispatch, getState: TGetState) => {
  const {
    fundDetails: { description }
  } = getState();
  const stateId = description.data?.id;
  return await dispatch(
    dispatchFundDescriptionWithId(
      ctx ? (ctx.query.id as string) : stateId!,
      ctx?.token,
      currency
    )
  );
};

// export const fetchFundStructure = (
//   fundId: string
// ): Promise<FundAssetsListInfo> => {
//   return fundsApi.getFundAssets(fundId);
// };
export const getDashboardHistoryDetailsCounts = (fundId: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const commonFiltering = { take: 0 };

  const historyCountFilters = composeRequestFiltersByTableState(
    fundHistoryTableTableSelector(getState())
  );
  dispatch(
    getFundHistoryTable(fundId)({
      ...historyCountFilters,
      ...commonFiltering
    })
  );
};

export const getFundReallocateHistory = (fundId: string) => (
  filters?: FilteringType
) => {
  return fundReallocateHistoryAction(fundId, filters);
};

export const getFundHistoryTable = (fundId: string) => (
  filters?: FilteringType
) => {
  return fundHistoryTableAction(fundId, filters);
};

/*export const getFundStructure = (fundId: string) => (
  filters: ComposeFiltersAllType
) => {
  return fundStructureAction(fundId);
};*/

export const getAbsoluteProfitChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => dispatch =>
  dispatch(fetchFundAbsoluteProfitChartAction(id, period, currencies[0]));

export const getProfitChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => dispatch => dispatch(fetchFundProfitChartAction(id, period, currencies));

export const getBalanceChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => dispatch => {
  dispatch(fetchFundBalanceChartAction(id, period, currencies[0]));
};
