import { cookieServiceCreator } from "utils/cookie-service.creator";

export const REFERRAL_CODE = "ref";

export const { get: getRef, set: setRef } = cookieServiceCreator<string>({
  key: REFERRAL_CODE,
  initialState: undefined
});
