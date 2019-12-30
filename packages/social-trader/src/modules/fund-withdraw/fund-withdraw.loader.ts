import { getWalletBaseLoaderData } from "pages/wallet/components/wallet-loader";
import { getRandomInteger, getRandomWord } from "utils/helpers";

import { FundWithdrawInfoResponse } from "./fund-withdraw.types";

export const FundWithdrawLoaderData: FundWithdrawInfoResponse = {
  withdrawInfo: {
    withheldInvestment: getRandomInteger(0, 100),
    isOwner: false,
    exitFee: getRandomInteger(0, 100),
    title: getRandomWord(),
    availableToWithdraw: getRandomInteger(0, 100)
  },
  wallets: [getWalletBaseLoaderData()]
};
