import { PlatformInfo, ProgramsInfo } from "gv-api-web";
import { createSelector } from "reselect";
import { PLATFORM_SETTINGS } from "shared/actions/platform-actions";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { ASSET, ROLE_ENV } from "shared/constants/constants";
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

export const programCurrenciesSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.programCurrencies),
  []
);

export const platformCurrenciesSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.platformCurrencies),
  []
);

export const programTagsSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.enums.program.programTags),
  []
);

export const fundAssetsSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.enums.fund.assets),
  []
);

export const programsInfoSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.programsInfo),
  {} as ProgramsInfo
);

export const allEventsSelector = createSelector<
  AuthRootState,
  PlatformInfo | undefined,
  SelectFilterValue<string>[]
>(
  state => platformDataSelector(state),
  data => {
    if (!data) return [];
    const { funds, programs } = (data.enums.program as any)[
      `${ROLE_ENV}NotificationType`
    ];
    return getUnique([...funds, ...programs]).map(event => ({
      value: event,
      labelKey: `dashboard-page.portfolio-events.types.${event}`
    }));
  }
);

export const assetEventsSelectorCreator = (asset: ASSET) =>
  createSelector<
    AuthRootState,
    PlatformInfo | undefined,
    SelectFilterValue<string>[]
  >(
    state => platformDataSelector(state),
    data => {
      if (!data) return [];
      const assets = (data.enums.program as any)[`${ROLE_ENV}NotificationType`][
        `${asset.toLowerCase()}s`
      ];
      return assets.map((event: string) => ({
        value: event,
        labelKey: `dashboard-page.portfolio-events.types.${event}`
      }));
    }
  );

export const fundEventsSelector = assetEventsSelectorCreator(ASSET.FUND);

export const programEventsSelector = assetEventsSelectorCreator(ASSET.PROGRAM);

const platformReducer = apiReducerFactory<PlatformInfo>({
  apiType: PLATFORM_SETTINGS
});

export default platformReducer;
