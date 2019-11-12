import { FundDetailsFull } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import {
  apiFieldSelector,
  apiSelector,
  fieldSelector
} from "shared/utils/selectors";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

import { FETCH_FUND_DESCRIPTION } from "../fund-details.constants";

export type FundDescriptionDataType = FundDetailsFull;

export type FundDescriptionState = IApiState<FundDescriptionDataType>;

export const fundDescriptionSelector = apiSelector<
  FundDescriptionDataType,
  RootState
>(state => state.fundDetails.description);

export const fundIdSelector = apiFieldSelector(
  fundDescriptionSelector,
  fieldSelector(state => state.id),
  undefined
);

const fundDescriptionReducer = apiReducerFactory<FundDescriptionDataType>({
  apiType: FETCH_FUND_DESCRIPTION
});

export default fundDescriptionReducer;
