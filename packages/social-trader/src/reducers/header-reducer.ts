import { PROFILE_HEADER } from "components/header/header.constants";
import { BetaTestingType, ProfileHeaderViewModel } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { apiFieldSelector, apiSelector, fieldSelector } from "utils/selectors";

export type HeaderState = IApiState<ProfileHeaderViewModel>;

export const headerSelector = apiSelector<ProfileHeaderViewModel>(
  state => state.profileHeader
);

export const isTwoFactorEnabledSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.isTwoFactorEnabledSelector)
);

export const isBetaTesterByType = (selectType: BetaTestingType) => (
  types: Array<BetaTestingType> = []
): boolean => !!types.find(type => type === selectType);

export const isTerminalBetaTester = isBetaTesterByType("TradingTerminal");

export const isSocialBetaTester = isBetaTesterByType("Social");

export const betaTesterSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.betaTester)
);

export const headerAccountCurrencySelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.platformCurrency)
);

export const managerUrlSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.url)
);

export const isNewUserSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.isNewUser)
);

export const isPublicInvestorSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.isPublicInvestor)
);

export const forexAllowedSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.isForexAllowed)
);

export const kycConfirmedSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.isKycConfirmed)
);

export const notificationsCountSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.notificationsCount),
  0
);

export const nameSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.name),
  ""
);

export const idSelector = apiFieldSelector(
  headerSelector,
  fieldSelector(state => state.id)
);

const headerReducer = apiReducerFactory<ProfileHeaderViewModel>({
  apiType: PROFILE_HEADER
});

export default headerReducer;
