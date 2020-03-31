import useApiRequest from "hooks/api-request.hook";
import { api } from "services/api-client/swagger-custom-client";

export const getTfaStatus = () => api.auth().getTwoStepAuthStatus();

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
