import faker from "faker";
import { getWalletBaseLoaderData } from "pages/wallet/components/wallet-loader";
import { getRandomInteger } from "utils/helpers";

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
