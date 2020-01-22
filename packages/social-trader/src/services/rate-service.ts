import { rateApi } from "services/api-client/rate-api";
import { CurrencyEnum } from "utils/types";

export const fetchRate = (
  from: CurrencyEnum,
  to: CurrencyEnum
): Promise<number> => rateApi.getRate(from, to).then(({ rate }) => rate);
