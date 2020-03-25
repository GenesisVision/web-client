import { api, Token } from "services/api-client/swagger-custom-client";

export const setPublicOn = () =>
  api.profile(Token.create()).switchPublicInvestorOn();

export const setPublicOff = () =>
  api.profile(Token.create()).switchPublicInvestorOff();
