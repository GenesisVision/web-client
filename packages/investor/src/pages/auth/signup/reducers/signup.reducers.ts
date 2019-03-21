import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";

import { SIGN_UP } from "../actions/signup.actions";

export type SignUpState = IApiState<any>;

const signUpReducer = apiReducerFactory<any>({
  apiType: SIGN_UP
});

export default signUpReducer;
