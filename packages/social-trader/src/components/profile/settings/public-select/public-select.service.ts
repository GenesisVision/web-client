import profileApi from "services/api-client/profile-api";
import authService from "shared/services/auth-service";

export const setPublicOn = () =>
  profileApi.switchPublicInvestorOn(authService.getAuthArg());

export const setPublicOff = () =>
  profileApi.switchPublicInvestorOff(authService.getAuthArg());
