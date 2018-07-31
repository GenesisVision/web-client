import {
  PROFILE_HEADER,
  PROFILE_REQUEST_TIMEOUT
} from "modules/profile-header/profile-header.constants";
import profileApi from "services/api-client/profile-api";
import authService from "services/auth-service";

const fetchHeaderInfo = () => ({
  type: PROFILE_HEADER,
  payload: profileApi.v10ProfileHeaderGet(authService.getAuthArg())
});

export const initHeaderInfo = () => dispatch => {
  dispatch(fetchHeaderInfo());
  const counter = setInterval(() => {
    dispatch(fetchHeaderInfo());
  }, PROFILE_REQUEST_TIMEOUT);
  return () => {
    clearInterval(counter);
  };
};
