import { CancelablePromise } from "gv-api-web";
import { rateApi } from "shared/services/api-client/rate-api";
import { CurrencyEnum } from "utils/types";

export const fetchRate = (
  from: CurrencyEnum,
  to: CurrencyEnum
): CancelablePromise<number> =>
  rateApi.getRate(from, to).then(({ rate }) => rate);
