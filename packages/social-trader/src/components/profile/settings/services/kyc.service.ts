import { launchWebSdk } from "components/profile/settings/services/sumsub-sdk";
import { api } from "services/api-client/swagger-custom-client";

export const loadKycIFrame = (userId: string) => {
  api
    .profile()
    .getWebVerificationToken()
    .then(({ flowName, baseAddress, accessToken }) => {
      launchWebSdk({
        userId,
        apiUrl: baseAddress.slice(0, baseAddress.length - 1),
        flowName,
        accessToken
      });
    });
};
