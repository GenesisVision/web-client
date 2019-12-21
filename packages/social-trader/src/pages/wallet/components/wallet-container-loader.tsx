import "./wallet-balance/wallet-balance.scss";

import * as faker from "faker";
import { WalletData, WalletSummary } from "gv-api-web";
import * as React from "react";
import { getRandomInteger } from "utils/helpers";
import { CurrencyEnum } from "utils/types";

export const walletDataCreator = (): WalletData => ({
  availableCcy: getRandomInteger(1, 1000),
  investedCcy: getRandomInteger(1, 1000),
  tradingCcy: getRandomInteger(1, 1000),
  pendingCcy: getRandomInteger(1, 1000),
  totalCcy: getRandomInteger(1, 1000),
  id: faker.lorem.word(),
  title: faker.lorem.word(),
  logo: faker.lorem.word(),
  isDepositEnabled: false,
  isWithdrawalEnabled: false,
  withdrawalCommission: getRandomInteger(1, 1000),
  depositAddress: faker.lorem.word(),
  currency: "GVT" as CurrencyEnum,
  available: getRandomInteger(1, 1000),
  invested: getRandomInteger(1, 1000),
  trading: getRandomInteger(1, 1000),
  total: getRandomInteger(1, 1000),
  pending: getRandomInteger(1, 1000)
});

export const walletMultiSummaryLoaderData: WalletSummary = {
  grandTotal: {
    currency: "GVT",
    available: getRandomInteger(1, 1000),
    invested: getRandomInteger(1, 1000),
    trading: getRandomInteger(1, 1000),
    total: getRandomInteger(1, 1000)
  },
  wallets: Array(4)
    .fill("")
    .map(walletDataCreator),
  payFeesWithGvt: false
};
