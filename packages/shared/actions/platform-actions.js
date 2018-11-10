import platformApi from "shared/services/api-client/platform-api";

export const PLATFORM_SETTINGS = "PLATFORM_SETTINGS";

const fetchPlatformSettings = {
  type: PLATFORM_SETTINGS,
  payload: platformApi.v10PlatformInfoGet()
};

const platformActions = {
  fetchPlatformSettings
};

export default platformActions;
