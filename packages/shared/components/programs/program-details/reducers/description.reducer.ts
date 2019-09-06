import { ProgramDetailsFull } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { apiSelector } from "shared/utils/selectors";

import { FETCH_PROGRAM_DESCRIPTION } from "../actions/program-details.actions";

export type ProgramDescriptionDataType = ProgramDetailsFull;

export type ProgramDescriptionState = IApiState<ProgramDescriptionDataType>;

export const programDescriptionSelector = apiSelector<
  ProgramDescriptionDataType
>(state => state.programDetails.description);

const programDescriptionReducer = apiReducerFactory<ProgramDescriptionDataType>(
  {
    apiType: FETCH_PROGRAM_DESCRIPTION
  }
);

export default programDescriptionReducer;
