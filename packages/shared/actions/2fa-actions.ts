import { TwoFactorStatus } from "gv-api-web";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";
import { ActionType, ApiAction } from "shared/utils/types";

export const TWO_FACTOR_AUTH = "TWO_FACTOR_AUTH";
export const TWO_FACTOR_SET_REQUIREMENT = "TWO_FACTOR_SET_REQUIREMENT";

export const fetchTwoFactorAction = (): ApiAction<TwoFactorStatus> => ({
  type: TWO_FACTOR_AUTH,
  payload: authApi.getTwoStepAuthStatus(authService.getAuthArg())
});

export const setTwoFactorRequirementAction = (
  twoFactorEnabled: boolean
): ActionType<TwoFactorStatus> => ({
  type: TWO_FACTOR_SET_REQUIREMENT,
  payload: {
    twoFactorEnabled
  }
});
