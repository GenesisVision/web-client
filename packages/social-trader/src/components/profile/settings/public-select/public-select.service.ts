import { api, Token } from "services/api-client/swagger-custom-client";

export const setPublicOn = () => api.profile().switchPublicInvestorOn();

export const setPublicOff = () => api.profile().switchPublicInvestorOff();
