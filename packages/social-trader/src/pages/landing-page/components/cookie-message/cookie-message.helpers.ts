import { cookieServiceCreator } from "utils/cookie-service.creator";

const ACCEPT_PARAM_NAME = "ACCEPTCONSENT";

export const { get: getAccept, set: setAccept } = cookieServiceCreator<string>({
  key: ACCEPT_PARAM_NAME,
  initialState: undefined
});
