import { LOGOUT } from "actions/auth-actions";
import clearableReducer from "reducers/clearable.reducer";
import { combineReducers } from "redux";

import { RootState, sharedRootReducers } from "./root-reducer";

export type AuthRootState = RootState;

const rootReducer = clearableReducer(
  combineReducers<AuthRootState>(sharedRootReducers),
  LOGOUT
);

export default rootReducer;
