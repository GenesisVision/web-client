import { api } from "services/api-client/swagger-custom-client";

export const confirmThreeStepAuth = ({
  email,
  token,
  code
}: {
  email: string;
  token: string;
  code: string;
}) =>
  api.auth().confirmThreeStepAuth({
    body: {
      token: token!,
      email,
      code
    }
  });
