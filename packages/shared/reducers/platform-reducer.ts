import { FilterModel, PlatformInfo, ProgramsInfo } from "gv-api-web";
import { createSelector } from "reselect";
import { PLATFORM_SETTINGS } from "shared/actions/platform-actions";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { ASSET, ROLE_ENV } from "shared/constants/constants";
import { HEADER_CURRENCY_VALUES } from "shared/modules/currency-select/currency-select.constants";
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
  platformDataSelector,
  fieldSelector(state => state.currencies),
  Object.values(HEADER_CURRENCY_VALUES)
);

export const programCurrenciesSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.programCurrencies),
  []
);

export const platformCurrenciesSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.platformCurrencies),
  [
    { name: "BTC", color: "#F7931A", rateToGvt: 1 },
    { name: "ETH", color: "#627EEA", rateToGvt: 1 },
    { name: "USDT", color: "#26A17B", rateToGvt: 1 },
    { name: "USD", color: "#207137", rateToGvt: 1 },
    { name: "GVT", color: "#16B9AD", rateToGvt: 1 }
  ]
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
      data.enums.event[ROLE_ENV].allAssets.map(({ key, title }) => ({
        value: key,
        labelKey: title
      }))) ||
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
      // @ts-ignore
      return data.enums.event[ROLE_ENV][`${asset.toLowerCase()}Details`].map(
        ({ key, title }: FilterModel) => ({
          value: key,
          labelKey: title
        })
      );
    }
  );

export const fundEventsSelector = assetEventsSelectorCreator(ASSET.FUND);

export const programEventsSelector = assetEventsSelectorCreator(ASSET.PROGRAM);

const platformReducer = apiReducerFactory<PlatformInfo>({
  apiType: PLATFORM_SETTINGS
});

export default platformReducer;
