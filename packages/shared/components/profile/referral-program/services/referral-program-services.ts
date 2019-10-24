import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";

import { referralDetailsAction } from "../actions/referral-details.actions";
import { referralFriendsTableAction } from "../actions/referral-friends-table.actions";
import { referralHistoryTableAction } from "../actions/referral-history-table.actions";

export const getReferralDetails = () => {
  const authorization = authService.getAuthArg();
  return referralDetailsAction(authorization);
};

export const getFriendsTable = (filters: any) => {
  const authorization = authService.getAuthArg();
  return referralFriendsTableAction(authorization, filters);
};

export const getHistoryTable = (filters: any) => {
  const authorization = authService.getAuthArg();
  return referralHistoryTableAction(authorization, filters);
};

export const getProfile = () =>
  profileApi.getProfileFull(authService.getAuthArg());
