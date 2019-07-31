import { FundDetailsFull } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { apiSelector } from "shared/utils/selectors";

import { FETCH_FUND_DESCRIPTION } from "../actions/fund-details.actions";

export type FundDescriptionDataType = FundDetailsFull;

export type FundDescriptionState = IApiState<FundDescriptionDataType>;

export const fundDescriptionSelector = apiSelector<
  FundDescriptionDataType,
  RootState
>(state => state.fundDetails.description);

const fundDescriptionReducer = apiReducerFactory<FundDescriptionDataType>({
  apiType: FETCH_FUND_DESCRIPTION
});

export default fundDescriptionReducer;
