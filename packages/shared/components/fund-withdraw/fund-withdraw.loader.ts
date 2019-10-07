import faker from "faker";
import { getWalletBaseLoaderData } from "shared/components/wallet/components/wallet-loader";
import { getRandomInteger } from "shared/utils/helpers";

import { FundWithdrawalInfoResponse } from "./fund-withdraw.types";

export const FundWithdrawLoaderData: FundWithdrawalInfoResponse = {
  withdrawalInfo: {
    exitFee: getRandomInteger(0, 100),
    title: faker.lorem.word(),
    availableToWithdraw: getRandomInteger(0, 100),
    rate: getRandomInteger(0, 100)
  },
  wallets: [getWalletBaseLoaderData()]
};
