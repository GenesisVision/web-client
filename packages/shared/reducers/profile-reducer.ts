import {
  ItemsViewModelReferralFriend,
  RewardsHistoryViewModel
} from "gv-api-web";
import { combineReducers } from "redux";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "shared/components/table/reducers/table.reducer";

import { RootState } from "./root-reducer";

export const REFERRAL_FRIENDS = "referralFriends";
export const REFERRAL_HISTORY = "referralHistory";

export type TReferralFriends = ItemsViewModelReferralFriend;
export type TReferralHistory = RewardsHistoryViewModel;

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
>(referralFriendsSelector, "items");

export const referralHistorySelector = (state: RootState) =>
  state.profile.referralHistory;

export const referralHistoryTableSelector = tableSelectorCreator<
  RootState,
  TReferralHistory,
  TReferralHistory
>(referralHistorySelector, "items");

const referralFriendsReducer = tableReducerFactory<TReferralFriends>({
  type: REFERRAL_FRIENDS,
  paging: DEFAULT_PAGING
});

const referralHistory = tableReducerFactory<TReferralHistory>({
  type: REFERRAL_HISTORY,
  paging: DEFAULT_PAGING
});

const profileReducer = combineReducers<ProfileState>({
  [REFERRAL_FRIENDS]: referralFriendsReducer,
  [REFERRAL_HISTORY]: referralHistory
});

export default profileReducer;
