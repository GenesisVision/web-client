import {
  Currency,
  ProgramDetailsListItemItemsViewModel,
  ProgramsFilterSorting
} from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";
import { ActionType } from "utils/types";

export const PROGRAMS = "PROGRAMS";

export const fetchProgramsAction = (
  filters: FetchProgramsFiltersType,
  token?: Token
): ActionType<Promise<ProgramDetailsListItemItemsViewModel>> => ({
  type: PROGRAMS,
  payload: api.programs(token).getPrograms(filters)
});

export type FetchProgramsFiltersType = {
  levelMin?: number;
  levelMax?: number;
  levelsSet?: number[];
  profitAvgMin?: number;
  profitAvgMax?: number;
  sorting?: ProgramsFilterSorting;
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
