import { api } from "services/api-client/swagger-custom-client";

export const setSocialTesterOn = () =>
  api.profile().switchBetaFeatureOn({ feature: "Social" });

export const setSocialTesterOff = () =>
  api.profile().switchBetaFeatureOff({ feature: "Social" });
