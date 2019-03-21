import { ProfileHeaderViewModel } from "gv-api-web";
import { combineReducers } from "redux";
import { PROFILE_HEADER } from "shared/components/header/header.constants";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";
import { IApiState } from "shared/reducers/api-reducer/api-reducer";

export type HeaderState = {
  readonly info: IApiState<ProfileHeaderViewModel>;
};

const headerReducer = combineReducers<HeaderState>({
  info: apiReducerFactory<ProfileHeaderViewModel>({
    apiType: PROFILE_HEADER
  })
});

export default headerReducer;
