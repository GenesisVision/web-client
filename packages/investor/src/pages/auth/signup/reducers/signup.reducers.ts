import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

import { SIGN_UP } from "../actions/signup.actions";

export interface ISignUpReducer extends IApiReducerFactory<any> {}

const signUpReducer = apiReducerFactory({
  apiType: SIGN_UP
});

export default signUpReducer;
