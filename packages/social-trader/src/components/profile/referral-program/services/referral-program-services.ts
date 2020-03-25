import { Currency, ReferralFriendItemsViewModel } from "gv-api-web";
import partnershipApi from "services/api-client/partnership-api";
import { api } from "services/api-client/swagger-custom-client";

export const getReferralDetails = (currency: Currency) => {
  return partnershipApi.getDetails({ currency });
};

export const getFriendsTable = (
  filters: any
): Promise<ReferralFriendItemsViewModel> => {
  return partnershipApi.getReferrals(filters);
};

export const getHistoryTable = (filters: any) => {
  return partnershipApi.getRewardsHistory(filters);
};

export const getProfile = () => api.profile().getProfileFull();
