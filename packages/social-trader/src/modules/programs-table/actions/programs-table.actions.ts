import { Currency, ItemsViewModelProgramDetailsListItem } from "gv-api-web";
import programApi from "services/api-client/programs-api";
import { ActionType } from "utils/types";

export const PROGRAMS = "PROGRAMS";

export const fetchProgramsAction = (
  filters: FetchProgramsFiltersType // TODO change api to create interface to this
): ActionType<Promise<ItemsViewModelProgramDetailsListItem>> => ({
  type: PROGRAMS,
  payload: programApi.getPrograms(filters)
});

export type FetchProgramsFiltersType = {
  authorization?: string;
  levelMin?: number;
  levelMax?: number;
  levelsSet?: number[];
  profitAvgMin?: number;
  profitAvgMax?: number;
  sorting?: string;
  programCurrency?: Currency;
  currency?: Currency;
  levelUpFrom?: number;
  tags?: string[];
  isSignal?: boolean;
  statisticDateFrom?: Date;
  statisticDateTo?: Date;
  chartPointsCount?: number;
  mask?: string;
  facetId?: string;
  isFavorite?: boolean;
  isEnabled?: boolean;
  hasInvestorsForAll?: boolean;
  hasInvestorsForClosed?: boolean;
  ids?: string[];
  managerId?: string;
  programManagerId?: string;
  status?: string[];
  skip?: number;
  take?: number;
};
