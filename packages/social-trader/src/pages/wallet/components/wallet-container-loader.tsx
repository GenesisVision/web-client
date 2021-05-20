import { WalletData, WalletSummary } from "gv-api-web";
import { getRandomInteger, getRandomWord } from "utils/helpers";
import { CurrencyEnum } from "utils/types";

export const walletDataCreator = (): WalletData => ({
  depositUrlCoindirect: "",
  availableCcy: getRandomInteger(1, 1000),
  investedCcy: getRandomInteger(1, 1000),
  tradingCcy: getRandomInteger(1, 1000),
  pendingCcy: getRandomInteger(1, 1000),
  totalCcy: getRandomInteger(1, 1000),
  id: getRandomWord(),
  title: getRandomWord(),
  logoUrl: "",
  isDepositEnabled: false,
  isWithdrawalEnabled: false,
  withdrawalCommissions: [],
  depositAddresses: [],
  currency: "GVT" as CurrencyEnum,
  available: getRandomInteger(1, 1000),
  invested: getRandomInteger(1, 1000),
  trading: getRandomInteger(1, 1000),
  total: getRandomInteger(1, 1000),
  pending: getRandomInteger(1, 1000)
});

export const walletMultiSummaryLoaderData: WalletSummary = {
  genesisMarketsDiscountPercent: 0,
  grandTotal: {
    currency: "GVT",
    available: getRandomInteger(1, 1000),
    invested: getRandomInteger(1, 1000),
    trading: getRandomInteger(1, 1000),
    total: getRandomInteger(1, 1000)
  },
  wallets: Array(4).fill("").map(walletDataCreator)
};
