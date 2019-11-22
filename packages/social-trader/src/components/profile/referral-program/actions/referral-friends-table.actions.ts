import { FilteringType } from "components/table/components/filtering/filter.type";
import { ItemsViewModelReferralFriend } from "gv-api-web";
import { REFERRAL_FRIENDS } from "reducers/profile-reducer";
import partnershipApi from "services/api-client/partnership-api";
import { ApiAction } from "utils/types";

export const referralFriendsTableAction = (
  auth: string,
  filters: FilteringType
): ApiAction<ItemsViewModelReferralFriend> => ({
  type: REFERRAL_FRIENDS,
  payload: partnershipApi.getReferrals(auth, filters)
});
