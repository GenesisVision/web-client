import useApiRequest from "hooks/api-request.hook";
import authApi from "services/api-client/auth-api";
import authService from "services/auth-service";

export const getTfaStatus = () =>
  authApi.getTwoStepAuthStatus(authService.getAuthArg());

export const useTFAStatus = () => {
  const { data, sendRequest: updateTFAStatus } = useApiRequest({
    request: getTfaStatus,
    fetchOnMount: true
  });
  return {
    twoFactorEnabled: data ? data.twoFactorEnabled : undefined,
    updateTFAStatus
  };
};
