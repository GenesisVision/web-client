import { PLATFORM_SETTINGS } from "../actions/platform-actions";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

const platformReducer = apiReducerFactory({
  apiType: PLATFORM_SETTINGS
});

export default platformReducer;
