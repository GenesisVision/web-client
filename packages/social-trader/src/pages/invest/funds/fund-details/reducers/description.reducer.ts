import { FundDetailsFull } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiFieldSelector, apiSelector, fieldSelector } from "utils/selectors";

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
