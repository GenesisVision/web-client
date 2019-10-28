import { PartnershipDetails } from "gv-api-web";
import { REFERRAL_DETAILS } from "shared/reducers/profile-reducer";
import partnershipApi from "shared/services/api-client/partnership-api";
import { ApiAction, CurrencyEnum } from "shared/utils/types";

export const referralDetailsAction = (
  auth: string,
  currency: CurrencyEnum
): ApiAction<PartnershipDetails> => ({
  type: REFERRAL_DETAILS,
  payload: partnershipApi.getDetails(auth, { currency })
});
