import profileApi from "services/api-client/profile-api";
import authService from "services/auth-service";

export const getHeader = () =>
  profileApi.getProfileHeader(authService.getAuthArg());
