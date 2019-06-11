import { SIGN_UP } from "shared/components/auth/signup/actions/signup.actions";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";

export type SignUpState = IApiState<any>;

const signUpReducer = apiReducerFactory<any>({ apiType: SIGN_UP });

export default signUpReducer;
