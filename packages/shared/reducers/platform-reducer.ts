import { PlatformInfo } from "gv-api-web";
import { PLATFORM_SETTINGS } from "shared/actions/platform-actions";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import {
  apiFieldSelector,
  apiSelector,
  fieldSelector
} from "shared/utils/selectors";

export type PlatformState = IApiState<PlatformInfo>;

export const platformDataSelector = apiSelector<PlatformInfo>(
  state => state.platformData
);

export const currenciesSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.currencies),
  []
);

export const programTagsSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.enums.program.programTags),
  []
);

export const programsInfoSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.programsInfo),
  []
);

const platformReducer = apiReducerFactory<PlatformInfo>({
  apiType: PLATFORM_SETTINGS
});

export default platformReducer;
