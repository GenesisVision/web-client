import { ItemsViewModelProgramDetailsListItem } from "gv-api-web";
import programApi from "services/api-client/programs-api";
import { ActionType } from "utils/types";

export const PROGRAMS_RATING = "PROGRAMS_RATING";
export const SELF_PROGRAMS_RATING = "SELF_PROGRAMS_RATING";
export const LEVELUP_SUMMARY = "LEVELUP_SUMMARY";

export const fetchProgramsRating = (
  filters: IProgramsGetFilters
): ActionType<Promise<ItemsViewModelProgramDetailsListItem>> => ({
  type: PROGRAMS_RATING,
  //@ts-ignore
  payload: programApi.getPrograms(filters)
});

export const fetchSelfProgramsRating = (
  filters: IProgramsGetFilters
): ActionType<Promise<ItemsViewModelProgramDetailsListItem>> => ({
  type: SELF_PROGRAMS_RATING,
  //@ts-ignore
  payload: programApi.getPrograms(filters)
});
//
// export const fetchLevelUpSummary = (
//   opts: IProgramsLevelupSummaryGetOpts
// ): ActionType<Promise<any>> => ({  //LevelUpSummary
//   type: LEVELUP_SUMMARY,
//   payload: (Promise.resolve({
//     levelData: []
//   }) as unknown) as Promise<any> //LevelUpSummary
// });

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
