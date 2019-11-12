import {
  AmountWithCurrency,
  FilterModel,
  ItemsViewModelProgramDetailsList,
  PlatformInfo,
  ProgramAssetPlatformInfo,
  ProgramMinInvestAmount
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
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

export type PlatformState = IApiState<PlatformInfo>;

export const platformDataSelector = apiSelector<PlatformInfo>(
  state => state.platformData
);

export const gvInvestFeeSelector = apiFieldSelector<PlatformInfo, number>(
  platformDataSelector,
  fieldSelector(state => state.commonInfo.platformCommission.investment),
  0
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

export const assetTypeValuesSelector = createSelector<
  AuthRootState,
  PlatformInfo | undefined,
  SelectFilterValue<string>[]
>(
  state => platformDataSelector(state),
  data =>
    (data &&
      ["test"].map(type => ({
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
