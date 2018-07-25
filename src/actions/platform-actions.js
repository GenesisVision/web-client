import SwaggerInvestorApi from "../services/api-client/swagger-investor-api";

export const PLATFORM_SETTINGS = "PLATFORM_SETTINGS";

const fetchPlatformSettings = {
  type: PLATFORM_SETTINGS
  // payload: SwaggerInvestorApi.apiInvestorPlatformStatusGet()
};

const platformActions = {
  fetchPlatformSettings
};

export default platformActions;
