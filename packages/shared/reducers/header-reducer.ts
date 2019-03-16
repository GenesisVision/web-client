import { ProfileHeaderViewModel } from "gv-api-web";
import { combineReducers } from "redux";
import { PROFILE_HEADER } from "shared/components/header/header.constants";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";

export interface HeaderState
  extends Readonly<{
      info: IApiState<ProfileHeaderViewModel>;
    }> {}

const headerReducer = combineReducers<HeaderState>({
  info: apiReducerFactory({
    apiType: PROFILE_HEADER
  })
});

export default headerReducer;
