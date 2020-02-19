import { rateApi } from "services/api-client/rate-api";
import { CurrencyEnum } from "utils/types";

export const fetchRate = (
  from: CurrencyEnum,
  to: CurrencyEnum
): Promise<number> =>
  from === to
    ? Promise.resolve(1)
    : rateApi.getRate(from, to).then(({ rate }) => rate);
