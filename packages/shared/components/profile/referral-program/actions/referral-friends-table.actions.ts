import { ItemsViewModelReferralFriend } from "gv-api-web";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { REFERRAL_FRIENDS } from "shared/reducers/profile-reducer";
import partnershipApi from "shared/services/api-client/partnership-api";
import { ApiAction } from "shared/utils/types";

export const referralFriendsTableAction = (
  auth: string,
  filters: FilteringType
): ApiAction<ItemsViewModelReferralFriend> => ({
  type: REFERRAL_FRIENDS,
  payload: partnershipApi.getReferrals(auth, filters)
});
