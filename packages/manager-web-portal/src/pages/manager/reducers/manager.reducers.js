import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { MANAGER_PROFILE } from "../actions/manager.actions";

const managerReducer = apiReducerFactory({ apiType: MANAGER_PROFILE });

export default managerReducer;
