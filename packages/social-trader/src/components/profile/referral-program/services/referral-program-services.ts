import partnershipApi from "services/api-client/partnership-api";
import profileApi from "services/api-client/profile-api";
import authService from "services/auth-service";
import { CurrencyEnum } from "utils/types";

import { referralFriendsTableAction } from "../actions/referral-friends-table.actions";
import { referralHistoryTableAction } from "../actions/referral-history-table.actions";

export const getReferralDetails = (currency: CurrencyEnum) => {
  const authorization = authService.getAuthArg();
  return partnershipApi.getDetails(authorization, { currency });
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
