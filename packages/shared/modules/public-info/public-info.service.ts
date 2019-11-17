import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";

export const updateProfile = ({ model }) =>
  profileApi.updateProfile(authService.getAuthArg(), {
    model
  });
