import { LevelUpSummary, ProgramsList } from "gv-api-web";
import programApi from "shared/services/api-client/programs-api";
import { ActionType } from "shared/utils/types";

export const PROGRAMS_RATING = "PROGRAMS_RATING";
export const SELF_PROGRAMS_RATING = "SELF_PROGRAMS_RATING";
export const LEVELUP_SUMMARY = "LEVELUP_SUMMARY";

export const fetchProgramsRating = (
  filters: IProgramsGetFilters
): ActionType<Promise<ProgramsList>> => ({
  type: PROGRAMS_RATING,
  payload: programApi.v10ProgramsGet(filters)
});

export const fetchSelfProgramsRating = (
  filters: IProgramsGetFilters
): ActionType<Promise<ProgramsList>> => ({
  type: SELF_PROGRAMS_RATING,
  payload: programApi.v10ProgramsGet(filters)
});

export const fetchLevelUpSummary = (
  opts: IProgramsLevelupSummaryGetOpts
): ActionType<Promise<LevelUpSummary>> => ({
  type: LEVELUP_SUMMARY,
  payload: programApi.v10ProgramsLevelupSummaryGet(opts)
});

export interface IProgramsLevelupSummaryGetOpts {
  authorization?: string;
}

export interface IProgramsGetFilters {
  authorization?: string;
  levelMin?: number;
  levelMax?: number;
  levelsSet?: number[];
  profitAvgMin?: number;
  profitAvgMax?: number;
  sorting?: string;
  programCurrency?: string;
  currency?: string;
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
}
