import {
  CancelablePromise,
  LevelsParamsInfo,
  ProgramBalanceChart,
  ProgramDetailsFull,
  ProgramProfitChart,
  TradesViewModel
} from "gv-api-web";
import { getDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import platformApi from "shared/services/api-client/platform-api";
import programsApi from "shared/services/api-client/programs-api";
import { ActionType, ApiAction, CurrencyEnum } from "shared/utils/types";

import { ComposeFiltersAllType } from "../../../table/components/filtering/filter.type";

export const FETCH_PROGRAM_PROFIT_CHART = "FETCH_PROGRAM_PROFIT_CHART";
export const FETCH_PROGRAM_BALANCE_CHART = "FETCH_PROGRAM_BALANCE_CHART";
export const FETCH_PROGRAM_DESCRIPTION = "FETCH_PROGRAM_DESCRIPTION";
export const FETCH_LEVEL_PARAMETERS = "FETCH_LEVEL_PARAMETERS";

export const PROGRAM_OPEN_POSITIONS = "PROGRAM_OPEN_POSITIONS";

export const fetchProgramProfitChartAction = (
  id: string,
  period = getDefaultPeriod()
): ApiAction<ProgramProfitChart> => ({
  type: FETCH_PROGRAM_PROFIT_CHART,
  payload: programsApi.v10ProgramsByIdChartsProfitGet(id, {
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  })
});

export const fetchProgramBalanceChartAction = (
  id: string,
  period = getDefaultPeriod()
): ApiAction<ProgramBalanceChart> => ({
  type: FETCH_PROGRAM_BALANCE_CHART,
  payload: programsApi.v10ProgramsByIdChartsBalanceGet(id, {
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  })
});

export const fetchProgramDescriptionAction = (
  id: string,
  authorization: string
): ApiAction<ProgramDetailsFull> => ({
  type: FETCH_PROGRAM_DESCRIPTION,
  payload: programsApi.v10ProgramsByIdGet(id, { authorization })
});

export const fetchLevelParametersAction = (
  currency: CurrencyEnum
): ApiAction<LevelsParamsInfo> => ({
  type: FETCH_LEVEL_PARAMETERS,
  payload: platformApi.v10PlatformLevelsParametersGet({ currency })
});

export const fetchOpenPositionsAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<TradesViewModel>> => ({
  type: PROGRAM_OPEN_POSITIONS,
  payload: programsApi.v10ProgramsByIdTradesOpenGet(id, filters)
});
