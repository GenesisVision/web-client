import { UpdateProfileViewModel } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const updateProfile = ({ model }: { model?: UpdateProfileViewModel }) =>
  api.profile().updateProfile({
    body: model
  });
