import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { PROFILE } from "../actions/profile-actions.constants";

const profileReducer = apiReducerFactory({ apiType: PROFILE });

export default profileReducer;
