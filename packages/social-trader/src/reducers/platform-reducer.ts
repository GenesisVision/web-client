import { PLATFORM_SETTINGS } from "actions/platform-actions";
import { SelectFilterValue } from "components/table/components/filtering/filter.type";
import {
  AmountWithCurrency,
  EventFilters,
  FollowCreateAssetPlatformInfo,
  FundCreateAssetPlatformInfo,
  PlatformCurrencyInfo,
  PlatformInfo,
  ProgramAssetPlatformInfo,
  ProgramCreateAssetPlatformInfo,
  ProgramMinInvestAmount,
  TradingAccountMinCreateAmount,
  UsersSocialLinkInfo
} from "gv-api-web";
import { FilterItemInfo } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { createSelector } from "reselect";
import { apiFieldSelector, apiSelector, fieldSelector } from "utils/selectors";
import { AuthRootState } from "utils/types";

export type PlatformState = IApiState<PlatformInfo>;

export const platformDataSelector = apiSelector<PlatformInfo>(
  state => state.platformData
);

export const minDemoDepositAmountSelector = apiFieldSelector<
  PlatformInfo,
  number
>(
  platformDataSelector,
  fieldSelector(
    state =>
      state.assetInfo.tradingAccountInfo.maxAmounts[0].transferDemo[0].amount
  ),
  Number.MIN_SAFE_INTEGER
);

export const createFollowInfoSelector = apiFieldSelector<
  PlatformInfo,
  FollowCreateAssetPlatformInfo
>(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.followInfo.createFollowInfo),
  undefined
);

export const gvInvestFeeSelector = apiFieldSelector<PlatformInfo, number>(
  platformDataSelector,
  fieldSelector(state => state.commonInfo.platformCommission.investment),
  0
);

export const subscribeFixedCurrenciesSelector = apiFieldSelector<
  PlatformInfo,
  Array<string>
>(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.followInfo.subscribeFixedCurrencies),
  []
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

export const fundMinWithdrawAmountSelector = apiFieldSelector<
  PlatformInfo,
  AmountWithCurrency[]
>(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.fundInfo.minWithdrawAmountFromFund),
  []
);

export const minTransferAmountsSelector = apiFieldSelector<
  PlatformInfo,
  PlatformCurrencyInfo[]
>(
  platformDataSelector,
  fieldSelector(state => state.commonInfo.platformCurrencies),
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
  fieldSelector(state =>
    state.commonInfo.platformCurrencies.map(currency => currency.name)
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

export const followTagsSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.followInfo.tags),
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
>(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.programInfo)
);

export const isInvestingBscEnabledSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.anonymousInfo.isInvestingBscEnabled),
  undefined
);

export const isInvestingXDaiEnabledSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.anonymousInfo.isInvestingXDaiEnabled),
  undefined
);

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
      data.filters.assets.map(({ key, title }) => ({
        value: key,
        label: title
      }))) ||
    []
);

export const fundHistoryEventsSelector = createSelector<
  RootState,
  PlatformInfo | undefined,
  Array<FilterItemInfo> | undefined
>(
  platformDataSelector,
  data => (data && data.filters.fundsHistoryEvents) || undefined
);

export const allEventsSelector = createSelector<
  RootState,
  PlatformInfo | undefined,
  EventFilters | undefined
>(platformDataSelector, data => (data && data.filters.events) || undefined);

const platformReducer = apiReducerFactory<PlatformInfo>({
  apiType: PLATFORM_SETTINGS
});

export const socialLinkTypesSelector = apiFieldSelector<
  PlatformInfo,
  Array<UsersSocialLinkInfo>
>(
  platformDataSelector,
  fieldSelector(state => state.usersInfo.socialLinkTypes),
  undefined
);

export default platformReducer;
