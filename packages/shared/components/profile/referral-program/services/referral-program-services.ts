import authService from "shared/services/auth-service";

import { referralFriendsTableAction } from "../actions/referral-friends-table.actions";
import { referralHistoryTableAction } from "../actions/referral-history-table.actions";

export const getFriendsTable = (filters: any) => {
  const authorization = authService.getAuthArg();
  return referralFriendsTableAction(authorization, filters);
};

export const getHistoryTable = (filters: any) => {
  const authorization = authService.getAuthArg();
  return referralHistoryTableAction(authorization, filters);
};
