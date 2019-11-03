import {
  FilterModel,
  PlatformInfo,
  ItemsViewModelProgramDetailsList
} from "gv-api-web";
import { createSelector } from "reselect";
import { PLATFORM_SETTINGS } from "shared/actions/platform-actions";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { ASSET, ROLE, ROLE_ENV } from "shared/constants/constants";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import {
  apiFieldSelector,
  apiSelector,
  fieldSelector
} from "shared/utils/selectors";
import { AuthRootState } from "shared/utils/types";

import { RootState } from "./root-reducer";

export type PlatformState = IApiState<PlatformInfo>;

export const platformDataSelector = apiSelector<PlatformInfo>(
  state => state.platformData
);

export const currenciesSelector = apiFieldSelector(
  // TODO currency-selector-container
  platformDataSelector,
  fieldSelector(
    state => state.assetInfo.programInfo.availableProgramCurrencies
  ), //TODO
  []
);

export const programCurrenciesSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(
    state => state.assetInfo.programInfo.availableProgramCurrencies
  ), //TODO
  []
);

export const platformCurrenciesSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.commonInfo.platformCurrencies),
  []
);

export const programTagsSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.programInfo.tags),
  []
);

export const fundAssetsSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.fundInfo.assets),
  []
);

export const programsInfoSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.programsInfo),
  {} as ItemsViewModelProgramDetailsList
);

export const assetTypeValuesSelector = createSelector<
  AuthRootState,
  PlatformInfo | undefined,
  SelectFilterValue<string>[]
>(
  state => platformDataSelector(state),
  data =>
    (data &&
      data.enums.assetTypes.map(type => ({
        value: type,
        label: type
      }))) ||
    []
);

export const allEventsSelector = createSelector<
  AuthRootState,
  PlatformInfo | undefined,
  SelectFilterValue<string>[]
>(
  state => platformDataSelector(state),
  data =>
    (data &&
      data.enums.event[ROLE_ENV || ROLE.MANAGER].allAssets.map(
        ({ key, title }) => ({
          // TODO remove after union
          value: key,
          labelKey: title
        })
      )) ||
    []
);

export const assetEventsSelectorCreator = (asset: ASSET) =>
  createSelector<
    RootState,
    PlatformInfo | undefined,
    SelectFilterValue<string>[]
  >(
    state => platformDataSelector(state),
    data => {
      if (!data) return [];
      return data.filters.events.map(
        // TODO remove after union
        ({ key, title }: FilterModel) => ({
          value: key,
          labelKey: title
        })
      );

      //   .enums.event[ROLE_ENV || ROLE.MANAGER][
      //   `${asset.toLowerCase()}Details`
      // ].map(
      //   // TODO remove after union
      //   ({ key, title }: FilterModel) => ({
      //     value: key,
      //     labelKey: title
      //   })
      // );
    }
  );

export const fundEventsSelector = assetEventsSelectorCreator(ASSET.FUND);

export const programEventsSelector = assetEventsSelectorCreator(ASSET.PROGRAM);

const platformReducer = apiReducerFactory<PlatformInfo>({
  apiType: PLATFORM_SETTINGS
});

export default platformReducer;
