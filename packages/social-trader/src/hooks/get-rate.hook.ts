import useApiRequest from "hooks/api-request.hook";
import { fetchRate } from "services/rate-service";

export const useGetRate = () => {
  const { data, isPending, sendRequest } = useApiRequest({
    defaultData: 1,
    request: ({ from, to }) => fetchRate(from, to)
  });
  return {
    rate: data as number,
    isRatePending: isPending,
    getRate: sendRequest
  };
};
