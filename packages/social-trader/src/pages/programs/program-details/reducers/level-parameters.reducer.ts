import { LevelsParamsInfo } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { apiSelector } from "shared/utils/selectors";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

import { FETCH_LEVEL_PARAMETERS } from "../program-details.constants";

export type LevelParametersDataType = LevelsParamsInfo;

export type LevelParametersState = IApiState<LevelParametersDataType>;

export const levelParametersSelector = apiSelector<
  LevelParametersDataType,
  RootState
>(state => state.programDetails.levelParameters);

const levelParametersReducer = apiReducerFactory<LevelParametersDataType>({
  apiType: FETCH_LEVEL_PARAMETERS
});

export default levelParametersReducer;
