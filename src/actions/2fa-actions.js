import autProxy from "services/api-client/auth-api";
import authService from "services/auth-service";

export const TWO_FACTOR_AUTH = "TWO_FACTOR_AUTH";

export const fetchTwoFactor = () => {
  return {
    type: TWO_FACTOR_AUTH,
    payload: autProxy.v10Auth2faGet(authService.getAuthArg())
  };
};
