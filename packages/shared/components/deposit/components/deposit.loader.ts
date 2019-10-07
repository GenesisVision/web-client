import faker from "faker";
import { getWalletBaseLoaderData } from "shared/components/wallet/components/wallet-loader";
import { getRandomInteger } from "shared/utils/helpers";

import { TInvestInfoWithWallets } from "./deposit.types";

export const DepositInfoLoaderData: TInvestInfoWithWallets = {
  investInfo: {
    title: faker.lorem.word(),
    availableInWallet: getRandomInteger(0, 100),
    minInvestmentAmount: getRandomInteger(0, 100),
    programCurrencyMinInvestment: getRandomInteger(0, 100),
    entryFee: getRandomInteger(0, 100),
    gvCommission: getRandomInteger(0, 100),
    rate: getRandomInteger(0, 100),
    isOwnProgram: false
  },
  wallets: [getWalletBaseLoaderData()]
};
