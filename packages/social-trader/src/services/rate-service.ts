import { CurrencyEnum } from "utils/types";

import { api } from "./api-client/swagger-custom-client";

export const fetchRate = (
  from: CurrencyEnum,
  to: CurrencyEnum
): Promise<number> =>
  from === to
    ? Promise.resolve(1)
    : api
        .rate()
        .getRate(from, to)
        .then(({ rate }) => rate);
