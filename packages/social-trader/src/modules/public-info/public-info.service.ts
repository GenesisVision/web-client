import { UpdateProfileViewModel } from "gv-api-web";
import { api, Token } from "services/api-client/swagger-custom-client";

export const updateProfile = ({ model }: { model?: UpdateProfileViewModel }) =>
  api.profile().updateProfile({
    body: model
  });
