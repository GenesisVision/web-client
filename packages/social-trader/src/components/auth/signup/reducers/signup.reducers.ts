import { SIGN_UP } from "components/auth/signup/actions/signup.actions";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";

export type SignUpState = IApiState<any>;

const signUpReducer = apiReducerFactory<any>({ apiType: SIGN_UP });

export default signUpReducer;
