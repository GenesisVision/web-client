import { PartnershipDetails } from "gv-api-web";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { REFERRAL_DETAILS } from "shared/reducers/profile-reducer";
import partnershipApi from "shared/services/api-client/partnership-api";
import { ApiAction } from "shared/utils/types";

export const referralDetailsAction = (
  auth: string
): ApiAction<PartnershipDetails> => ({
  type: REFERRAL_DETAILS,
  payload: partnershipApi.getDetails(auth)
});
