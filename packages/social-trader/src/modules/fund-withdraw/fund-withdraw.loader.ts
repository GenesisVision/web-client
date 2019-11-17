import faker from "faker";
import { getWalletBaseLoaderData } from "shared/components/wallet/components/wallet-loader";
import { getRandomInteger } from "shared/utils/helpers";

import { FundWithdrawInfoResponse } from "./fund-withdraw.types";

export const FundWithdrawLoaderData: FundWithdrawInfoResponse = {
  withdrawInfo: {
    withheldInvestment: getRandomInteger(0, 100),
    isOwner: false,
    exitFee: getRandomInteger(0, 100),
    title: faker.lorem.word(),
    availableToWithdraw: getRandomInteger(0, 100)
  },
  wallets: [getWalletBaseLoaderData()]
};
