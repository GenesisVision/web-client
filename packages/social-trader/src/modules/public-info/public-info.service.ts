import { UpdateProfileViewModel } from "gv-api-web";
import profileApi from "services/api-client/profile-api";
import authService from "services/auth-service";

export const updateProfile = ({ model }: { model?: UpdateProfileViewModel }) =>
  profileApi.updateProfile(authService.getAuthArg(), {
    body: model
  });
