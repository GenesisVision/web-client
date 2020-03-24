import { ReferralFriendItemsViewModel } from "gv-api-web";
import partnershipApi from "services/api-client/partnership-api";
import profileApi from "services/api-client/profile-api";
import { CurrencyEnum } from "utils/types";

export const getReferralDetails = (currency: CurrencyEnum) => {
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

export const getProfile = () => profileApi.getProfileFull();
