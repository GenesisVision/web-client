import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { apiFieldSelector, apiSelector, fieldSelector } from "utils/selectors";

import { FETCH_ACCOUNT_DESCRIPTION } from "../account-details.constants";
import { AccountDetailsDataType } from "../account-details.types";

export type AccountDescriptionDataType = AccountDetailsDataType;

export type AccountDescriptionState = IApiState<AccountDescriptionDataType>;

export const accountDescriptionSelector = apiSelector<
  AccountDescriptionDataType
>(state => state.accountDetails.description);

export const accountIdSelector = apiFieldSelector(
  accountDescriptionSelector,
  fieldSelector(state => state.id),
  undefined
);

export const accountStatusSelector = apiFieldSelector(
  accountDescriptionSelector,
  fieldSelector(state => state.publicInfo.status),
  undefined
);

const accountDescriptionReducer = apiReducerFactory<AccountDescriptionDataType>(
  {
    apiType: FETCH_ACCOUNT_DESCRIPTION
  }
);

export default accountDescriptionReducer;
