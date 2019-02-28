import { PlatformInfo } from "gv-api-web";
import { PLATFORM_SETTINGS } from "shared/actions/platform-actions";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

export type PlatformState = IApiReducerFactory<PlatformInfo>;

const platformReducer = apiReducerFactory<PlatformInfo>({
  apiType: PLATFORM_SETTINGS
});

export default platformReducer;
