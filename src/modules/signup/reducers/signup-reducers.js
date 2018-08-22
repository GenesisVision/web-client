import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import { SIGN_UP } from "../actions/signup-actions.constants";

const signUpReducer = apiReducerFactory({ apiType: SIGN_UP });

export default signUpReducer;
