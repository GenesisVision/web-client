import { PlatformInfo } from "gv-api-web";
import { PLATFORM_SETTINGS } from "shared/actions/platform-actions";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";

export type PlatformState = IApiState<PlatformInfo>;

const platformReducer = apiReducerFactory<PlatformInfo>({
  apiType: PLATFORM_SETTINGS
});

export default platformReducer;
