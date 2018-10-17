import authService from "services/auth-service";

import { fetchInRequests } from "../actions/dashboard.actions";

export const getInRequests = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  dispatch(fetchInRequests(authorization, 0, 100));
};
