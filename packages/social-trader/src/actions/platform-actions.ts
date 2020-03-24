import { PlatformInfo } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import { ApiAction } from "utils/types";

export const PLATFORM_SETTINGS = "PLATFORM_SETTINGS";

const fetchPlatformSettingsAction = (): ApiAction<PlatformInfo> => ({
  type: PLATFORM_SETTINGS,
  payload: api.platform().getPlatformInfo()
});

const platformActions = {
  fetchPlatformSettings: fetchPlatformSettingsAction
};

export default platformActions;
