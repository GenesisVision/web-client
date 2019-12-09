import { PLATFORM_SETTINGS } from "actions/platform-actions";
import { SelectFilterValue } from "components/table/components/filtering/filter.type";
import {
  AmountWithCurrency,
  FundCreateAssetPlatformInfo,
  PlatformInfo,
  ProgramAssetPlatformInfo,
  ProgramCreateAssetPlatformInfo,
  ProgramMinInvestAmount,
  TradingAccountMinCreateAmount
} from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { createSelector } from "reselect";
import { ASSET } from "shared/constants/constants";
import { apiFieldSelector, apiSelector, fieldSelector } from "utils/selectors";
import { AuthRootState } from "utils/types";

export type PlatformState = IApiState<PlatformInfo>;

export const platformDataSelector = apiSelector<PlatformInfo>(
  state => state.platformData
);

export const gvInvestFeeSelector = apiFieldSelector<PlatformInfo, number>(
  platformDataSelector,
  fieldSelector(state => state.commonInfo.platformCommission.investment),
  0
);

export const tradingAccountMinDepositAmountsSelector = apiFieldSelector<
  PlatformInfo,
  TradingAccountMinCreateAmount[]
>(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.tradingAccountInfo.minAmounts),
  []
);

export const fundMinDepositAmountSelector = apiFieldSelector<
  PlatformInfo,
  AmountWithCurrency[]
>(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.fundInfo.minInvestAmountIntoFund),
  []
);

export const programMinDepositAmountsSelector = apiFieldSelector<
  PlatformInfo,
  ProgramMinInvestAmount[]
>(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.programInfo.minInvestAmounts),
  []
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

export const programsInfoSelector = apiFieldSelector<
  PlatformInfo,
  ProgramAssetPlatformInfo
>(platformDataSelector, fieldSelector(state => state.assetInfo.programInfo));

export const createProgramInfoSelector = apiFieldSelector<
  PlatformInfo,
  ProgramCreateAssetPlatformInfo
>(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.programInfo.createProgramInfo)
);

export const createFundInfoSelector = apiFieldSelector<
  PlatformInfo,
  FundCreateAssetPlatformInfo
>(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.fundInfo.createFundInfo)
);

export const assetTypeValuesSelector = createSelector<
  AuthRootState,
  PlatformInfo | undefined,
  SelectFilterValue<string>[]
>(
  state => platformDataSelector(state),
  data =>
    (data &&
      data.filters.events.map(({ key, title }) => ({
        value: key,
        label: title
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
      [{ key: "test", title: "test" }].map(({ key, title }) => ({
        // TODO remove after union
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
      return data.filters.events.map(
        // TODO remove after union
        ({ key, title }: { key: string; title: string }) => ({
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
