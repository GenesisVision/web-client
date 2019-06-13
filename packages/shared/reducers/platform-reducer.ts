import { PlatformInfo } from "gv-api-web";
import { createSelector } from "reselect";
import { PLATFORM_SETTINGS } from "shared/actions/platform-actions";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { getUnique } from "shared/utils/array";
import {
  apiFieldSelector,
  apiSelector,
  fieldSelector
} from "shared/utils/selectors";
import { AuthRootState } from "shared/utils/types";

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

export const eventsSelector = createSelector<
  AuthRootState,
  PlatformInfo | undefined,
  SelectFilterValue<string>[]
>(
  state => platformDataSelector(state),
  data => {
    if (!data) return [];
    const { funds, programs } = data.enums.program.managerNotificationType;
    return getUnique([...funds, ...programs]).map(event => ({
      value: event,
      labelKey: `dashboard-page.portfolio-events.types.${event}`
    }));
  }
);

const platformReducer = apiReducerFactory<PlatformInfo>({
  apiType: PLATFORM_SETTINGS
});

export default platformReducer;
