import { PlatformInfo } from "gv-api-web";
import platformApi from "services/api-client/platform-api";
import { ApiAction } from "utils/types";

export const PLATFORM_SETTINGS = "PLATFORM_SETTINGS";

const fetchPlatformSettingsAction = (): ApiAction<PlatformInfo> => ({
  type: PLATFORM_SETTINGS,
  payload: platformApi.getPlatformInfo()
});

const platformActions = {
  fetchPlatformSettings: fetchPlatformSettingsAction
};

export default platformActions;
