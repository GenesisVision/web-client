import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { PROFILE_FORM } from "../actions/profile-actions.constants";

const profileFormReducer = apiReducerFactory({ apiType: PROFILE_FORM });

export default profileFormReducer;
