import authProxy from "services/api-client/auth-api";
import authService from "services/auth-service";

export const TWO_FACTOR_AUTH = "TWO_FACTOR_AUTH";
export const TWO_FACTOR_SET_REQUIREMENT = "TWO_FACTOR_SET_REQUIREMENT";

export const fetchTwoFactor = () => {
  return {
    type: TWO_FACTOR_AUTH,
    payload: authProxy.v10Auth2faGet(authService.getAuthArg())
  };
};

export const setTwoFactorRequirement = twoFactorEnabled => ({
  type: TWO_FACTOR_SET_REQUIREMENT,
  payload: {
    twoFactorEnabled
  }
});
