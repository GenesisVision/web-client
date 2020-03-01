import { tableSelectorCreator } from "components/table/helpers/table.selector";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "components/table/reducers/table.reducer";
import {
  SERVER_DATE_RANGE_MAX_FILTER_NAME,
  SERVER_DATE_RANGE_MIN_FILTER_NAME
} from "pages/invest/programs/program-details/program-details.constants";
import { RootState } from "reducers/root-reducer";
import { combineReducers } from "redux";

import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "../components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc
} from "../components/table/components/filtering/date-range-filter/date-range-filter.helpers";

export const REFERRAL_HISTORY = "referralHistory";

export type TReferralHistory = any; // TODO declare type

export type ProfileState = Readonly<{
  [REFERRAL_HISTORY]: ITableState<TReferralHistory>;
}>;

export const referralHistorySelector = (state: RootState) =>
  state.profile.referralHistory;

export const referralHistoryTableSelector = tableSelectorCreator<
  RootState,
  TReferralHistory,
  TReferralHistory
>(referralHistorySelector, "items", {
  items: undefined,
  total: 0
});

export const REFERRAL_HISTORY_DEFAULT_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      composeApiRequestValue: composeRequestValueFunc(
        SERVER_DATE_RANGE_MIN_FILTER_NAME,
        SERVER_DATE_RANGE_MAX_FILTER_NAME
      )
    })
  }
];

const REFERRAL_HISTORY_FILTERING = {
  [DATE_RANGE_FILTER_NAME]: DEFAULT_DATE_RANGE_FILTER_VALUE
};

const referralHistory = tableReducerFactory<TReferralHistory>({
  type: REFERRAL_HISTORY,
  paging: DEFAULT_PAGING,
  filtering: REFERRAL_HISTORY_FILTERING,
  defaultFilters: REFERRAL_HISTORY_DEFAULT_FILTERS
});

const profileReducer = combineReducers<ProfileState>({
  [REFERRAL_HISTORY]: referralHistory
});

export default profileReducer;
