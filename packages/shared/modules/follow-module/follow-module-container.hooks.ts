import useApiRequest from "shared/hooks/api-request.hook";
import { fetchRate } from "shared/services/rate-service";

import { getSignalInfo } from "./services/follow-module-service";

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
    request: ({ from, to }) => fetchRate(from, to)
  });
  return {
    rate: data,
    isRatePending: isPending,
    getRate: sendRequest
  };
};
