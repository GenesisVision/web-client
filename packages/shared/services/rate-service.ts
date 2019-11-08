import { CancelablePromise } from "gv-api-web";
import { CurrencyEnum } from "shared/utils/types";

import { rateApi } from "./api-client/rate-api";

export const fetchRate = (
  from: CurrencyEnum,
  to: CurrencyEnum
): CancelablePromise<number> =>
  rateApi.getRate(from, to).then(({ rate }) => rate);
