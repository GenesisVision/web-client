import useApiRequest from "shared/hooks/api-request.hook";

import { getRate, getSignalInfo } from "./services/program-follow-service";

export const useGetSignalInfo = () => {
  const { data, isPending, sendRequest } = useApiRequest({
    request: getSignalInfo
  });
  return {
    minDeposit: data,
    isMinDepositPending: isPending,
    getMinDeposit: sendRequest
  };
};

export const useGetRate = () => {
  const { data, isPending, sendRequest } = useApiRequest({
    request: getRate
  });
  return {
    rate: data,
    isRatePending: isPending,
    getRate: sendRequest
  };
};
