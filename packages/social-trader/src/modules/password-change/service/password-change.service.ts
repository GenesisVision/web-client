import { ChangePasswordViewModel } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const changePassword = (body: ChangePasswordViewModel) =>
  api.auth().changePassword({
    body
  });
