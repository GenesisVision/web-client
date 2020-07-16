import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { apiFieldSelector, apiSelector, fieldSelector } from "utils/selectors";

import { FETCH_PROGRAM_DESCRIPTION } from "../program-details.constants";
import { ProgramDescriptionDataType } from "../program-details.types";

export type ProgramDescriptionState = IApiState<ProgramDescriptionDataType>;

export const programDescriptionSelector = apiSelector<
  ProgramDescriptionDataType
>(state => state.programDetails.description);

export const programCurrencySelector = apiFieldSelector(
  programDescriptionSelector,
  fieldSelector(state => state.tradingAccountInfo.currency),
  undefined
);

export const programIdSelector = apiFieldSelector(
  programDescriptionSelector,
  fieldSelector(state => state.id),
  undefined
);

export const programStatusSelector = apiFieldSelector(
  programDescriptionSelector,
  fieldSelector(state => state.publicInfo.status),
  undefined
);

const programDescriptionReducer = apiReducerFactory<ProgramDescriptionDataType>(
  {
    apiType: FETCH_PROGRAM_DESCRIPTION
  }
);

export default programDescriptionReducer;
