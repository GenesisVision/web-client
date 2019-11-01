import { PlatformInfoOld } from "gv-api-web";
import platformApi from "shared/services/api-client/platform-api";
import { ApiAction } from "shared/utils/types";

export const PLATFORM_SETTINGS = "PLATFORM_SETTINGS";

const fetchPlatformSettingsAction: ApiAction<PlatformInfoOld> = {
  type: PLATFORM_SETTINGS,
  payload: platformApi.getPlatformStatus()
};

const platformActions = {
  fetchPlatformSettings: fetchPlatformSettingsAction
};

export default platformActions;
