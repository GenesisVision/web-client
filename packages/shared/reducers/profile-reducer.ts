import { combineReducers } from "redux";
import tableReducerFactory, {
  ITableState
} from "shared/components/table/reducers/table.reducer";
import {
  PROGRAM_SUBSCRIBERS_DEFAULT_FILTERS,
  PROGRAM_SUBSCRIBERS_FILTERS
} from "shared/components/programs/program-details/program-details.constants";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { PROGRAM_SUBSCRIPTIONS } from "shared/components/programs/program-details/actions/program-details.actions";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";
import { RootState } from "./root-reducer";

const REFERRAL_FRIENDS = "referralFriends";
const REFERRAL_HISTORY = "referralHistory";

export type TReferralFriends = { total: number; items: any };
export type TReferralHistory = { total: number; items: any };

export type ProfileState = Readonly<{
  [REFERRAL_FRIENDS]: ITableState<TReferralFriends>;
  [REFERRAL_HISTORY]: ITableState<TReferralHistory>;
}>;

const referralFriendsSelector = (state: RootState) =>
  state.profile.referralFriends;

export const referralFriendsTableSelector = tableSelectorCreator<
  RootState,
  TReferralFriends,
  TReferralFriends
>(referralFriendsSelector, REFERRAL_FRIENDS);

const referralHistorySelector = (state: RootState) =>
  state.profile.referralHistory;

export const referralHistoryTableSelector = tableSelectorCreator<
  RootState,
  TReferralFriends,
  TReferralFriends
>(referralHistorySelector, REFERRAL_HISTORY);

const referralFriendsReducer = tableReducerFactory<TReferralFriends>({
  // Temp data from program subscriptions
  type: PROGRAM_SUBSCRIPTIONS,
  paging: DEFAULT_PAGING,
  filtering: PROGRAM_SUBSCRIBERS_FILTERS,
  defaultFilters: PROGRAM_SUBSCRIBERS_DEFAULT_FILTERS
});

const referralHistory = tableReducerFactory<TReferralHistory>({
  // Temp data from program subscriptions
  type: PROGRAM_SUBSCRIPTIONS,
  paging: DEFAULT_PAGING,
  filtering: PROGRAM_SUBSCRIBERS_FILTERS,
  defaultFilters: PROGRAM_SUBSCRIBERS_DEFAULT_FILTERS
});

const profileReducer = combineReducers<ProfileState>({
  [REFERRAL_FRIENDS]: referralFriendsReducer,
  [REFERRAL_HISTORY]: referralHistory
});

export default profileReducer;
