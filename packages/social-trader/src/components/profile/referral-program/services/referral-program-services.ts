import { Currency, ReferralFriendItemsViewModel } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const getReferralDetails = (currency: Currency) => {
  return api.partnership().getDetails({ currency });
};

export const getFriendsTable = (
  filters: any
): Promise<ReferralFriendItemsViewModel> => {
  return api.partnership().getReferrals(filters);
};

export const getHistoryTable = (filters: any) => {
  return api.partnership().getRewardsHistory(filters);
};

export const getProfile = () => api.profile().getProfileFull();
